import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import OnboardingPage from "../(auth)/onboarding";
import { SignUp } from "../(auth)/onboarding";

// Mocks and declared variables
const mockNavigate = jest.fn();
const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    navigate: mockNavigate,
    replace: mockReplace,
    canGoBack: () => false,
  }),
}));

jest.mock("@/services/supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn().mockResolvedValue({ error: null }),
      signUp: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      startAutoRefresh: jest.fn(),
      stopAutoRefresh: jest.fn(),
    },
  },
}));

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

// Verifying Jest is working
test("Jest is working", () => {
  expect(true).toBe(true);
});

jest.mock("expo-av", () => {
  const React = require("react");
  return {
    Video: (props) => React.createElement("video", props),
    ResizeMode: { COVER: "cover", CONTAIN: "contain", STRETCH: "stretch" },
  };
});

// Onboarding Page
describe("OnboardingPage (renders and navigations)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the onboarding component and first page", () => {
    const { getByText } = render(<OnboardingPage />);
    expect(getByText("Rock Climbing")).toBeTruthy();
    expect(getByText("Get Started")).toBeTruthy();
  });

  it("navigates to login when 'here' is pressed", () => {
    const { getByText } = render(<OnboardingPage />);
    fireEvent.press(getByText("here."));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("renders the 'Already have an account' prompt on the first page", () => {
    const { getByText } = render(<OnboardingPage />);
    expect(getByText(/Already have an account/i)).toBeTruthy();
  });

  it("calls supabase signUp and navigates on success", async () => {
    const { getByText, getByPlaceholderText } = render(<SignUp />);
    const emailInput = getByPlaceholderText("Email Address");
    const passwordInput = getByPlaceholderText("Create Password");
    const confirmPasswordInput = getByPlaceholderText("Confirm Password");
    const signupButton = getByText("Signup");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.changeText(confirmPasswordInput, "password123");
    fireEvent.press(signupButton);

    await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith("/login");
    });
  });
});

// SignUp validation
describe("SignUp validation (checks for matching passwords, error checks)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows an error when submitting with an empty email", async () => {
    const { getByText } = render(<SignUp />);
    fireEvent.press(getByText("Signup"));
    await waitFor(() => {
      expect(getByText("Email is required")).toBeTruthy();
    });
  });

  it("shows an error when submitting with an empty password", async () => {
    const { getByText, getByPlaceholderText } = render(<SignUp />);
    fireEvent.changeText(getByPlaceholderText("Email Address"), "test@example.com");
    fireEvent.press(getByText("Signup"));
    await waitFor(() => {
      expect(getByText("Password is required")).toBeTruthy();
    });
  });

  it("shows an error when passwords do not match", async () => {
    const { getByText, getByPlaceholderText } = render(<SignUp />);
    fireEvent.changeText(getByPlaceholderText("Email Address"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Create Password"), "password123");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "different456");
    fireEvent.press(getByText("Signup"));
    await waitFor(() => {
      expect(getByText("Passwords do not match")).toBeTruthy();
    });
  });

  it("clears the email error when the user starts retyping their email", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<SignUp />);
    fireEvent.press(getByText("Signup"));
    await waitFor(() => expect(getByText("Email is required")).toBeTruthy());
    fireEvent.changeText(getByPlaceholderText("Email Address"), "a");
    await waitFor(() => expect(queryByText("Email is required")).toBeNull());
  });

  it("clears the password error when the user starts retyping their password", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<SignUp />);
    fireEvent.changeText(getByPlaceholderText("Email Address"), "test@example.com");
    fireEvent.press(getByText("Signup"));
    await waitFor(() => expect(getByText("Password is required")).toBeTruthy());
    fireEvent.changeText(getByPlaceholderText("Create Password"), "a");
    await waitFor(() => expect(queryByText("Password is required")).toBeNull());
  });

  it("does not call supabase signUp when validation fails", async () => {
    const { supabase } = require("@/services/supabaseClient");
    const { getByText } = render(<SignUp />);
    fireEvent.press(getByText("Signup"));
    await waitFor(() => {
      expect(supabase.auth.signUp).not.toHaveBeenCalled();
    });
  });
});

import { supabase } from "@/services/supabaseClient";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import Signup from "../signup";

const mockNavigate = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock("@/services/supabaseClient", () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

describe("Signup Page", () => {
  // Signup Page - Email Missing Test
  test("should show error when email is missing", async () => {
    const { getByText, getByPlaceholderText } = render(<Signup />);
    const passwordInput = getByPlaceholderText("Create Password");
    const confirmPasswordInput = getByPlaceholderText("Confirm Password");
    const signupButton = getByText("Signup");

    fireEvent.changeText(passwordInput, "password123");
    fireEvent.changeText(confirmPasswordInput, "password123");
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText("Email is required")).toBeTruthy();
    });
  });

  // Signup Page - Password Missing Test
  test("should show error when password is missing", async () => {
    const { getByText, getByPlaceholderText } = render(<Signup />);
    const emailInput = getByPlaceholderText("Email Address");
    const confirmPasswordInput = getByPlaceholderText("Confirm Password");
    const signupButton = getByText("Signup");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(confirmPasswordInput, "password123");
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText("Password is required")).toBeTruthy();
    });
  });

  // Signup Page - Passwords Not Matching Test
  test("should show error when passwords do not match", async () => {
    const { getByText, getByPlaceholderText } = render(<Signup />);
    const emailInput = getByPlaceholderText("Email Address");
    const passwordInput = getByPlaceholderText("Create Password");
    const confirmPasswordInput = getByPlaceholderText("Confirm Password");
    const signupButton = getByText("Signup");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.changeText(confirmPasswordInput, "password456");
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText("Passwords do not match")).toBeTruthy();
    });
  });

  // Signup Page - Navigating upon successful signup test
  test("should navigate on successful signup", async () => {
    (supabase.auth.signUp as jest.Mock).mockResolvedValueOnce({
      data: { session: {} },
      error: null,
    });

    const { getByText, getByPlaceholderText } = render(<Signup />);
    const emailInput = getByPlaceholderText("Email Address");
    const passwordInput = getByPlaceholderText("Create Password");
    const confirmPasswordInput = getByPlaceholderText("Confirm Password");
    const signupButton = getByText("Signup");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.changeText(confirmPasswordInput, "password123");
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  // Signup Page - Signup Failure Test
  test("should show error on signup failure", async () => {
    (supabase.auth.signUp as jest.Mock).mockResolvedValueOnce({
      data: null,
      error: { message: "Signup failed" },
    });

    const { getByText, getByPlaceholderText } = render(<Signup />);
    const emailInput = getByPlaceholderText("Email Address");
    const passwordInput = getByPlaceholderText("Create Password");
    const confirmPasswordInput = getByPlaceholderText("Confirm Password");
    const signupButton = getByText("Signup");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.changeText(confirmPasswordInput, "password123");
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText("Signup failed")).toBeTruthy();
    });
  });
});

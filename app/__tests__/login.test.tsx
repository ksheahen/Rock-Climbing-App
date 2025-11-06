// Test Working State of Jest
import { supabase } from "@/services/supabaseClient";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import Login from "../(auth)/login";

const mockNavigate = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock("@/services/supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn().mockResolvedValue({ error: null }),
      startAutoRefresh: jest.fn(),
      stopAutoRefresh: jest.fn(),
    },
  },
}));

// Verifying Jest is working
test("Jest is working", () => {
  expect(true).toBe(true);
});

describe("Login Page", () => {
  // Mising Username Test
  test("should show error when username is missing", async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText("Email is required")).toBeTruthy();
    });
  });

  // Missing Password Test
  test("should show error when password is missing", async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText("Email Address");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText("Password is required")).toBeTruthy();
    });
  });

  // Incorrect Username Test
  test("should show error for incorrect username", async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
      error: { message: "Invalid login credentials" },
    });

    const { getByText, getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText("Email Address");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "wrong@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText("Invalid login credentials")).toBeTruthy();
    });
  });

  // Incorrect Password Test
  test("should show error for incorrect password", async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
      error: { message: "Invalid login credentials" },
    });

    const { getByText, getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText("Email Address");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "wrongpassword");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText("Invalid login credentials")).toBeTruthy();
    });
  });

  // Correct Username and Password Test
  test("should navigate on correct username and password", async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
      error: null,
    });

    const { getByText, getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText("Email Address");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(loginButton);

    await waitFor(() => {
      console.log(mockNavigate.mock.calls);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});

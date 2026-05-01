// Edit Profile Page Tests
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import EditProfilePage from "../(pages)/edit-profile";
import { getUserById } from "../../services/userService";

const mockNavigate = jest.fn();
const mockUpdateUser = jest.fn();
const mockSingle = jest.fn();
const mockEq = jest.fn();

jest.mock("expo-router", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock("../../services/userService", () => ({
  getUserById: jest.fn(),
}));

jest.mock("@/services/supabaseClient", () => ({
  supabase: {
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: {
          user: {
            id: "mock-user-id",
          },
        },
        error: null,
      }),
      updateUser: mockUpdateUser,
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: mockSingle,
        })),
      })),
      update: jest.fn(() => ({
        eq: mockEq,
      })),
    })),
  },
}));

jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

describe("Edit Profile Page Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (getUserById as jest.Mock).mockResolvedValue({
      user_id: "mock-user-id",
      name: "Aymen",
      email: "aymen@test.com",
    });

    mockSingle.mockResolvedValue({
      data: {
        instagram_handle: "aymen.ig",
        profile_picture: "pfp_4.png",
      },
      error: null,
    });

    mockEq.mockResolvedValue({
      data: {
        instagram_handle: "new_ig",
        profile_picture: "pfp_4.png",
      },
      error: null,
    });

    mockUpdateUser.mockResolvedValue({
      data: {},
      error: null,
    });
  });

  it("shows loading indicator before user data loads", () => {
    (getUserById as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const { UNSAFE_getByType } = render(<EditProfilePage />);

    expect(
      UNSAFE_getByType(require("react-native").ActivityIndicator),
    ).toBeTruthy();
  });

  it("renders edit profile page after loading", async () => {
    const { getByText } = render(<EditProfilePage />);

    await waitFor(() => {
      expect(getByText("Edit Profile")).toBeTruthy();
      expect(getByText("Profile Picture")).toBeTruthy();
      expect(getByText("Name")).toBeTruthy();
      expect(getByText("Email")).toBeTruthy();
      expect(getByText("Instagram")).toBeTruthy();
    });
  });

  it("loads user data into inputs", async () => {
    const { getByDisplayValue } = render(<EditProfilePage />);

    await waitFor(() => {
      expect(getByDisplayValue("Aymen")).toBeTruthy();
      expect(getByDisplayValue("aymen@test.com")).toBeTruthy();
      expect(getByDisplayValue("aymen.ig")).toBeTruthy();
    });
  });

  it("navigates to profile when Cancel is pressed", async () => {
    const { getByText } = render(<EditProfilePage />);

    await waitFor(() => {
      expect(getByText("Cancel")).toBeTruthy();
    });

    fireEvent.press(getByText("Cancel"));

    expect(mockNavigate).toHaveBeenCalledWith("profile");
  });

  it("shows validation alert if name is empty", async () => {
    const { getByText, getByPlaceholderText } = render(<EditProfilePage />);

    await waitFor(() => {
      expect(getByPlaceholderText("Your name")).toBeTruthy();
    });

    fireEvent.changeText(getByPlaceholderText("Your name"), "");
    fireEvent.press(getByText("Save"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Validation Error",
        "Name and email cannot be empty.",
      );
    });
  });

  it("saves profile changes when Save is pressed", async () => {
    const { getByText, getByPlaceholderText } = render(<EditProfilePage />);

    await waitFor(() => {
      expect(getByPlaceholderText("Your name")).toBeTruthy();
    });

    fireEvent.changeText(getByPlaceholderText("Your name"), "New Name");
    fireEvent.changeText(getByPlaceholderText("Your email"), "new@test.com");
    fireEvent.changeText(getByPlaceholderText("username"), "new_ig");

    fireEvent.press(getByText("Save"));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        email: "new@test.com",
        data: {
          display_name: "New Name",
        },
      });
    });
  });

  it("shows success alert after saving", async () => {
    const { getByText } = render(<EditProfilePage />);

    await waitFor(() => {
      expect(getByText("Save")).toBeTruthy();
    });

    fireEvent.press(getByText("Save"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Profile updated!",
        expect.any(Array),
      );
    });
  });
});
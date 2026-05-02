// Individual Climb Page Tests
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { useSQLiteContext } from "expo-sqlite";
import IndividualClimbPage from "../(pages)/individual-climb-page";

const mockPush = jest.fn();
const mockGetAllAsync = jest.fn();
const mockRunAsync = jest.fn();

jest.mock("expo-router/build/hooks", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === "id") return "1";
      if (key === "from") return "profile";
      return null;
    },
  }),
}));

jest.mock("expo-sqlite", () => ({
  useSQLiteContext: jest.fn(),
}));

jest.mock("@react-navigation/native", () => {
  const React = require("react");
  return {
    useFocusEffect: (effect: any) => {
      React.useEffect(() => {
        effect();
      }, []);
    },
  };
});

jest.mock("@/services/supabaseClient", () => ({
  supabase: {
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: {
          user: {
            id: "mock-user-id",
          },
        },
      }),
    },
  },
}));

jest.mock("@/services/achievementService", () => ({
  syncAchievementsForUser: jest.fn(),
}));

jest.mock("expo-av", () => ({
  ResizeMode: {
    COVER: "cover",
  },
  Video: () => null,
}));

jest.mock("react-native-remix-icon", () => {
  const { Text } = require("react-native");
  return () => <Text>Icon</Text>;
});

// Mock child components
jest.mock("@/components/BackButton/BackButton", () => {
  const { Text } = require("react-native");
  return ({ url }: any) => <Text>Back Button: {url}</Text>;
});

jest.mock("@/components/SettingsButton/SettingsButton", () => {
  const { Pressable, Text } = require("react-native");

  return ({ onSelectedChange }: any) => (
    <Pressable onPress={() => onSelectedChange(true)}>
      <Text>Settings Button</Text>
    </Pressable>
  );
});

jest.mock("@/components/Category/Category", () => {
  const { Text } = require("react-native");
  return ({ selectedProp }: any) => <Text>Category: {selectedProp}</Text>;
});

jest.mock("@/components/Type/Type", () => {
  const { Text } = require("react-native");
  return ({ selectedProp }: any) => <Text>Type: {selectedProp}</Text>;
});

jest.mock("@/components/Complete/Complete", () => {
  const { Text } = require("react-native");
  return ({ selectedProp }: any) => <Text>Complete: {selectedProp}</Text>;
});

jest.mock("@/components/Attempt/Attempt", () => {
  const { Text } = require("react-native");
  return ({ selectedProp }: any) => <Text>Attempt: {selectedProp}</Text>;
});

jest.mock("@/components/Difficulty/Difficulty", () => {
  const { Text } = require("react-native");
  return ({ selectedProp, climbType }: any) => (
    <Text>
      Grade: {selectedProp} - {climbType}
    </Text>
  );
});

jest.mock("@/components/Rating/Rating", () => {
  const { Text } = require("react-native");
  return ({ selectedProp }: any) => <Text>Rating: {selectedProp}</Text>;
});

jest.mock("@/components/DateTime/DateTime", () => {
  const { Text } = require("react-native");
  return ({ selectedProp }: any) => <Text>DateTime: {selectedProp}</Text>;
});

jest.mock("@/components/Location/Location", () => {
  const { Text } = require("react-native");
  return ({ selectedProp }: any) => <Text>Location: {selectedProp}</Text>;
});

jest.mock("@/components/Description/Description", () => {
  const { Text } = require("react-native");
  return ({ selectedProp }: any) => <Text>Description: {selectedProp}</Text>;
});

jest.mock("@/components/Media/Media", () => {
  const { Text } = require("react-native");
  return () => <Text>Media Editor</Text>;
});

jest.mock("@/components/Line/Line", () => {
  const { View } = require("react-native");
  return () => <View />;
});

const mockClimb = {
  id: 1,
  category: "Indoor",
  type: "Boulder",
  complete: "Yes",
  attempt: "1",
  grade: "6a/V3",
  rating: 4,
  datetime: "2026-04-20T12:00:00.000Z",
  description: "Test climb",
  media: "",
  location: "Climbing Gym",
};

describe("Individual Climb Page Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockGetAllAsync.mockResolvedValue([mockClimb]);
    mockRunAsync.mockResolvedValue({ changes: 1 });

    (useSQLiteContext as jest.Mock).mockReturnValue({
      getAllAsync: mockGetAllAsync,
      runAsync: mockRunAsync,
    });
  });

  it("loads climb data from database", async () => {
    render(<IndividualClimbPage />);

    await waitFor(() => {
      expect(mockGetAllAsync).toHaveBeenCalledWith(
        expect.stringContaining("SELECT * FROM log_climb5 WHERE id = ?"),
        ["1"],
      );
    });
  });

  it("renders loaded climb details", async () => {
    const { getByText } = render(<IndividualClimbPage />);

    await waitFor(() => {
      expect(getByText("Category: Indoor")).toBeTruthy();
      expect(getByText("Type: Boulder")).toBeTruthy();
      expect(getByText("Complete: Yes")).toBeTruthy();
      expect(getByText("Attempt: 1")).toBeTruthy();
      expect(getByText("Grade: 6a/V3 - Boulder")).toBeTruthy();
      expect(getByText("Rating: 4")).toBeTruthy();
      expect(getByText("Location: Climbing Gym")).toBeTruthy();
      expect(getByText("Description: Test climb")).toBeTruthy();
    });
  });

  it("renders no media state when climb has no media", async () => {
    const { getByText } = render(<IndividualClimbPage />);

    await waitFor(() => {
      expect(getByText("No media")).toBeTruthy();
    });
  });

  it("opens settings modal when settings button is pressed", async () => {
    const { getByText } = render(<IndividualClimbPage />);

    await waitFor(() => {
      expect(getByText("Settings Button")).toBeTruthy();
    });

    fireEvent.press(getByText("Settings Button"));

    await waitFor(() => {
      expect(getByText("Edit Climb")).toBeTruthy();
      expect(getByText("Delete Climb")).toBeTruthy();
    });
  });

  it("shows media editor and save button when edit climb is pressed", async () => {
    const { getByText } = render(<IndividualClimbPage />);

    fireEvent.press(getByText("Settings Button"));

    await waitFor(() => {
      expect(getByText("Edit Climb")).toBeTruthy();
    });

    fireEvent.press(getByText("Edit Climb"));

    await waitFor(() => {
      expect(getByText("Media Editor")).toBeTruthy();
      expect(getByText("Save")).toBeTruthy();
    });
  });

  it("updates climb in database when Save is pressed", async () => {
    const { getByText } = render(<IndividualClimbPage />);

    fireEvent.press(getByText("Settings Button"));

    await waitFor(() => {
      expect(getByText("Edit Climb")).toBeTruthy();
    });

    fireEvent.press(getByText("Edit Climb"));

    await waitFor(() => {
      expect(getByText("Save")).toBeTruthy();
    });

    fireEvent.press(getByText("Save"));

    await waitFor(() => {
      expect(mockRunAsync).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE log_climb5"),
        expect.arrayContaining([
          "Indoor",
          "Boulder",
          "Yes",
          "1",
          "6a/V3",
          4,
          "2026-04-20T12:00:00.000Z",
          "Test climb",
          "",
          "Climbing Gym",
          "1",
        ]),
      );
    });
  });

  it("soft deletes climb when Delete Climb is pressed", async () => {
    const { getByText } = render(<IndividualClimbPage />);

    fireEvent.press(getByText("Settings Button"));

    await waitFor(() => {
      expect(getByText("Delete Climb")).toBeTruthy();
    });

    fireEvent.press(getByText("Delete Climb"));

    await waitFor(() => {
      expect(mockRunAsync).toHaveBeenCalledWith(
        expect.stringContaining("SET deleted = 1"),
        ["1"],
      );
      expect(mockPush).toHaveBeenCalledWith("/profile");
    });
  });
});

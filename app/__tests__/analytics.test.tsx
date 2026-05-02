// Analytics Page Tests
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { useSQLiteContext } from "expo-sqlite";
import Analytics from "../(pages)/analytics";

const mockGetAllAsync = jest.fn();

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

// Mock child components
jest.mock("@/components/BackButton/BackButton", () => {
  const { Text } = require("react-native");
  return ({ url }: any) => <Text>Back Button: {url}</Text>;
});

jest.mock("@/components/StatCard/StatCard", () => {
  const { Text } = require("react-native");
  return ({ climbs }: any) => <Text>StatCard Count: {climbs.length}</Text>;
});

jest.mock("@/components/AnalyticsDateButton/AnalyticsDateButtons", () => {
  const { Text, Pressable } = require("react-native");

  return ({ dates, onChange }: any) => (
    <Pressable onPress={() => onChange("month")}>
      <Text>Current Range: {dates}</Text>
    </Pressable>
  );
});

jest.mock("@/components/LineCharts/LineCharts", () => {
  const { Text } = require("react-native");

  return ({ climbs, dateRange }: any) => (
    <Text>
      Chart: {climbs.length} climbs - {dateRange}
    </Text>
  );
});

describe("Analytics Page Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useSQLiteContext as jest.Mock).mockReturnValue({
      getAllAsync: mockGetAllAsync,
    });
  });

  it("renders the analytics page title", () => {
    mockGetAllAsync.mockResolvedValue([]);

    const { getByText } = render(<Analytics />);

    expect(getByText("PROGRESS")).toBeTruthy();
  });

  it("fetches climbs from database on load", async () => {
    mockGetAllAsync.mockResolvedValue([]);

    render(<Analytics />);

    await waitFor(() => {
      expect(mockGetAllAsync).toHaveBeenCalledWith(
        expect.stringContaining("SELECT * FROM log_climb5"),
      );
    });
  });

  it("passes climbs to StatCard", async () => {
    const mockClimbs = [{ id: 1 }, { id: 2 }];
    mockGetAllAsync.mockResolvedValue(mockClimbs);

    const { getByText } = render(<Analytics />);

    await waitFor(() => {
      expect(getByText("StatCard Count: 2")).toBeTruthy();
    });
  });

  it("renders chart with correct data", async () => {
    const mockClimbs = [{ id: 1 }];
    mockGetAllAsync.mockResolvedValue(mockClimbs);

    const { getByText } = render(<Analytics />);

    await waitFor(() => {
      expect(getByText(/Chart: 1 climbs/)).toBeTruthy();
    });
  });

  it("changes date range when button is pressed", async () => {
    mockGetAllAsync.mockResolvedValue([]);

    const { getByText } = render(<Analytics />);

    await waitFor(() => {
      expect(getByText("Current Range: week")).toBeTruthy();
    });

    fireEvent.press(getByText("Current Range: week"));

    await waitFor(() => {
      expect(getByText("Current Range: month")).toBeTruthy();
    });
  });

  it("handles database error", async () => {
    mockGetAllAsync.mockRejectedValue(new Error("DB error"));

    render(<Analytics />);

    await waitFor(() => {
      expect(mockGetAllAsync).toHaveBeenCalled();
    });
  });
});

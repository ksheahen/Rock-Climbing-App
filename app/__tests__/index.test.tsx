// Home Page Tests
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { useSQLiteContext } from "expo-sqlite";
import Index from "../(pages)/index";

// Manually suppresses error so changes don't have to be made to index.tsx
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("not wrapped in act") ||
        args[0].includes(
          "Can't perform a React state update on a component that hasn't mounted yet",
        ))
    ) {
      return;
    }
    originalError(...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
  useFocusEffect: (effect: any) => effect(),
}));

jest.mock("expo-sqlite", () => ({
  useSQLiteContext: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn().mockResolvedValue("true"),
  setItem: jest.fn(),
}));

jest.mock("react-native-chart-kit", () => ({
  ProgressChart: () => null,
}));

const today = new Date().toISOString();

const mockClimbs = [
  {
    id: 1,
    uuid: "abc-123",
    category: "Indoor",
    type: "Boulder",
    complete: "Yes",
    attempt: "1",
    grade: "6a/V3",
    rating: 2,
    datetime: today,
    description: "Test climb",
    media: "",
    location: "Gym",
    deleted: 0,
    synced: 0,
  },
  {
    id: 2,
    uuid: "def-456",
    category: "Outdoor",
    type: "Route",
    complete: "Yes",
    attempt: "3",
    grade: "7a/V6",
    rating: 3,
    datetime: today,
    description: "",
    media: "",
    location: "",
    deleted: 0,
    synced: 0,
  },
];

const mockDbGetAllAsync = jest.fn();
const mockRunAsync = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  mockDbGetAllAsync.mockResolvedValue(mockClimbs);
  (useSQLiteContext as jest.Mock).mockReturnValue({
    getAllAsync: mockDbGetAllAsync,
    runAsync: mockRunAsync,
  });
});

describe("Home Page Tests", () => {
  it("renders the home page with loading state initially", async () => {
    mockDbGetAllAsync.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 100)),
    );
    const { getByText } = render(<Index />);
    await waitFor(() => {
      expect(getByText("Loading logs...")).toBeTruthy();
    });
  });

  it("renders the home page with climbs after loading", async () => {
    const { getByText } = render(<Index />);
    await waitFor(() => {
      expect(getByText("This week")).toBeTruthy();
    });
  });

  it("displays empty state when no climbs exist", async () => {
    mockDbGetAllAsync.mockResolvedValue([]);
    const { getByText } = render(<Index />);
    await waitFor(() => {
      expect(getByText(/No climb logs yet/)).toBeTruthy();
      expect(getByText(/Start logging your climbs/)).toBeTruthy();
    });
  });

  it("fetches climbs from the database on render", async () => {
    render(<Index />);
    await waitFor(() => {
      expect(mockDbGetAllAsync).toHaveBeenCalledWith(
        expect.stringContaining("SELECT * FROM log_climb5"),
      );
    });
  });

  it("renders the ANALYTICS section", async () => {
    const { getByText } = render(<Index />);
    await waitFor(() => {
      expect(getByText(/ANALYTICS/)).toBeTruthy();
    });
  });

  it("navigates to analytics page when analytics preview is pressed", async () => {
    const { getByText } = render(<Index />);
    await waitFor(() => {
      expect(getByText(/ANALYTICS/)).toBeTruthy();
    });
    fireEvent.press(getByText(/ANALYTICS/));
    expect(mockPush).toHaveBeenCalledWith("/analytics");
  });

  it("navigates to individual climb page when a session is pressed", async () => {
    const { getByText } = render(<Index />);
    await waitFor(() => {
      expect(getByText("6a/V3")).toBeTruthy();
    });
    fireEvent.press(getByText("6a/V3"));
    expect(mockPush).toHaveBeenCalledWith("/individual-climb-page?id=1");
  });

  it("redirects to onboarding if user has not seen it", async () => {
    const AsyncStorage = require("@react-native-async-storage/async-storage");
    AsyncStorage.getItem.mockResolvedValueOnce(null);
    const { getByText } = render(<Index />);
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/onboarding");
    });
  });

  it("does not redirect to onboarding if user has already seen it", async () => {
    render(<Index />);
    await waitFor(() => {
      expect(mockReplace).not.toHaveBeenCalledWith("/onboarding");
    });
  });

  it("displays error state when database query fails", async () => {
    const originalError = console.error;
    console.error = jest.fn(); // Suppress error log for this test

    mockDbGetAllAsync.mockRejectedValue(new Error("DB connection failed"));
    const { getByText } = render(<Index />);
    await waitFor(() => {
      expect(getByText("DB connection failed")).toBeTruthy();
    });

    console.error = originalError; // Restore after test
  });

  it("renders day selector with 7 days", async () => {
    const { getByText } = render(<Index />);
    await waitFor(() => {
      expect(getByText("S")).toBeTruthy();
      expect(getByText("M")).toBeTruthy();
      expect(getByText("F")).toBeTruthy();
    });
  });
});

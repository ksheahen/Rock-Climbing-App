// Mock before any imports so navigation internals don't execute
import { render, waitFor } from "@testing-library/react-native";
import { useSQLiteContext } from "expo-sqlite";
import IndividualClimbPage from "../(pages)/individual-climb-page";

jest.mock("expo-router", () => ({
  useSearchParams: jest.fn(() => ({ get: () => "1" })),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));
jest.mock("expo-router/build/hooks", () => ({
  useSearchParams: jest.fn(() => ({ get: () => "1" })),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));
jest.mock("@react-navigation/native", () => ({
  useFocusEffect: jest.fn((f: any) => f()),
}));
jest.mock("expo-sqlite", () => ({ useSQLiteContext: jest.fn() }));

test("loads existing climb and renders fields", async () => {
  const mockGetAll = jest.fn().mockResolvedValue([
    {
      id: "1",
      category: "Outdoor",
      type: "Sport",
      complete: "No",
      attempt: "2",
      grade: "6a",
      rating: 2,
      datetime: "2025-11-29",
      description: "Test",
      media: "",
    },
  ]);
  (useSQLiteContext as jest.Mock).mockReturnValue({
    getAllAsync: mockGetAll,
    runAsync: jest.fn(),
  });

  const { getByText } = render(<IndividualClimbPage />);
  await waitFor(() => expect(getByText("Outdoor")).toBeTruthy());
  expect(getByText("Sport")).toBeTruthy();
});

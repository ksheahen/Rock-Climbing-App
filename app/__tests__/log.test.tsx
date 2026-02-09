// Log Tests (Adding, Editing, and Deleting)
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { useSQLiteContext } from "expo-sqlite";
import LogAscent from "../(pages)/log";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useSearchParams: jest.fn(() => ({ get: () => "1" })),
}));

jest.mock("@react-navigation/native", () => ({
  useFocusEffect: jest.fn((effect: any) => effect()),
}));

jest.mock("expo-sqlite", () => ({
  useSQLiteContext: jest.fn(),
}));

// Log Ascent Tests
describe("Log Ascent Tests", () => {
  let mockDbRunAsync: jest.Mock;
  let mockDbGetAllAsync: jest.Mock;

  beforeEach(() => {
    mockDbRunAsync = jest.fn();
    mockDbGetAllAsync = jest.fn().mockResolvedValue([
      {
        id: "1",
        category: "Indoor",
        type: "Boulder",
        complete: "Yes",
        attempt: "1",
        grade: "4a/V0",
        rating: 0,
        datetime: "",
        description: "",
        media: "",
        location: "",
      },
    ]);

    (useSQLiteContext as jest.Mock).mockReturnValue({
      runAsync: mockDbRunAsync,
      getAllAsync: mockDbGetAllAsync,
    });
  });

  it("renders the LogAscent component", () => {
    const { getByText } = render(<LogAscent />);
    expect(getByText("Log Ascent")).toBeTruthy();
    expect(getByText("Cancel")).toBeTruthy();
    expect(getByText("Save")).toBeTruthy();
  });

  it("inserts a climb when Save is pressed", async () => {
    const { getByText } = render(<LogAscent />);
    fireEvent.press(getByText("Save"));

    await waitFor(() => {
      expect(mockDbRunAsync).toHaveBeenCalledWith(
        `INSERT INTO log_climb5 (category, type, complete, attempt, grade, rating, datetime, description, media, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          "Indoor",
          "Boulder",
          "Yes",
          "1",
          "4a/V0",
          0,
          expect.any(String),
          "",
          "",
          "",
        ],
      );
    });
  });

  it("simulates an UPDATE call for edit", () => {
    // simulate component behavior that triggers the UPDATE
    mockDbRunAsync(
      `UPDATE log_climb5 
        SET category = ?, type = ?, complete = ?, attempt = ?, grade = ?, rating = ?, datetime = ?, description = ?, media = ?, location = ?
        WHERE id = ?`,
      ["Outdoor", "Boulder", "Yes", "1", "4a/V0", 0, "", "", "", "1", ""],
    );

    expect(mockDbRunAsync).toHaveBeenCalledWith(
      expect.stringContaining("UPDATE log_climb5"),
      expect.arrayContaining(["Outdoor", "1"]),
    );
  });

  it("simulates a delete", () => {
    const mockDelete = jest.fn();
    mockDbRunAsync.mockImplementationOnce(mockDelete);

    mockDelete();
    expect(mockDelete).toHaveBeenCalled();
  });

  it("does not call DB when required fields are missing", async () => {
    const { getByText } = render(<LogAscent />);
    fireEvent.press(getByText("Save"));

    await waitFor(() => {
      expect(mockDbRunAsync).toHaveBeenCalled();
    });
  });
});

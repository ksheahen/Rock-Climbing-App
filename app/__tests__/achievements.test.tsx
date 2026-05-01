// Achievements Page Tests
import { render } from "@testing-library/react-native";
import AchievementsPage from "../(pages)/achievements";

jest.mock("@/components/BackButton/BackButton", () => {
  const { Text } = require("react-native");

  return ({ url }: { url: string }) => <Text>Back Button: {url}</Text>;
});

jest.mock("@/components/Achievements/achievements", () => ({
  DEFAULT_ACHIEVEMENTS: [
    {
      achievement_id: "highest-grade",
      name: "Highest Grade",
      description: "Climbed your highest grade",
    },
    {
      achievement_id: "streak-starter",
      name: "Streak Starter",
      description: "Climbed three days in a row",
    },
    {
      achievement_id: "flash-master",
      name: "Flash Master",
      description: "Completed five climbs on first attempt",
    },
  ],
}));

describe("Achievements Page Tests", () => {
  it("renders the achievements page title", () => {
    const { getByText } = render(<AchievementsPage />);

    expect(getByText("Achievements")).toBeTruthy();
  });

  it("renders the back button with profile route", () => {
    const { getByText } = render(<AchievementsPage />);

    expect(getByText("Back Button: /profile")).toBeTruthy();
  });

  it("renders all achievement names", () => {
    const { getByText } = render(<AchievementsPage />);

    expect(getByText("Highest Grade")).toBeTruthy();
    expect(getByText("Streak Starter")).toBeTruthy();
    expect(getByText("Flash Master")).toBeTruthy();
  });

  it("renders all achievement descriptions", () => {
    const { getByText } = render(<AchievementsPage />);

    expect(getByText("Climbed your highest grade")).toBeTruthy();
    expect(getByText("Climbed three days in a row")).toBeTruthy();
    expect(getByText("Completed five climbs on first attempt")).toBeTruthy();
  });

  it("renders one row for each achievement", () => {
    const { getByText } = render(<AchievementsPage />);

    expect(getByText("Highest Grade")).toBeTruthy();
    expect(getByText("Streak Starter")).toBeTruthy();
    expect(getByText("Flash Master")).toBeTruthy();
  });
});

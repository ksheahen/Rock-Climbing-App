/* global jest */

// Basic mocks for native Expo modules used in tests
const React = require("react");

jest.mock("expo-av", () => {
  return {
    Video: (props) => React.createElement("video", props),
    Audio: {
      Sound: function () {
        return {
          loadAsync: jest.fn(),
          playAsync: jest.fn(),
          unloadAsync: jest.fn(),
        };
      },
    },
    ResizeMode: { COVER: "cover", CONTAIN: "contain", STRETCH: "stretch" },
  };
});

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn().mockResolvedValue({ cancelled: true }),
  launchCameraAsync: jest.fn().mockResolvedValue({ cancelled: true }),
  requestMediaLibraryPermissionsAsync: jest
    .fn()
    .mockResolvedValue({ granted: true }),
  requestCameraPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
}));

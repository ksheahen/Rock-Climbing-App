# Frontend

Use ```npm install``` to install packages

To start the frontend, use ```npx expo start``` then read the terminal for additional options.

- Android: press ```a```
- iOS: press ```i```
- Web: press ```w```
- You can also scan the QR code to simulate it on your phone.

To simulate iOS and Android on your computer, you will have to have xcode and/or android studio installed and configured.

See here for setting up the simulation locally or on your phone: https://docs.expo.dev/get-started/set-up-your-environment


## Folder Structure

We may not need to use all of these folders, adding them just in case we do 

- `src/`: Contains the app's source code and main folders.
- `assets/`: Images, fonts, and other static assets used in the app.
- `components/`: Reusable UI components for building screens.
- `hooks/`: Custom React hooks for shared logic.
- `navigation/`: Navigation configuration and logic (e.g., stack, tab, drawer).
- `screens/`: Individual app screens (pages/views).
- `services/`: API calls and business logic (data fetching, etc.).
- `types/`: Shared TypeScript types and interfaces
- `utils/`: General-purpose helper functions
- `tests/`: Unit and integration tests for the frontend.
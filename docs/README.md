To start the application -
# Climbing App Frontend
React Native project using Expo

## Installing modules
Install the required modules:
```bash
npm install
```

## Running the Application
Start the front end application:
```bash
npx expo start
```
Then scan the barcode with your device
    1. With Expo Go (Android)
    2. With your camera app (IOS)

## Running Linting
To run ESLint and Prettier:
```bash
npx expo lint .
```
Or use:
```
npm run lint .
```

To fix any errors:
```bash
npx expo lint --fix
```
If it's missing any errors use this command:
```
npm run lint:all
```

# Testing
To run both server and client tests:
```
npm run test
```

To run client tests (by itself):
```
npm run test:jest
```

To run server tests (by itself):
```
npm run test:vitest
```
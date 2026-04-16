### Climbr | Team Git Rich

#### Overview

Climbr is a mobile app built to help rock climbers track their progress in a simple, fast, and organized way. Instead of forcing users through a cluttered logging flow, the app focuses on quick entry, clear stats, and a clean experience that fits naturally into a climbing session.

Users can log climbs, review progress over time, attach media to memorable sessions, and keep a personal record of their climbing journey. The app is designed for both casual climbers and more serious athletes who want a lightweight tracking tool that stays out of the way.

#### Project Info

Class: CSCE 4901 and 4902 Section 001

Team members:

- Kathryn Sheahen
- Thane Tate
- Kaden Mcclung
- Aymen Beshir
- Clinton Nguyen

#### Key Features

- Track climbs with details like category, grade, attempts, and rating
- Add photos and videos to climbs
- Edit or delete past climbs
- View progress analytics with charts and stats
- Create user accounts and manage profiles
- Sync climbing data across devices in real time
- Earn achievements and badges
- Visualize activity streaks with daily bubbles
- Use a clean, minimal UI built for quick interaction

#### Tech Stack

- Expo and React Native
- Expo Router for navigation
- Supabase for backend services and authentication
- TypeScript
- Jest and Vitest for testing

#### Getting Started

Install the dependencies:

```bash
npm install
```

#### Running the Application

Start the front end application:

```bash
npx expo start
```

Then scan the barcode with your device 1. With Expo Go (Android) 2. With your camera app (IOS)

#### Running Linting

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

Run all tests:

```bash
npm run test
```

To run client tests (by itself):

```bash
npm run test:jest
```

To run server tests (by itself):

```bash
npm run test:vitest
```

#### Demo

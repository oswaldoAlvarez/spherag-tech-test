# Spherag Technical Test

React Native mobile app built with Expo and TypeScript for the Spherag technical assignment.

## Overview

The app implements the full requested flow:

- Login
- Farms list
- Atlas list
- Atlas detail

It uses the real Spherag endpoints for authentication and protected data access.

## Tech Stack

- React Native
- Expo
- TypeScript
- Expo Router
- TanStack Query
- NativeWind
- Jest + React Native Testing Library

## Features

- Functional login against the real API
- Secure token persistence
- Protected requests with Bearer token
- Farms list with favorite status and formatted creation date
- Atlas list with pagination
- Atlas detail with metrics and map
- Loading, error, and empty states
- Reusable shared UI components

## Project Structure

```text
src/
  app/
  features/
    auth/
    farms/
    atlas/
  shared/
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the Expo development server

```bash
npx expo start -c
```

Then use the Expo CLI shortcuts:

- Press `a` to open Android
- Press `i` to open iOS

## Available Scripts

```bash
npx expo start -c
npm run lint
npm run typecheck
npm run test
npm run test:ci
npm run format
npm run format:check
```

## Notes

- The app uses the real endpoints provided in the technical test PDF.
- Query state is handled with TanStack Query.
- Authentication data is stored securely on device.
- The intended targets are Android and iOS through Expo.

## Author

Oswaldo Alvarez

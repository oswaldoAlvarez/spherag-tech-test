# Spherag Technical Test

React Native mobile app built with Expo and TypeScript for the Spherag technical assignment.

<img width="440" height="841" alt="Captura de pantalla 2026-03-26 a la(s) 15 48 22" src="https://github.com/user-attachments/assets/88a8aa35-81ee-448e-baa1-912a04310874" />

<img width="431" height="868" alt="Captura de pantalla 2026-03-26 a la(s) 15 47 48" src="https://github.com/user-attachments/assets/f7d69883-bec2-4d08-8377-2c0cb69f3c04" />

<img width="435" height="841" alt="Captura de pantalla 2026-03-26 a la(s) 15 47 38" src="https://github.com/user-attachments/assets/5c5dc73d-89ed-4994-8a3c-9c1864b49837" />

<img width="454" height="869" alt="Captura de pantalla 2026-03-26 a la(s) 15 47 27" src="https://github.com/user-attachments/assets/ff25838f-8e66-44a6-8d6c-441dc0df4e68" />

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

## Architecture Notes

This project follows a domain-oriented structure inspired by Feature-Sliced Design:

- `app/` contains route files and screen composition.
- `features/` contains domain-specific logic, hooks, API modules, and UI for each feature.
- `shared/` contains reusable UI primitives, utilities, configuration, and cross-feature helpers.

Reusable UI is organized with an atomic-style hierarchy to keep components easy to discover and scale:

- `atoms/` for basic building blocks such as text and icons.
- `molecules/` for small composed UI pieces such as buttons, cards, and feedback states.
- `templates/` for layout wrappers shared across screens.

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

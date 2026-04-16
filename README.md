# Zilch Task

React Native showcase app built with Expo SDK 55. Demonstrates cards management with animations, global state (Jotai), and thorough testing.

## Demo

./zilch-task-recording.MP4

## Prerequisites

- [Bun](https://bun.sh/) >= 1.3.10
- [Xcode](https://developer.apple.com/xcode/) (iOS) or [Android Studio](https://developer.android.com/studio) (Android)
- iOS Simulator or Android Emulator configured
- **Dev client required** — native modules, no Expo Go support

## Getting Started

```bash
bun install              # Install dependencies
bun run prebuild         # Generate native projects
bun run ios              # Run on iOS simulator
```

## Scripts

<!-- Source of truth: package.json scripts -->

### Development

| Command           | Description             |
| ----------------- | ----------------------- |
| `bun start`       | Start Expo dev server   |
| `bun run ios`     | Run on iOS simulator    |
| `bun run android` | Run on Android emulator |
| `bun run web`     | Start web dev server    |

### Building

| Command                  | Description                                        |
| ------------------------ | -------------------------------------------------- |
| `bun run prebuild`       | Generate native projects (ios/android dirs)        |
| `bun run prebuild:clean` | Clean prebuild (removes + regenerates native dirs) |
| `bun run ios:release`    | iOS release build                                  |
| `bun run android:release`| Android release build                              |

### Code Quality

| Command                    | Description                                   |
| -------------------------- | --------------------------------------------- |
| `bun run type:check`       | Type check with tsgo                          |
| `bun run type:check:clean` | Clean type check (removes .tsbuildinfo first) |
| `bun run lint`             | Lint with oxlint                              |
| `bun run lint:fix`         | Lint and auto-fix                             |
| `bun run format:check`     | Check formatting with oxfmt                   |
| `bun run format:fix`       | Format a file                                 |
| `bun run format:fix:all`   | Format all files                              |

### Testing

| Command                          | Description               |
| -------------------------------- | ------------------------- |
| `bun run test:unit`              | Run unit tests (Jest)     |
| `bun run test:unit:watch`        | Watch all tests           |
| `bun run test:unit:changed`      | Watch only changed files  |
| `bun run test:unit:update`       | Update snapshots          |
| `bun run test:e2e`               | Run all Maestro e2e flows |
| `bun run test:e2e:single <file>` | Run a single Maestro flow |

### E2E Testing (Maestro)

Maestro tests run against a real app on an iOS Simulator or Android Emulator.

**Setup:**

```bash
brew install maestro         # Install Maestro CLI
bun run ios                  # Build & run on iOS Simulator
```

**Running tests:**

```bash
bun run test:e2e                                    # Run all 8 flows
bun run test:e2e:single .maestro/flows/01_app_launch.yaml  # Run single flow
```

Failed tests produce screenshots in `.maestro/screenshots/`.

**Flows:**

| Flow | What it tests |
|------|--------------|
| `01_app_launch` | First card visible, action buttons present |
| `02_carousel_navigation` | Swipe between cards, banner/actions toggle |
| `03_active_card_actions` | Button labels and testIDs |
| `04_freeze_unfreeze` | Freeze toggle with animation wait |
| `05_status_banners` | BLOCKED/PENDING/EXPIRED banner text |
| `06_card_details_sheet` | Bottom sheet open, content, dismiss |
| `07_frozen_card_behavior` | Pre-frozen card shows unfreeze |
| `08_disabled_buttons` | Limits/Settings tap does nothing |

**Biometric bypass for E2E:**

Flow 06 taps "Card details" which triggers biometrics. Build with bypass:

```bash
EXPO_PUBLIC_E2E_BYPASS_BIOMETRICS=true bun run ios
```

### Maintenance

| Command         | Description                       |
| --------------- | --------------------------------- |
| `bun run clean` | Remove node_modules and reinstall |

## Architecture

### Project Structure

```
src/
├── app/               # Expo Router routes (file-based, kebab-case)
├── assets/            # Images, SVGs, graphics
├── components/        # Reusable UI components
│   ├── Badge/         # Badge component
│   ├── IconButton/    # Icon button variants
│   ├── Layouts/       # Screen containers
│   ├── Panels/        # Display panels
│   ├── Sheets/        # Action sheet registration
│   └── Texts/         # Typography (Title, Subtitle, Body)
├── features/          # Feature modules (co-located atoms, components, tests)
│   └── cards/         # Card management feature
├── hooks/             # Custom React hooks
├── i18n/              # i18next config + locale files
├── store/             # Jotai global store
├── styles/            # Unistyles theme + breakpoints
└── utils/             # Storage adapters, date, logging
```

### State Management

Jotai atoms co-located with features. Persisted to MMKV via `atomWithMMKV()` adapter for fast synchronous storage.

### Navigation

Single-screen currently (root layout + home). File-based routing via Expo Router.

## Tech Stack

- **Expo SDK 55** / React Native 0.83.4 / React 19.2
- **Expo Router** — file-based navigation
- **Jotai + MMKV** — atomic state with synchronous persistence
- **Reanimated 4** — animations (spring/bounce, gesture-driven)
- **Unistyles v3** — styling engine
- **Skia** — graphics and particle effects
- **expo-haptics** — tactile feedback
- **expo-local-authentication** — biometric auth
- **react-native-actions-sheet** — bottom sheets
- **react-native-svg** — SVG rendering
- **i18next** — internationalization
- **dayjs** — date handling
- **Jest + Maestro** — unit + e2e testing

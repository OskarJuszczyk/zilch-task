# CLAUDE.md

AI-specific conventions and guardrails. See README.md for project overview, setup, and architecture.

## Commands

```bash
bun start                          # Dev server
bun run ios                        # iOS simulator
bun run android                    # Android emulator
bun run test:unit                  # Unit tests (jest)
bun run test:unit:watch            # Watch mode
bun run test:e2e                   # Maestro e2e tests
bun run type:check                 # tsgo
bun run lint                       # oxlint
bun run format:fix:all             # oxfmt
```

## State Management

Jotai atoms co-located with features. Persisted to MMKV via `atomWithMMKV()` adapter (`@utils/storage/atomWithMmkv`).

## Naming Conventions

- **Files in `src/app/`**: kebab-case (`transaction-details.tsx`) — Expo Router maps filenames to URL segments
- **Files everywhere else**: PascalCase for components (`CardLayout.tsx`), camelCase for non-components (`useLayout.ts`, `formatCardNumber.ts`). Exception: `src/assets/graphics/` uses kebab-case (auto-generated SVGs)
- **Functions / variables**: camelCase (`getTransactions`, `isLoading`)
- **Constants**: SNAKE_CASE (`MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT`)
- **Types / interfaces**: PascalCase (`Transaction`, `CardDetails`)
- Routes belong in `src/app/` only — never co-locate components, types, or utilities there
- Use tsconfig path aliases (`@components`, `@hooks`, `@utils`, `@store`, `@features`, `@styles`, `@i18n`, `@assets`)
- Always use import statements at the top of the file

## Navigation (Expo Router)

- Use `_layout.tsx` files to define Stacks
- Use `Stack` from `expo-router/stack` for native navigation stacks
- Use `<Link href="/path" />` for navigation, with `<Link.Preview>` and context menus where appropriate
- Use `presentation: "modal"` or `presentation: "formSheet"` for overlays — not custom modal components
- Prefer `<Toolbar>` from `expo-router/stack` for search bars, titles, header options. See https://docs.expo.dev/router/advanced/stack-toolbar/

## Styling (Unistyles v3)

- Import `StyleSheet` from `react-native-unistyles` — **never** from `react-native`
- **Never spread styles** (`{...styles.x}`) — use array syntax `[styles.x, styles.y]`
- **Never re-export StyleSheet** from barrel files
- `StyleSheet.configure()` must run before any `StyleSheet.create()` (handled by `index.ts` entry point)
- Use `withUnistyles` to inject theme into 3rd-party components
- Use `{ borderCurve: 'continuous' }` for rounded corners (not capsule shapes)
- Prefer flex gap over margin/padding
- Prefer padding over margin
- Use `contentContainerStyle` for ScrollView padding (avoids clipping)
- CSS `boxShadow` for shadows — never legacy RN shadow/elevation props

## UI Patterns

- Wrap root route content in `<ScrollView contentInsetAdjustmentBehavior="automatic" />` instead of `<SafeAreaView>`
- Apply `contentInsetAdjustmentBehavior="automatic"` to FlatList/SectionList too
- Always account for safe area (top and bottom) via stack headers, tabs, or ScrollView
- Add entering/exiting animations (Reanimated) for state changes
- Use navigation stack titles, not custom text headers
- Haptics: use haptics for flow-critical interactions

## Library Bans

- ~~expo-permissions~~ → removed, use per-module permissions
- ~~Picker, WebView, SafeAreaView from react-native~~ → use community/expo equivalents
- ~~AsyncStorage~~ → use `react-native-mmkv` (faster, synchronous)
- ~~StyleSheet from react-native~~ → use `StyleSheet` from `react-native-unistyles`

## Development Notes

- **Dev client required** — many deps need native modules (no Expo Go)
- Use `process.env.EXPO_OS` instead of `Platform.OS`
- Use `useWindowDimensions` instead of `Dimensions.get()`
- Register bottom sheets in `@components/Sheets`
- Call `dayjsSetup()` at app init for date handling
- Use `log` from `@utils/logger` for logging

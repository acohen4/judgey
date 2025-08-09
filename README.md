# judgey

ESM-only TypeScript library for Node.js.

## Scripts

- `npm run build`: Compile TypeScript to `dist/`
- `npm run type-check`: Type-check without emitting
- `npm run watch`: Watch mode build
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix lint issues
- `npm run format`: Prettier write
- `npm run format:check`: Prettier check
- `npm run test`: Vitest watch mode
- `npm run test:run`: Vitest in CI mode
- `npm run coverage`: Vitest with coverage

## CI

GitHub Actions runs lint, format check, type-check, build, tests, and coverage across Node 18/20/22.

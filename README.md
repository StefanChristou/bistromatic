# bistromatic

This is the source code for stefanchristou.com. A personal portfolio website built with SvelteKit.

## Pre-requisites

This project requires node v18.

## Developing

Once you've cloned the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Testing

Testing is done with Playwright. My preference in this case was to use e2e testing over unit testing as this project relies heavily on complex user interactions rather than on "pure" computed output.

This may change in future as the project grows and more complex logic is added.

```bash
npm run test

# or start the test runner with a user interface
npm run test:ui
```

## Linting / formatting / typechecking

```bash
npm run lint

npm run format

npm run check
```

## Building

```bash
npm run build
```

## Deploying / CI/CD

The application is automatically deployed via Vercel upon the completion of a pull request into main. Preview builds are created for each PR. A github action that builds, tests, lints and typechecks the application must pass before a PR can be merged.

## License

All rights reserved © Stefan Christou 2024

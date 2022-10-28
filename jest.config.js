// jest.config.js
const nextJest = require("next/jest")

// The TypeScript error on the next line is expected at this time b/c of Next
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
})

const customJestConfig = {
  // The `testEnvironment` is a separate package that is necessary:
  testEnvironment: "jest-environment-jsdom",
  // We extend our Jest helpers by always running `jest.setup.js`:
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // We run tests matching .(spec|test).(t|j)sx? in any directory:
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  // We allow our Jest tests to find the files inside node_modules:
  moduleDirectories: ["node_modules", "<rootDir>/"],
  // We want to be able to use absolute import paths, like @/**/*:
  moduleNameMapper: {
    // This pattern is the same as what we put in `tsconfig.json`:
    "^@/(.*)$": "<rootDir>/$1",
  },
  // We don't always want to collect coverage, so we can run `npx jest`,
  // and we override it for our `yarn test` script in `package.json`:
  collectCoverage: false,
  // For coverage, we look at the whole project, except config files or
  // any directories that don't include production code, like coverage:
  collectCoverageFrom: [
    "<rootDir>/**/*.{js,jsx,ts,tsx}",
    "!*.config.js",
    "!.eslintrc.js",
    "!.postcss.config.js",
    "!.prettierrc.js",
    "!.tailwind.config.js",
    "!<rootDir>/coverage/**/*",
  ],
  // We exclude certain directories from our code coverage report:
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
}

// `createJestConfig` is exported this special way so that
// "next/jest" can load the Next.js config, which is async.
module.exports = createJestConfig(customJestConfig)

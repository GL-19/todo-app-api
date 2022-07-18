/* eslint-disable import/no-extraneous-dependencies */
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
	bail: false,
	clearMocks: true,
	collectCoverage: false,
	collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	coverageReporters: ["lcov", "text-summary"],
	preset: "ts-jest",
	testMatch: ["**/*.spec.ts"],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

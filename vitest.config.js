import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        clearMocks: true, // this will automatically clear all mocks before each test
    },
});

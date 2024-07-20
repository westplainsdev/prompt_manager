/// <reference types="vitest" />

// eslint-disable-next-line n/no-unpublished-import
import { defineConfig } from 'vitest/config';
delete process.env.DEBUG;

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    globals: true,
    mockReset: true,
    clearMocks: true
  }
});

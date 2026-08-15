const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './src/playwright',
  use: {
    baseURL: 'http://localhost:5173',
  },
  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});

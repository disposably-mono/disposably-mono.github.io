module.exports = {
  testDir: 'tests/e2e',
  use: {
    baseURL: 'http://localhost:8080',
    launchOptions: {
      executablePath: process.env.CI_BROWSER || undefined,
    },
  },
  webServer: {
    command: 'python3 -m http.server 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: true,
  },
};

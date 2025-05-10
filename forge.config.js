const fs = require('fs-extra');
const path = require('path');
const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: './public/icon',
  },
  hooks: {
    postPackage: async (forgeConfig, options) => {
      const appPath = path.join(options.outputPaths[0], 'resources', 'app');
      const sourcePath = path.resolve(__dirname, '../Chathai_OnDev');
      const targetPath = path.join(appPath, 'node_modules', 'chathai');

      await fs.copy(sourcePath, targetPath);
      console.log('Copied Chathai_OnDev to packaged app.');
    },
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'my_electron_app',
        authors: 'ChathaiTeam', // Add your name or company here
        description: 'Chathai Test Generator - A tool for generating Cypress test scripts.', // Add a description here
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'K2anC2ai',
          name: 'chathai-ui-electron',
        },
        prerelease: false,
        draft: true,
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

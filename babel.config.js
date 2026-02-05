module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@ds': './src/components/design-system',
          },
        },
      ],
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './src/components/design-system/config/tamagui.config.ts',
        },
      ],
    ],
  }
}

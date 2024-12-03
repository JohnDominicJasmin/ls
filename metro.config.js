const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (() => {
  const defaultConfig = getDefaultConfig(__dirname);
  return {
    resolver: {
      sourceExts: ['jsx', 'js', 'ts', 'tsx'], // Add your extensions if necessary
    },
    ...defaultConfig,
    transformer: {
      ...defaultConfig.transformer,
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      ...defaultConfig.resolver,
      // Revert changes for SVG handling
      assetExts: [...defaultConfig.resolver.assetExts, 'svg'],
      sourceExts: defaultConfig.resolver.sourceExts.filter(ext => ext !== 'svg'),
    },
  };
})();

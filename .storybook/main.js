module.exports = {
  stories: ['../stories/**/*.stories.@(tsx|mdx)'],
  addons: [
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          parser: 'typescript',
          prettierConfig: {
            tabWidth: 2,
            singleQuote: false,
          },
        },
      },
    },
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    'storybook-addon-performance',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
  ],
  // typescript: {
  //   check: false,
  //   checkOptions: {},
  //   reactDocgen: 'react-docgen-typescript',
  //   reactDocgenTypescriptOptions: {
  //     propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
  //   },
  // },
  webpackFinal: (config) => {

    // ===================
    /**
     * modify storybook default config
     * remove svg default file-loader
     * use both @svgr/webpack and file-loader
     */
    const fileLoaderRule = config.module.rules.find(rule => {
      try {
        if (rule.test.test('.svg')) {
          return true
        }
      } catch (error) {
      }
      return false
    });
    fileLoaderRule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: {
              removeViewBox: false
            }
          },
        },
      }, {
        loader: 'file-loader',
        options: { name: 'icons/assets/[name].[hash:8].[ext]', esModule: false },
      }],
    })
    // ===================

    return config
  }
}
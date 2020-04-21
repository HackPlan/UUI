const path = require('path')

module.exports = {
  stories: ['../stories/**/*.stories.(tsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-knobs',
    '@storybook/addon-docs',
  ],
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
      use: ['@svgr/webpack', {
        loader: 'file-loader',
        options: { name: 'static/media/[name].[hash:8].[ext]', esModule: false },
      }],
    })
    // ===================

    return config
  }
}
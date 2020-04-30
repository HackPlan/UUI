const path = require('path')
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    '../stories/**/*.jsx',
    '../stories/**/*.tsx',
    '../stories/**/*.ts',
    '../stories/**/*.mdx',
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-import'),
    require('tailwindcss')(path.resolve(__dirname, 'tailwind.config.js')),
    ...(
      process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
    ),
  ]
}
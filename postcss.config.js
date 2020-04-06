const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.tsx',
    ...(process.env.STORYBOOK_BUILD === 'yes' ? [
      './stories/**/*.jsx',
      './stories/**/*.tsx',
      './stories/**/*.ts',
      './stories/**/*.mdx',
    ] : []),
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    ...(
      process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
    ),
  ]
}
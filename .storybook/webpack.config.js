module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loaders: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          noUnusedLocals: false,
          ignoreDiagnostics: [7005, 2347],
        },
      },
    ],
  });
  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: 'postcss-loader',
      }
    ],
  })
  config.module.rules.push({
    test: /\.s[ac]ss$/i,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          // Prefer `dart-sass`
          implementation: require('sass'),
          sassOptions: {
            fiber: require('fibers'),
          },
        }
      },
    ],
  })
  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
        },
      },
    ],
  })
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
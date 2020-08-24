const path = require('path');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          ignoreDiagnostics: [1005],
          configFile: path.resolve(__dirname, "./tsconfig.json"),
        }
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          // Provide the path to your tsconfig.json so that your stories can
          // display types from outside each individual story.
          tsconfigPath: path.resolve(__dirname, "./tsconfig.json"),
        },
      },
    ],
  });
  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.resolve(__dirname, 'postcss.config.js'),
          }
        }
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
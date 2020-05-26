const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/**
 * MiniCssExtractPlugin Cleanup
 * https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151#issuecomment-449839355
 */
class Without {
  constructor(patterns) {
      this.patterns = patterns;
  }
  apply(compiler) {
      compiler.hooks.emit.tapAsync("MiniCssExtractPluginCleanup", (compilation, callback) => {
          Object.keys(compilation.assets)
              .filter(asset => {
                  let match = false,
                      i = this.patterns.length
                  ;
                  while (i--) {
                      if (this.patterns[i].test(asset)) {
                          match = true;
                      }
                  }
                  return match;
              }).forEach(asset => {
                  delete compilation.assets[asset];
              });
          callback();
      });
  }
}

module.exports = {
  entry: {
    index: ['./src/styles/index.scss', './src/index.ts'],
    base: ['./src/styles/base.scss'],
    Button: ['./src/styles/components/Button.scss'],
    Cascader: ['./src/styles/components/Cascader.scss'],
    Checkbox: ['./src/styles/components/Checkbox.scss'],
    DatePicker: ['./src/styles/components/DatePicker.scss'],
    Dialog: ['./src/styles/components/Dialog.scss'],
    Drawer: ['./src/styles/components/Drawer.scss'],
    Icon: ['./src/styles/components/Icon.scss'],
    TextField: ['./src/styles/components/TextField.scss'],
    NumberField: ['./src/styles/components/NumberField.scss'],
    TextArea: ['./src/styles/components/TextArea.scss'],
    PageInfo: ['./src/styles/components/PageInfo.scss'],
    PageJumper: ['./src/styles/components/PageJumper.scss'],
    PageList: ['./src/styles/components/PageList.scss'],
    PageSize: ['./src/styles/components/PageSize.scss'],
    Popover: ['./src/styles/components/Popover.scss'],
    RadioGroup: ['./src/styles/components/RadioGroup.scss'],
    Radio: ['./src/styles/components/Radio.scss'],
    SegmentControl: ['./src/styles/components/SegmentControl.scss'],
    HTMLSelect: ['./src/styles/components/HTMLSelect.scss'],
    Select: ['./src/styles/components/Select.scss'],
    Skeleton: ['./src/styles/components/Skeleton.scss'],
    Slider: ['./src/styles/components/Slider.scss'],
    Stepper: ['./src/styles/components/Stepper.scss'],
    Switch: ['./src/styles/components/Switch.scss'],
    Table: ['./src/styles/components/Table.scss'],
    Tag: ['./src/styles/components/Tag.scss'],
    Toaster: ['./src/styles/components/Toaster.scss'],
  },
  output: {
    libraryTarget: 'umd',
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib'),
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        'css-loader',
        'postcss-loader',
      ]
    }, {
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
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
        }
      ],
    }, {
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
        options: { name: 'icons/assets/[name].[ext]', esModule: false },
      }],
    }],
  },
  plugins: [
    /**
     * Extract and compile style files to css file.
     */
    new MiniCssExtractPlugin({
      moduleFilename: ({ name }) => {
        if (name === 'index') {
          return '[name].css'
        } else {
          return 'styles/css/[name].css'
        }
      }
    }),
    /**
     * Exclude useless empty component js file.
     */
    new Without([
      /base.js/,
      /Button.js$/,
      /Cascader.js$/,
      /Checkbox.js$/,
      /DatePicker.js$/,
      /Dialog.js$/,
      /Drawer.js$/,
      /Icon.js$/,
      /TextField.js$/,
      /NumberField.js$/,
      /TextArea.js$/,
      /PageInfo.js$/,
      /PageJumper.js$/,
      /PageList.js$/,
      /PageSize.js$/,
      /Popover.js$/,
      /RadioGroup.js$/,
      /Radio.js$/,
      /SegmentControl.js$/,
      /HTMLSelect.js$/,
      /Select.js$/,
      /Skeleton.js$/,
      /Slider.js$/,
      /Stepper.js$/,
      /Switch.js$/,
      /Table.js$/,
      /Tag.js$/,
      /Toaster.js$/,
    ]),
    /**
     * Copy sass source style files.
     */
    new CopyPlugin([
      {
        from: './src/styles',
        to: 'styles/sass',
        transformPath(targetPath, absolutePath) {
          return targetPath.replace('/src/styles', '');
        },
      },
    ]),
  ],
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          }
        }
      }),
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: ["react", "react-dom"],
};
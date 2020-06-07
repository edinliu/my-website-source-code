const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/
const postCssConfig = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [
      require('precss'),
      require('autoprefixer'),
      require('cssnano')({
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }]
      }),
    ],
  },
}

const cssRule = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
      }
    },
    postCssConfig,
  ]
}
const cssModuleRule = {
  test: cssModuleRegex,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          mode: 'local',
          localIdentName: '[hash:base64:5]',
        },
        importLoaders: 1,
      }
    },
    postCssConfig,
  ]
}
const sassRule = {
  test: sassRegex,
  exclude: sassModuleRegex,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
      }
    },
    postCssConfig,
    'sass-loader'
  ]
}
const sassModuleRule = {
  test: sassModuleRegex,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          mode: 'local',
          localIdentName: '[hash:base64:5]',
        },
        importLoaders: 1,
      }
    },
    postCssConfig,
    'sass-loader',
  ],
}
module.exports = function styleRulesProd(config) {
  config.module.rules.push(
    cssRule,
    cssModuleRule,
    sassRule,
    sassModuleRule
  )
}
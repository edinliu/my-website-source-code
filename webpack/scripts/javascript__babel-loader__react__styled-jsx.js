/* eslint-disable */
module.exports = {
  install: function () {
    require('../helpers/install')(['react', 'react-dom'])
    require('../helpers/install-D')(['@babel/core', 'babel-loader', '@babel/preset-env', '@babel/preset-react', 'styled-jsx'])
  },
  config: function () {
    global.config.module.rules.push({
      test: /\.js(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              'styled-jsx/babel',
            ],
          },
        },
      ],
    });
  }
}

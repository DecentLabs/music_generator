const merge = require('babel-merge')

module.exports = {
  chainWebpack: config => {
    config.module.rule('vue').use("vue-loader").tap(options => merge(
      options, { transformAssetUrls: { 'video': 'src', 'source': 'src'}}
    ))
  },
  lintOnSave: true,
  baseUrl: '',
  outputDir: 'docs'
}

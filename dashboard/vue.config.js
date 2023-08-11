const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    // allowedHosts: 'all',
    port: 5000
  },
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
}

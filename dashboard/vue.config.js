const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // devServer: {
  //   overlay: {
  //     warnings: true,
  //     errors: false
  //   }
  // }
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})

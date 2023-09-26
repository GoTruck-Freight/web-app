const fs = require('fs')

module.exports = {
    devServer: {
      // 'auto' | 'all' [string] here
      allowedHosts: 'all',
      port: 8000,
      allowedHosts: 'all',
      client: {
	      // Can be `string`:
	      //
	      // To get protocol/hostname/port from browser
	      // webSocketURL: 'auto://0.0.0.0:0/ws'
	      webSocketURL: 'auto://0.0.0.0:0/ws'
	},
     },
  };


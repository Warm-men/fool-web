module.exports = {
  proxy: {
    '/web': {
      target: 'http://203.195.237.61:8099/',
      changeOrigin: true,
      secure: false
    }
  }
}

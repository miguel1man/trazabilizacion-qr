module.exports = function override(config, env) {
    config.externals = {
      'node-rsa': 'commonjs node-rsa'
    }
    return config;
  }
  
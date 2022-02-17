import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1644977795943_1187'

  config.security = { csrf: false }

  config.rundir = process.cwd() + '/run'

  // add your egg config in here
  config.middleware = []

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.html': 'nunjucks'
      }
    }
  }
}

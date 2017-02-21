import bs from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import stripAnsi from 'strip-ansi';
const browserSync = bs.create();

/**
 * FRONT END SETUP
 */
import webpackConfig from '../webpack.config';
const bundler = webpack(webpackConfig);
/**
 * Reload all devices when bundle is complete
 * or send a fullscreen error message to the browser instead
 */
bundler.plugin('done', function (stats) {
  if (stats.hasErrors() || stats.hasWarnings()) {
    return browserSync.sockets.emit('fullscreen:message', {
      title: 'Webpack Error:',
      body: stripAnsi(stats.toString()),
      timeout: 100000
    });
  }
  browserSync.reload();
});

/**
 * Run Browsersync and use middleware for Hot Module Replacement - https://github.com/BrowserSync/recipes/tree/master/recipes/webpack.react-hot-loader
 */
browserSync.init({
  logFileChanges: false,
  server: {
    baseDir: 'dist',
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true }
      }),
      webpackHotMiddleware(bundler)
    ]
  },
  // https: true,
  plugins: ['bs-fullscreen-message'],
  logLevel: 'info',
  ghostMode: {
    clicks: false,
    forms: false,
    scroll: false
  }
});

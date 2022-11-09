module.exports = {
  apps: [
    {
      name: 'koa-demo-1',
      port: 4000,
      cwd: './',
      script: './build/index.js',
      out_file: './logs/koa-demo-1.log',
      error_file: './logs/koa-demo-1-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // instances: 2,
      merge_logs: true,
      env_production: {
        NODE_ENV: 'production',
      },
    },
    // {
    //   name: 'koa-demo-2',
    //   port: 5000,
    //   cwd: './',
    //   script: './build/index.js',
    //   out_file: './logs/koa-demo-2.log',
    //   error_file: './logs/koa-demo-2-error.log',
    //   log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    //   instances: 2,
    //   merge_logs: true,
    //   env_production: {
    //     NODE_ENV: 'production',
    //   },
    // },
  ],
}

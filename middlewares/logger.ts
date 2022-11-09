/**
 * Module dependencies.
 */

import { Context, Next } from 'koa'
import chalk from 'chalk'
const humanize = require('humanize-number')

/**
 * Expose logger.
 */

export default dev

/**
 * Color map.
 */

const colorCodes = {
  7: 'magenta',
  5: 'red',
  4: 'yellow',
  3: 'cyan',
  2: 'green',
  1: 'green',
  0: 'yellow',
}

/**
 * Development logger.
 */

function dev() {
  // print to console helper.
  const print = (function () {
    return function printFunc(...args: any[]) {
      console.log(...args)
    }
  })()

  return async function logger(ctx: Context, next: Next) {
    // request
    const start = ctx['request-received.startTime']
      ? ctx['request-received.startTime'].getTime()
      : Date.now()
    const requestBody = Object.keys(ctx.request.body).length
      ? ctx.request.body
      : ''
    print(
      '  ' +
        chalk.gray('<--') +
        ' ' +
        chalk.bold('%s') +
        ' ' +
        chalk.gray('%s') +
        ' ' +
        chalk.green('%s'),
      ctx.method,
      ctx.originalUrl,
      requestBody
    )

    try {
      await next()
    } catch (err) {
      // log uncaught downstream errors
      log(print, ctx, start, err)
      throw err
    }

    // log when the response is finished or closed,
    // whichever happens first.
    const res = ctx.res

    const onfinish = done.bind(null, 'finish')
    const onclose = done.bind(null, 'close')

    res.once('finish', onfinish)
    res.once('close', onclose)

    function done(event: any) {
      res.removeListener('finish', onfinish)
      res.removeListener('close', onclose)
      log(print, ctx, start, null, event)
    }
  }
}

/**
 * Log helper.
 */

function log(
  print: Function,
  ctx: Context,
  start: number,
  err: any,
  event?: any
) {
  // get the status code of the response
  const status = err
    ? err.isBoom
      ? err.output.statusCode
      : err.status || 500
    : ctx.status || 404

  // set the color of the status code;
  const s = (status / 100) | 0

  const color = colorCodes.hasOwnProperty(s) ? colorCodes[s] : colorCodes[0]

  const upstream = err
    ? chalk.red('xxx')
    : event === 'close'
    ? chalk.yellow('-x-')
    : chalk.gray('-->')

  print(
    '  ' +
      upstream +
      ' ' +
      chalk.bold('%s') +
      ' ' +
      chalk.gray('%s') +
      ' ' +
      chalk[color]('%s') +
      ' ' +
      chalk[color]('%s') +
      ' ' +
      chalk.gray('%s'),
    ctx.method,
    ctx.originalUrl,
    status,
    err?.message || err || 'OK',
    time(start)
  )
}

/**
 * Show the response time in a human readable format.
 * In milliseconds if less than 10 seconds,
 * in seconds otherwise.
 */

function time(start: number) {
  const delta = Date.now() - start
  return humanize(delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's')
}

import { Signale } from 'signale'

const options = {
  types: {
    info: {
      badge: 'ℹ️',
      color: 'blue',
      label: 'info'
    },
    error: {
      badge: '❌',
      color: 'red',
      label: 'error'
    },
    warn: {
      badge: '⚠️',
      color: 'yellow',
      label: 'warn'
    },
    debug: {
      badge: '🐛',
      color: 'magenta',
      label: 'debug'
    },
    success: {
      badge: '✅',
      color: 'green',
      label: 'success'
    }
  }
}

export const logger = new Signale(options)
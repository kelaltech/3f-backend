require('./functions/load-env')()

const { ConnectionString } = require('connection-string')

module.exports = ({ env }) => {
  const parsed = new ConnectionString(
    env(
      'DATABASE_URL',
      `postgres://${env('DATABASE_USERNAME', 'postgres')}:${env(
        'DATABASE_PASSWORD',
        'Pass1234'
      )}@${env('DATABASE_HOST', '127.0.0.1')}:${env.int(
        'DATABASE_PORT',
        5432
      )}/${env('DATABASE_NAME', '3f-backend')}?ssl=${env.bool(
        'DATABASE_SSL',
        false
      )}`
    )
  )

  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: parsed.protocol,
          username: parsed.user,
          password: parsed.password,
          host: parsed.hostname,
          port: parsed.port,
          database: parsed.path.join('/'),
          ssl: {
            rejectUnauthorized: parsed.params && parsed.params.ssl === 'true', // For self-signed certificates
          },
        },
        options: {},
      },
    },
  }
}
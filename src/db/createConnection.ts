import nano from 'nano'

export const createConnection = async () => {
  const requestDefaults = {
    cache: 'no-store',
    auth: {
      username: process.env['DB_USERNAME']!,
      password: process.env['DB_PASSWORD']!
    }
  }

  const connection = nano({
    url: process.env['DATABASE_URL']!,
    requestDefaults
  })

  return connection
}

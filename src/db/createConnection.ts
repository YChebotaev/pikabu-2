import nano from 'nano'

export const createConnection = async () => {
  const connection = nano(process.env['DATABASE_URL']!)

  await connection.auth(process.env['DB_USERNAME']!, process.env['DB_PASSWORD']!)

  return connection
}

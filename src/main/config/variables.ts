export const variables = {
  host: process.env.MONGO_HOST ?? 'undefined',
  protocol: process.env.MONGO_PROTOCOL ?? 'undefined',
  username: process.env.MONGO_USERNAME ?? 'undefined',
  password: process.env.MONGO_PASSWORD ?? 'undefined',
  port: process.env.MONGO_PORT ?? 'undefined'
}

export const testVariables = (): boolean => {
  return Object.values(variables).every((value) => {
    console.log('Variavel: ', value)
    return (value !== 'undefined')
  })
}

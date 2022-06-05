import { Middleware } from './'

export const logMiddleware: Middleware = (data: any, next: any): any => {
  console.log('logMiddleware', data)
  next()
}

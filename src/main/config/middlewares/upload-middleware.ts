import { Middleware } from './'

export const uploadMiddleware: Middleware = (data: any, next: any): any => {
  const contentType = data.headers['content-type']
  const contentBody = data.body
  const [, bondaryKeyValue] = contentType.split(';')
  const [, boundary] = bondaryKeyValue.split('=')
  data.body = {
    data: contentBody, boundary
  }
  next()
}

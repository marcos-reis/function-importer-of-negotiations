
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Middleware } from './'

export const isAuthenticatedMiddleware: Middleware = (data: APIGatewayProxyEvent, next: any): APIGatewayProxyResult | any => {
  throw Error('User is not authenticated')
}

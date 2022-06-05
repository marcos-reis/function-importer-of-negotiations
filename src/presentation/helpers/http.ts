import {
  ServerError
} from '@/presentation/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export type HttpLambdaResponse<T = any> = {
  statusCode: number
  body: T
}

export const success = <T = any> (data: T): HttpResponse<T> => (
  {
    statusCode: 200,
    data
  }
)

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const notFound = (error: unknown): HttpLambdaResponse<string> => ({
  statusCode: 404,
  body: JSON.stringify(error)
})

export const environmentError = (error: unknown): HttpLambdaResponse<string> => ({
  statusCode: 500,
  body: JSON.stringify(error)
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined)
})

export const databaseError = (error: unknown): HttpLambdaResponse<string> => ({
  statusCode: 500,
  body: JSON.stringify(error)
})

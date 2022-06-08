import { Controller } from '../../presentation/controllers/controller-abstract'

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult
} from 'aws-lambda/trigger/api-gateway-proxy'
import { MiddlewareManager } from '../config/middlewares'
import { uploadMiddleware } from '../config/middlewares/upload-middleware'

export class AdapterLambda {
  constructor (
    private readonly controller: Controller
  ) {}

  async handler (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> {
    const middlewareManager = new MiddlewareManager()
    middlewareManager.use(uploadMiddleware)
    middlewareManager.process(event)
    const eventProcessed = middlewareManager.getEventProcessed()
    const request = eventProcessed.body
    const httpResponse = await this.controller.perform(request)

    const isValid = !!(httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299)
    const data = (isValid) ? httpResponse.data : { error: httpResponse.data.message }
    const queries = JSON.stringify(data)

    return {
      statusCode: httpResponse.statusCode,
      body: queries,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
      }
    }
  }
}

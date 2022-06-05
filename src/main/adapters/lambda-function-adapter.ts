import { Controller } from '../../presentation/controllers/controller-abstract'

import {
/*   APIGatewayProxyEvent, */
  APIGatewayProxyResult
} from 'aws-lambda/trigger/api-gateway-proxy'

export class AdapterLambda {
  constructor (
    private readonly controller: Controller
  ) {}

  async handler (event: any): Promise<APIGatewayProxyResult> {
    const request = JSON.parse(event.body)
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

import { Controller } from '@/presentation/controllers/controller-abstract'
import { AdapterLambda } from '@/main/adapters'
import { makeImportNegotiationController } from '@/main/factories/controllers/negotiation'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda/trigger/api-gateway-proxy'
import { Method } from 'aws-sdk/clients/lambda'

type Route = { event: APIGatewayProxyEvent, route: string, method: string }

// type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
type GuardRoute = { route: string, method: Method }

export const adaptRoute = async (params: Route): Promise <APIGatewayProxyResult | false> => {
  const { event, ...rest } = params

  const controller = guardRoute(rest)
  if (controller) {
    const adpater = new AdapterLambda(controller)
    const data = await adpater.handler(event)
    return data
  }
  return false
}

const guardRoute = (params: GuardRoute): Controller | false => {
  const { route, method } = params
  if (route === '/negotiations/proccess' && method === 'POST') return makeImportNegotiationController()
  return false
}

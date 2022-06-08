import { Controller } from '@/presentation/controllers/controller-abstract'
import { AdapterLambda } from '@/main/adapters'
import { makeImportNegotiationController } from '@/main/factories/controllers/negotiation'

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult
} from 'aws-lambda/trigger/api-gateway-proxy'

type Route = { event: APIGatewayProxyEventV2, route: string, method: string }

type Method = string

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
  if (route === '/negotiations/import' && method === 'POST') return makeImportNegotiationController()
  return false
}

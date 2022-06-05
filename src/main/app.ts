import './config/module-alias'
import { testVariables, variables } from '@/main/config/variables'
import { adaptRoute } from './config/routes'
import { databaseError, environmentError, notFound } from '@/presentation/helpers'
import { DatabaseConnectError, EnvironmentVariablesError, NotFoundRouteError } from '@/presentation/errors'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda/trigger/api-gateway-proxy'
import { MongoDatabaseConfig, MongoHelper } from '@/infra/database'

type RouteConfig = {
  route: string
  event: any
  method: any
}

type DatabaseConfig = MongoDatabaseConfig

type PrepareParamsType = {
  isValidVariables: boolean
  isValidRoute: boolean
  routeConfig: RouteConfig
  databaseConfig: DatabaseConfig

}

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { isValidVariables, isValidRoute, routeConfig, databaseConfig } = prepareParams(event)

  try {
    if (!isValidRoute) return notFound(new NotFoundRouteError())
    if (!isValidVariables) return environmentError(new EnvironmentVariablesError())

    const isConnected = await MongoHelper.connect(databaseConfig)
    if (!isConnected) return databaseError(new DatabaseConnectError())

    const data = await adaptRoute(routeConfig)
    if (!data) return notFound(new NotFoundRouteError())

    return data
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An unexpected error has occurred. Please, contact the responsible.' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
      }
    }
  }
}

const prepareParams = (event: any): PrepareParamsType => {
  const isValidVariables = testVariables()
  const isValidRoute = ('resource' in event) && ('httpMethod' in event)

  const host = variables.host
  const port = variables.port
  const protocol = variables.protocol
  const username = variables.username
  const password = variables.password

  const routeConfig = {
    route: event.resource,
    method: event.httpMethod,
    event
  }

  const databaseConfig = {
    host, port, protocol, username, password
  }

  return {
    isValidVariables,
    isValidRoute,
    routeConfig,
    databaseConfig
  }
}

import { APIGatewayEventDefaultAuthorizerContext, APIGatewayEventRequestContextWithAuthorizer, APIGatewayProxyEvent } from 'aws-lambda'
const context: APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext> = {
  accountId: '',
  apiId: '',
  authorizer: {},
  protocol: '',
  httpMethod: '',
  identity: {
    accessKey: '',
    accountId: '',
    apiKey: '',
    apiKeyId: '',
    caller: null,
    clientCert: null,
    cognitoAuthenticationProvider: null,
    cognitoAuthenticationType: null,
    cognitoIdentityId: null,
    cognitoIdentityPoolId: null,
    principalOrgId: null,
    sourceIp: '',
    user: null,
    userAgent: null,
    userArn: null
  },
  path: '',
  stage: '',
  requestId: '',
  requestTimeEpoch: 0,
  resourceId: '',
  resourcePath: ''
}

export const eventMock: APIGatewayProxyEvent = {
  httpMethod: 'POST',
  path: '/negotiations/proccess',
  resource: '/negotiations/proccess',
  pathParameters: {},
  headers: {},
  multiValueHeaders: {},
  isBase64Encoded: false,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: context,
  body: JSON.stringify({})
}

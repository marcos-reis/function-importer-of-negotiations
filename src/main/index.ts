import { lambdaHandler } from './app'
import { eventMock } from '../domain/mocks/mock-request'

const event = eventMock

lambdaHandler(event).then(console.log)

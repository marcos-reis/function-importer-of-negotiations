import { lambdaHandler } from './app'
import { negotiationImport } from '../domain/mocks/mock-request'

const event = negotiationImport

lambdaHandler(event).then(console.log)

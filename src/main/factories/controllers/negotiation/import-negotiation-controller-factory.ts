import { Controller } from '@/presentation/controllers/controller-abstract'
import { ImportNegotiationsController } from '@/presentation/controllers'
import { AddNegotiationService, ImportNegotiationService } from '@/application/services/negotiation'
import { NegotiationRepository } from '@/infra/database/negotiation-repository'
import { CheckValidNegotiationsService } from '@/application/services/negotiation/check-valid-negotiations'

export const makeImportNegotiationController = (): Controller => {
  const negotiationRepository = new NegotiationRepository()

  const importNegotiationService = new ImportNegotiationService()
  const checkValidNegotiationsService = new CheckValidNegotiationsService(negotiationRepository)
  const addNegotiationService = new AddNegotiationService(negotiationRepository)

  return new ImportNegotiationsController(importNegotiationService, checkValidNegotiationsService, addNegotiationService)
}

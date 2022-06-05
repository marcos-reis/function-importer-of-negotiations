import { ListNegotiationsRepository } from '@/application/contracts/database/list-negotiations-repository'
import { CheckValidNegotiationsUseCase } from './negotiation-protocols'

export class CheckValidNegotiationsService implements CheckValidNegotiationsUseCase {
  constructor (
    private readonly listNegotiationsService: ListNegotiationsRepository
  ) {}

  async perform (negotiationData: CheckValidNegotiationsUseCase.Params): Promise<CheckValidNegotiationsUseCase.Result> {
    const negotiations = await this.listNegotiationsService.list()
    const negotiationsFiltered = negotiationData.filter(negotiationDataItem => {
      const checkNegotiation = negotiations.some(negotiation => negotiation.hash === negotiationDataItem.hash)
      return !checkNegotiation
    })

    return negotiationsFiltered
  }
}

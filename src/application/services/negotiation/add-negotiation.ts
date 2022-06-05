import { AddNegotiationUseCase, AddNegotiationRepository } from './negotiation-protocols'

export class AddNegotiationService implements AddNegotiationUseCase {
  constructor (private readonly addNegotiationRepository: AddNegotiationRepository
  ) {}

  async perform (negotiationData: AddNegotiationUseCase.Params): Promise<AddNegotiationUseCase.Result> {
    return await this.addNegotiationRepository.add(negotiationData)
  }
}

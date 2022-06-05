import { AddNegotiationUseCase } from './add-negotiation'

export interface CheckValidNegotiationsUseCase {
  perform: (params: CheckValidNegotiationsUseCase.Params) => Promise<CheckValidNegotiationsUseCase.Result>
}

export namespace CheckValidNegotiationsUseCase{
  export type Params = AddNegotiationUseCase.Params[]
  export type Result = AddNegotiationUseCase.Params[]
}

import { AddNegotiationUseCase } from './add-negotiation'

export interface ImportNegotiationUseCase {
  perform: (params: ImportNegotiationUseCase.Params) => ImportNegotiationUseCase.Result
}

export namespace ImportNegotiationUseCase{
  export type Params = {
    filePath: string
  }
  export type Result = AddNegotiationUseCase.Params[]
}

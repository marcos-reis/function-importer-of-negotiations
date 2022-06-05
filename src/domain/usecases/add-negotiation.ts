export interface AddNegotiationUseCase {
  perform: (params: AddNegotiationUseCase.Params) => Promise<AddNegotiationUseCase.Result>
}

export namespace AddNegotiationUseCase{
  export type Params = {
    date: string
    quantity: number
    price: number
    code: string
    operation: string
    broker: string
    hash: string
  }
  export type Result = boolean
}

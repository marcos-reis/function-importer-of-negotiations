export interface AddNegotiationRepository {
  add: (params: AddNegotiationRepository.Params) => Promise<AddNegotiationRepository.Result>
}

export namespace AddNegotiationRepository{
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

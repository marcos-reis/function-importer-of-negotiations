import { NegotiationEntity } from '@/domain/entities'

export interface ListNegotiationsRepository {
  list: () => Promise<ListNegotiationsRepository.Result>
}

export namespace ListNegotiationsRepository{

  export type Result = NegotiationEntity[]
}

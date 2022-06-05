import { MongoHelper } from '@/infra/database/mongo-helper'
import { AddNegotiationRepository } from '@/application/contracts/database'
import { ListNegotiationsRepository } from '@/application/contracts/database/list-negotiations-repository'
import { NegotiationEntity } from '@/domain/entities'
import { QueryBuilder } from './query-builder'

export class NegotiationRepository implements AddNegotiationRepository, ListNegotiationsRepository {
  async add (params: AddNegotiationRepository.Params): Promise<AddNegotiationRepository.Result> {
    const negotiationCollection = MongoHelper.getCollection('negotiations')
    const result = await negotiationCollection.insertOne(params)
    return result.insertedId !== null
  }

  async list (): Promise<ListNegotiationsRepository.Result> {
    const negotiationCollection = MongoHelper.getCollection('negotiations')
    const query = new QueryBuilder()
      .build()
    const negotiations = await negotiationCollection.aggregate<NegotiationEntity>(query).toArray()
    return negotiations.map(negotiation => MongoHelper.map(negotiation))
  }
}

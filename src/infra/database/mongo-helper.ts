import { MongoClient, Collection } from 'mongodb'

export type MongoDatabaseConfig = {
  protocol: string
  host: string
  username: string
  password: string
  port: string
}

export const MongoHelper = {
  client: null as unknown as MongoClient,
  clientConfig: null as unknown as MongoDatabaseConfig,
  uri: null as unknown as string,

  async connect (params: MongoDatabaseConfig): Promise<boolean> {
    const { protocol, host, username, password, port } = params
    this.clientConfig = params
    this.uri = `${protocol}://${username}:${password}@${host}:${port}/?authMechanism=DEFAULT`

    try {
      this.client = await MongoClient.connect(this.uri)
      return true
    } catch (e) {
      return false
    }
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },
  async getConnection (): Promise<MongoClient> {
    if (!this.client) await this.connect(this.clientConfig)
    return this.client
  },
  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (data: any): any => {
    const { _id, ...rest } = data
    return { ...rest, id: _id.toHexString() }
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  }
}

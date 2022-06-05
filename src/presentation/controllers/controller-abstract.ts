import { HttpResponse, serverError } from '@/presentation/helpers'

export abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      console.log('Abstract Error: ', error)
      return serverError(error)
    }
  }
}

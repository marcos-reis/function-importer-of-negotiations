import * as multipart from 'parse-multipart-data'
import { Controller } from '@/presentation/controllers/controller-abstract'
import { HttpResponse, success } from '@/presentation/helpers'

import { ImportNegotiationUseCase, AddNegotiationUseCase, CheckValidNegotiationsUseCase } from '@/domain/usecases'
import { unlink, writeFile } from 'fs/promises'

type Request = {
  boundary: string
  data: string
}

export class ImportNegotiationsController extends Controller {
  constructor (
    private readonly importNegotiationService: ImportNegotiationUseCase,
    private readonly checkValidNegotiationsService: CheckValidNegotiationsUseCase,
    private readonly addNegotiationService: AddNegotiationUseCase
  ) { super() }

  override async perform (request: Request): Promise<HttpResponse> {
    const { boundary, data } = request
    const requestDecode = Buffer.from(data, 'base64')
    const parts = multipart.parse(requestDecode, boundary)
    if (parts[0].filename) {
      await writeFile('tmp/' + parts[0].filename, parts[0].data)
      const negotiationsToImport = this.importNegotiationService.perform({ filePath: 'tmp/' + parts[0].filename })
      await unlink('tmp/' + parts[0].filename)
      const negotiations = await this.checkValidNegotiationsService.perform(negotiationsToImport)
      negotiations.map(async (value): Promise<void> => {
        await this.addNegotiationService.perform(value)
      })
    }

    return success('')
  }
}

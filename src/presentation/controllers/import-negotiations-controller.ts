import { Controller } from '@/presentation/controllers/controller-abstract'
import { HttpResponse, success } from '@/presentation/helpers'

import { ImportNegotiationUseCase, AddNegotiationUseCase, CheckValidNegotiationsUseCase } from '@/domain/usecases'

type Request = { user: string, email: string }

export class ImportNegotiationsController extends Controller {
  constructor (
    private readonly importNegotiationService: ImportNegotiationUseCase,
    private readonly checkValidNegotiationsService: CheckValidNegotiationsUseCase,
    private readonly addNegotiationService: AddNegotiationUseCase
  ) { super() }

  override async perform (request: Request): Promise<HttpResponse> {
    const negotiationsToImport = this.importNegotiationService.perform({ filePath: 'tmp/negociacao-2022-05-02-23-16-10.xlsx' })
    const negotiations = await this.checkValidNegotiationsService.perform(negotiationsToImport)
    negotiations.map(async (value): Promise<void> => {
      await this.addNegotiationService.perform(value)
    })

    return success('')
  }
}

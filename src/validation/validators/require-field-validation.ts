import { Validation } from '@/presentation/interfaces'
import { MissingParamError } from '@/presentation/errors'

export class RequireFieldValidation implements Validation {
  constructor (
    private readonly FieldName: string
  ) {}

  validate (input: any): Error | undefined {
    if (!input[this.FieldName]) {
      return new MissingParamError(this.FieldName)
    }
  }
}

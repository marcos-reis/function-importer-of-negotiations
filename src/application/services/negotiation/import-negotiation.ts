import xlsx from 'xlsx'
import { AddNegotiationUseCase, ImportNegotiationUseCase } from './negotiation-protocols'

interface SheetImport{
  'Mercado Fracionário': string
  'Data do Negócio': string
  Quantidade: string
  Preço: string
  'Código de Negociação': string
  'Tipo de Movimentação': string
  'Instituição': string
  Valor: string
}

interface ItemSheetHash {
  hash: string
  numberRef: number
}

export class ImportNegotiationService implements ImportNegotiationUseCase {
  private readonly listRowSheetRef: ItemSheetHash[]

  constructor () {
    this.listRowSheetRef = []
  }

  perform (params: ImportNegotiationUseCase.Params): ImportNegotiationUseCase.Result {
    const { filePath } = params
    const file = xlsx.readFile(filePath)

    const sheets = file.SheetNames

    const negotiations: AddNegotiationUseCase.Params[] = []
    for (let i = 0; i < sheets.length; i++) {
      const sheetJsonTemp = xlsx.utils.sheet_to_json<SheetImport>(file.Sheets[file.SheetNames[i]])
      sheetJsonTemp.forEach((res) => {
        const hash = this.generateExternalHash(res)
        const uniqueHash = this.transformToUniqueHash(hash)

        const negotiation = this.negotiationMap(res, uniqueHash)
        negotiations.push(negotiation)
      })
    }
    return negotiations
  }

  transformToUniqueHash (hash: string): string {
    let findedIndex = this.listRowSheetRef.findIndex(itemRowSheetRef => itemRowSheetRef.hash === hash)
    if (findedIndex !== -1) {
      this.listRowSheetRef[findedIndex].numberRef += 1
    } else {
      const lastPosition = this.listRowSheetRef.length
      this.listRowSheetRef.push({
        hash,
        numberRef: 1
      })
      findedIndex = lastPosition
    }

    return `${hash}${this.listRowSheetRef[findedIndex].numberRef}`
  }

  getOnlyNumbers (value: string): number {
    const numberAsString = String(value).replace(/[^0-9]/g, '')
    return Number(numberAsString)
  }

  getOnlyLetters (value: string): string {
    return String(value).replace(/[^A-Za-z]/g, '')
  }

  getInfo (value: string): string {
    const valueUpperCase = this.getOnlyLetters(value).toUpperCase()
    const totalLetter = valueUpperCase.length
    const firstLetter = valueUpperCase[0]
    const lastLetter = valueUpperCase[totalLetter - 1]
    return `${firstLetter}${totalLetter}${lastLetter}`
  }

  generateExternalHash (item: SheetImport): string {
    const stringOperation = this.getInfo(item['Tipo de Movimentação'])
    const stringMarket = this.getInfo(item['Mercado Fracionário'])
    const stringBroker = this.getInfo(item['Instituição'])
    const stringCode = this.getInfo(item['Código de Negociação'])
    const stringDate = this.getOnlyNumbers(item['Data do Negócio'])
    const stringQuantity = this.getOnlyNumbers(item.Quantidade)
    const stringPrice = this.getOnlyNumbers(item['Preço'])
    const stringValue = this.getOnlyNumbers(item.Valor)

    const hash = `${stringOperation}${stringMarket}${stringBroker}${stringCode}${stringDate}${stringQuantity}${stringPrice}${stringValue}`

    return hash
  }

  negotiationMap = function (item: SheetImport, hash: string): AddNegotiationUseCase.Params {
    return {
      date: item['Data do Negócio'],
      quantity: Number(item.Quantidade),
      price: Number(item.Preço),
      code: item['Código de Negociação'],
      operation: item['Tipo de Movimentação'],
      broker: item['Instituição'],
      hash
    }
  }
}

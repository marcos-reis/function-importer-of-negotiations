import { Middleware } from './'

export class MiddlewarePipeline {
  private readonly middlewares
  private readonly data
  private finished = false
  constructor (middlewares: Middleware[], data: any) {
    this.finished = false
    this.middlewares = middlewares

    data.end = () => {
      this.finished = true
    }
    this.data = data
  }

  dispatch (): void {
    let iterator = 0
    if (iterator < this.middlewares.length) {
      const currentMiddleware = this.middlewares[iterator]
      const next = (): void => {
        iterator++
        if (!this.finished && iterator < this.middlewares.length) {
          const nextMiddleware = this.middlewares[iterator]
          nextMiddleware(this.data, next)
        } else {
          this.data.end()
        }
      }
      currentMiddleware(this.data, next)
    }
  }

  getData (): any {
    return this.data
  }
}

import { MiddlewarePipeline, Middleware } from './'

export class MiddlewareManager {
  private readonly middlewares: Middleware[]
  constructor () {
    this.middlewares = []
  }

  process (data: any = {}): void {
    const middlewarePipeline = new MiddlewarePipeline(this.middlewares, data)
    middlewarePipeline.dispatch()
  }

  use (middleware: Middleware): void {
    this.middlewares.push(middleware)
  }
}

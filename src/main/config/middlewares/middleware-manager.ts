import { MiddlewarePipeline, Middleware } from './'

export class MiddlewareManager {
  private readonly middlewares: Middleware[]
  private middlewarePipeline: MiddlewarePipeline

  constructor () {
    this.middlewares = []
    this.middlewarePipeline = null as unknown as MiddlewarePipeline
  }

  process (data: any = {}): void {
    this.middlewarePipeline = new MiddlewarePipeline(this.middlewares, data)
    this.middlewarePipeline.dispatch()
  }

  use (middleware: Middleware): void {
    this.middlewares.push(middleware)
  }

  getEventProcessed (): any {
    return this.middlewarePipeline.getData()
  }
}

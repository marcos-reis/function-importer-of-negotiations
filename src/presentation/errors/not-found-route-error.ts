export class NotFoundRouteError extends Error {
  constructor () {
    super('Informed route not found!!')
    this.name = 'NotFoundRouteError'
  }
}

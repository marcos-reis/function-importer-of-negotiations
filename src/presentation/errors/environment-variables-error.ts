export class EnvironmentVariablesError extends Error {
  constructor () {
    super('Loading error variable environment!!')
    this.name = 'EnvironmentVariablesError'
  }
}

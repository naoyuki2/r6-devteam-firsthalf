const root = '/api/requests'

export enum RequestEndpoints {
  getAll = `${root}`,
  getOneById = `${root}/:id`,
  createRequest = `${root}/create`,
}

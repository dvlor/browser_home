import { Application } from 'egg'

const getRoutes: any[] = []

export function Get(path: string, controller: string) {
  return (_target: any, propertyKey: string, _descriptor: PropertyDescriptor) => {
    getRoutes.push({
      path,
      controller,
      name: propertyKey
    })
    return _descriptor
  }
}

const postRoutes: any[] = []

export function Post(path: string, controller: string) {
  return (_target: any, propertyKey: string, _descriptor: PropertyDescriptor) => {
    postRoutes.push({
      path,
      controller,
      name: propertyKey
    })
    return _descriptor
  }
}

export default (app: Application) => {
  const { controller, router } = app

  getRoutes.forEach((r: any) => {
    router.get(r.path, controller[r.controller][r.name])
  })

  postRoutes.forEach((r: any) => {
    router.post(r.path, controller[r.controller][r.name])
  })
}

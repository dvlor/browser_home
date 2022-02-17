import { Controller } from 'egg'
import { Post } from '../router'

export default class ApiController extends Controller {
  @Post('/api/query', 'api')
  public async query() {
    const { ctx } = this
    const type = ctx.request.body.type
    ctx.body = ctx.service.menuService.query(type)
    ctx.status = 200
  }

  @Post('/api/add', 'api')
  public async add() {
    const { ctx } = this
    const { type, name, link } = ctx.request.body
    ctx.service.menuService.add({
      type,
      name,
      link,
      id: '',
      times: 0
    })
    ctx.status = 200
  }

  @Post('/api/remove', 'api')
  public async remove() {
    const { ctx } = this
    const { id } = ctx.request.body
    ctx.service.menuService.remove(id)
    ctx.status = 200
  }

  @Post('/api/update', 'api')
  public async update() {
    const { ctx } = this
    const { id, type, name, link } = ctx.request.body
    ctx.service.menuService.update({
      id,
      type,
      name,
      link,
      times: 0
    })
    ctx.status = 200
  }

  @Post('/api/getTags', 'api')
  public async getTags() {
    const { ctx } = this
    ctx.body = ctx.service.menuService.getTags()
    ctx.status = 200
  }

  @Post('/api/link', 'api')
  public async link() {
    const { ctx } = this
    ctx.body = ctx.service.menuService.link(ctx.request.body.id)
    ctx.status = 200
  }
}

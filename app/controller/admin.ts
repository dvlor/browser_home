import { Controller } from 'egg'
import { Get } from '../router'

export default class AdminController extends Controller {
  @Get('/admin', 'admin')
  public async index() {
    const { ctx } = this
    await ctx.render('admin.html')
  }
}

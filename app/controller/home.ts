import { Controller } from 'egg'
import { Get } from '../router'

export default class HomeController extends Controller {
  @Get('/', 'home')
  public async index() {
    const { ctx } = this
    await ctx.render('index.html')
  }
}

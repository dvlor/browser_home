import { Service } from 'egg'

import * as fs from 'fs'
import * as path from 'path'

export interface IMenuInfo {
  id: string
  name: string
  link: string
  type: Array<string>
  times: number
}

export interface IMenuBody {
  id: string
  name: string
  link: string
  type: string
  times: number
}

/**
 * Test Service
 */
export default class MenuService extends Service {
  private menus: IMenuInfo[] = []

  constructor(ctx: any) {
    super(ctx)
    this.init()
  }

  update(info: IMenuBody) {
    const menu = this.menus.find((s: IMenuInfo) => s.id === info.id)
    if (menu) {
      menu.name = info.name
      menu.link = info.link
      menu.type = info.type.split(' ')
      this.writeFile()
    }
  }

  remove(id: string): void {
    const menu = this.menus.find((s: IMenuInfo) => s.id === id)
    if (menu) {
      this.menus.splice(this.menus.indexOf(menu), 1)
      this.writeFile()
    }
  }

  add(info: IMenuBody): void {
    this.menus.push({
      id: 'MO' + Date.now() + (Math.random() * 1000).toFixed(0),
      name: info.name,
      link: info.link,
      type: info.type.split(' '),
      times: 0
    })
    this.writeFile()
  }

  query(type: string): IMenuInfo[] {
    if (!type) {
      return this.menus
    }
    return this.menus.filter((s: IMenuInfo) => s.type.indexOf(type) > -1)
  }

  getTags(): string[] {
    const result = new Set<string>()
    this.menus.forEach((d: IMenuInfo) => {
      d.type.forEach((s: string) => result.add(s))
    })
    return Array.from(result)
  }

  link(id: string) {
    const menu = this.menus.find((s: IMenuInfo) => s.id === id)
    if (menu) {
      menu.times++
      this.writeFile()
    }
  }

  private init() {
    this.menus = this.readFile()
  }

  private readFile(): IMenuInfo[] {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/menu.json'), { encoding: 'utf-8' }).toString())
  }

  private writeFile() {
    fs.writeFileSync(path.join(__dirname, '../data/menu.json'), JSON.stringify(this.menus), { encoding: 'utf-8' })
  }
}

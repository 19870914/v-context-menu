import { useContextMenuService } from '@/packages/contextmenu/contextmenu.service'

const { 
  registerContextMenu: reg, 
  unregisterContextMenu: unreg,
  clearContextMenu: clear
} = useContextMenuService()

export function registerContextMenu(el, menus, callback, options) {
  reg(el, menus, callback, options) 
}

export function unregisterContextMenu(el) {
  unreg(el)
}

export function clearContextMenu() {
  clear()
}
import { registerContextMenu, unregisterContextMenu } from '@/utils/contextmenu-helper'

export const vContextMenu = {
  mounted(el, binding, vnode, prevVnode) {
    const { menus = [], callback, options } = binding.value
    registerContextMenu(el, menus, callback, options)
  },
  unmounted(el, binding, vnode, prevVnode) {
    unregisterContextMenu(el)
  }
}
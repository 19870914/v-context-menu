import { createVNode, createApp, render } from 'vue'
import Menu from '@/packages/contextmenu/index.vue'

const menu_config = {
  visible: false,
  container: null,
  vnode: null
}
const menu_events = {
  click: null,
  contextMenu: null
}

function handleContextMenu(menus, callback, options) {
  return function(e) {
    e.preventDefault()
    e.stopPropagation()
    if (menu_config.visible) {   
      clearContextMenu()
    }    
    options = options || {}
    const { clientX, clientY } = e
    const container = document.createElement('div')
    const { contextmenuClass, transition } = options
    const vnode = createApp({
      render() {
        return createVNode(Menu, {
          x: clientX,
          y: clientY,
          menus,
          transition,
          contextmenuClass,
          onItemClick(item) {
            callback && callback(item)
          },
          onClose() {
            clearContextMenu()
          }
        })
      }
    })
    vnode.mount(container)
    menu_config.vnode = vnode
    menu_config.container = container  
    menu_config.visible = true
    
    const clickEvent = handleBlankClick()
    menu_events['click'] = clickEvent
    document.addEventListener('click', menu_events['click']) 
  }
}

function handleBlankClick() {
  return function() {
    if (!menu_config.visible) return
    clearContextMenu()
  }
}

export function registerContextMenu(el, menus, callback, options) {
  const contextMenuEvent = handleContextMenu(menus, callback, options)
  menu_events['contextMenu'] = contextMenuEvent
  el.addEventListener('contextmenu', menu_events['contextMenu'], false)    
}
export function unregisterContextMenu(el) {
  el.removeEventListener('contextmenu', menu_events['contextMenu'], false)
  document.removeEventListener('click', menu_events['click']) 
}
export function clearContextMenu() {
  if (!menu_config.visible) return
  render(null, menu_config.container)
  menu_config.vnode = null
  menu_config.container = null
  menu_config.visible = false
  document.removeEventListener('click', menu_events['click'])
}
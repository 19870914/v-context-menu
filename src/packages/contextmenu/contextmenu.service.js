import { ref, createApp, createVNode, render } from 'vue'
import Menu from './index.vue'

const visible = ref(false)
const container = ref(null)
const vnode = ref(null)
const events = ref({
  context: null,
  click: null
})

function clearContextMenu() {
  if (!visible.value) return
  render(null, container.value)
  container.value = null
  vnode.value = null
  visible.value = false
  document.removeEventListener('click', events.value['click'])
}

function handleContextMenu(menus, callback, options) {
  return function(e) {
    e.preventDefault()
    e.stopPropagation()
    if (visible.value) {   
      clearContextMenu()
    }    
    options = options || {}
    const { clientX, clientY } = e
    const _container = document.createElement('div')
    const { contextmenuClass, transition } = options
    const _vnode = createApp({
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
    _vnode.mount(_container)
    vnode.value = _vnode
    container.value = _container  
    visible.value = true
    
    const clickEvent = handleBlankClick()
    events.value['click'] = clickEvent
    document.addEventListener('click', events.value['click']) 
  }
}

function handleBlankClick() {
  return function() {
    if (!visible.value) return
    clearContextMenu()
  }
}

function registerContextMenu(el, menus, callback, options) {
  const contextMenuEvent = handleContextMenu(menus, callback, options)
  events.value['contextMenu'] = contextMenuEvent
  el.addEventListener('contextmenu', events.value['contextMenu'], false)   
}

function unregisterContextMenu(el) {
  el.removeEventListener('contextmenu', events.value['contextMenu'], false)
  document.removeEventListener('click', events.value['click']) 
}

export function useContextMenuService() {
  return {
    visible,
    container,
    vnode,
    events,
    clearContextMenu,
    registerContextMenu,
    unregisterContextMenu
  }
}
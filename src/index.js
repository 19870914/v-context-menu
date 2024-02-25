import ContextMenu from '@/packages/contextmenu/index.vue'
import { vContextMenu } from '@/directives'

export {
  ContextMenu,
  vContextMenu
}
export * from '@/utils/contextmenu-helper'

export default {
  name: 'VContextMenu',
  install(app) {
    app.component(`ContextMenu`, ContextMenu)
    app.directive('contextMenu', vContextMenu)
  }
}
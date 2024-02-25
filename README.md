# v-context-menu

## Installation
```bash
npm i @yyyymmddhhmmss/v-context-menu
```

## Usage
```js
import VContextMenu from '@yyyymmddhhmmss/v-context-menu'
import '@yyyymmddhhmmss/v-context-menu/dist/style.css'

const app = createApp(App)
app.use(VContextMenu)

app.mount('#app')
```

```js
<template>
  <div class="demo-container" v-context-menu="{ menus, callback }">
    <div class="demo-view" style="background: #f66;" v-context-menu="{ menus: menus2, callback, options }"></div>
    <div class="demo-view" style="background: #6f6;" ref="divRef"></div>
    <div class="demo-view" style="background: #66f;" @contextmenu="onDivContextMenu"></div>
  </div>
  <ContextMenu v-if="contenxtmenuVisible"
    contextmenu-class="custom-contextmenu"
    :x="contenxtmenuX" 
    :y="contenxtmenuY" 
    :menus="menus4"
    @itemClick="onContextMenuItemClick"
  ></ContextMenu>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  registerContextMenu, 
  unregisterContextMenu, 
  clearContextMenu,
  //ContextMenu
} from '@yyyymmddhhmmss/v-context-menu'

const divRef = ref(null)
const contenxtmenuVisible = ref(false)
const contenxtmenuX = ref(0)
const contenxtmenuY = ref(0)

const menus = [
  [
    { name: '打开', code: 'open', icon: '' },
    { name: '刷新', code: 'refresh' },
  ],
  [
    { 
      name: '新建', 
      code: 'new', 
      children: [
        [
          ...new Array(10).fill(null).map((item,index) => ({
            name: `文件夹${index}`, 
            code: `folder${index}` 
          })),
          { 
            name: '菜单', 
            code: 'menu', 
            children: [
              [
                ...new Array(10).fill(null).map((item,index) => ({
                  name: `菜单${index}`, 
                  code: `menu${index}` 
                }))
              ]
            ]
          },
        ]
      ]
    }
  ]
]

const menus2 = [
  [
    { name: '打开2', code: 'open2' },
  ]
]
const menus3 = [
  [
    { name: '打开3', code: 'open3' },
  ]
]
const menus4 = [
  [
    { name: '打开4', code: 'open4' },
  ]
]

const options = {
  contextmenuClass: 'custom-contextmenu',
  transition: 'v-context-menu2'
}

function callback(item) {
  console.log(item)
}

function onDivContextMenu(e) {
  clearContextMenu()      //
  closeContextMenu()
  e.preventDefault()
  e.stopPropagation()
  contenxtmenuX.value = e.clientX
  contenxtmenuY.value = e.clientY
  contenxtmenuVisible.value = true
}
function onContextMenuItemClick(item) {
  console.log(item)
  closeContextMenu()  
}

function closeContextMenu() {
  contenxtmenuVisible.value = false
}

onMounted(() => {
  registerContextMenu(divRef.value, menus3, callback)
  
  //如果用组件的使用方式，需要处理额外的事件
  document.addEventListener('click', closeContextMenu)
  document.addEventListener('contextmenu', closeContextMenu, true)
})
onUnmounted(() => {
  if (divRef.value) {
    unregisterContextMenu(divRef.value)
  }
  
  document.removeEventListener('click', closeContextMenu)
  document.removeEventListener('contextmenu', closeContextMenu, true)
})
</script>

<style lang="scss">
.demo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  padding: 50px;
  margin: 50px auto;
  width: 500px;
  background: #eee;
}
.demo-view {
  width: 100px;
  height: 100px;
}

.custom-contextmenu {
  --v-context-menu-color: #f00;
  --v-context-menu-background: rgba(255, 255, 0, 0.7);
  --v-context-menu-border-color: #ffc;
  --v-context-menu-highlight: #8fb;
  --v-context-menu-splitcolor: #fb3;
  --v-context-menu-shadow-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  .v-context-menu-item:hover {
    color: #0f0;
  }
}

.v-context-menu2-enter-active,
.v-context-menu2-leave-active {
  transition: opacity .6s ease-out, transform .6s;
}
.v-context-menu2-enter-from,
.v-context-menu2-leave-to {
  transform: scale(1.6) rotate(12deg) translateX(50px);
  opacity: 0;
}
</style>
```
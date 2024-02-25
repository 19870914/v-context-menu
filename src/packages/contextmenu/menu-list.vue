<template>
  <div :class="ns.b('inner')">
    <div :class="ns.b('list')" v-for="(list, index) in menus" :key="index" v-bind="$attrs"      
    >
      <div v-for="(item, itemIndex) in list" :key="item.code" 
        :class="itemClassName(item, index, itemIndex)"
        @click="onItemClick(item)"
        @mouseover="onMouseOver($event, index, item, itemIndex)"
      >
        <div :class="ns.b('icon')">
          <img v-if="item.icon" :src="item.icon"/>
        </div>
        <div :class="ns.b('content')">
          <span>{{item.name}}</span>
        </div>
        <div :class="ns.b('arrow')" v-if="item.children && item.children.length">
          <Arrow :class="ns.b('arrow-icon')"></Arrow>
        </div>
        <template v-if="item.children && item.children.length && hoverIndex === `${index}_${itemIndex}`">
          <Menu :contextmenu-class="contextmenuClass"
            :menus="item.children" 
            is-sub 
            :sub-rect="subRect"
            @close="onClose" 
            @itemClick="onItemClick"
          ></Menu>
        </template>
      </div>       
    </div> 
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import Arrow from './arrow.vue'
import MenuList from './menu-list.vue'
import { m_offset } from './properties'
import { getOffset, findTarget } from '@/utils'
import { useViewport } from '@/utils/use-viewport'
import { useNamespace } from '@/utils/use-namespace'
import Menu from './index.vue'

const props = defineProps({
  menus: {
    type: Array,
    default: () => []
  },
  rect: {
    type: Object,
    default: () => ({})
  },
  contextmenuClass: {
    type: String,
    default: ''
  },
})

const emit = defineEmits(['itemClick', 'close'])
const { vw, vh } = useViewport()
const ns = useNamespace('v-context-menu')
const hoverIndex = ref('')
const subRect = ref({
  left: 0,
  top: 0,
  width: 0,
  height: 0
})

function onItemClick(item) {
  if (item.children && item.children.length) return
  emit('itemClick', item)
  emit('close')
}

function onClose() {
  emit('close')
}

function itemClassName(item, index, itemIndex) {
  return {
    [ns.b('item')]: true,
    ['has--submenu ']: item.children && item.children.length,
    ['is--hover']: hoverIndex.value === `${index}_${itemIndex}`
  }
}

function onMouseOver(e, index, item, itemIndex) {
  const indexKey = `${index}_${itemIndex}`
  hoverIndex.value = indexKey
  const target = findTarget(e.target, e.currentTarget)
  if (!target) return 
  const { offsetLeft, offsetTop } = target
  const offset = getOffset(target, offsetLeft, offsetTop)

  subRect.value.left = props.rect.left
  subRect.value.top = offset.top  
  subRect.value.width = target.clientWidth
  subRect.value.height = target.clientHeight
}
</script>

<style>
</style>
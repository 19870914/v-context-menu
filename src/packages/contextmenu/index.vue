<template>
  <Teleport to="body">
    <Transition :name="transition">
      <div :class="className" :style="menuStyle" v-show="visible" 
        @click.stop
        @contextmenu.prevent
        ref="menuRef"
      >
        <MenuList 
          :contextmenu-class="contextmenuClass"
          :menus="menus" 
          :rect="computedRect" 
          @close="onClose"
          @itemClick="onItemClick"
        ></MenuList>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import MenuList from './menu-list.vue'
import { m_offset } from './properties'
import { useViewport } from '@/utils/use-viewport'
import { useNamespace } from '@/utils/use-namespace'

const { vw, vh } = useViewport()
const ns = useNamespace('v-context-menu')

const props = defineProps({
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  },
  contextmenuClass: {
    type: String,
    default: ''
  },
  menus: {
    type: Array,
    default: () => []
  },
  isSub: {
    type: Boolean,
    default: false
  },
  subRect: {
    type: Object,
    default: () => ({})
  },
  transition: {
    type: String,
    default: 'v-context-menu'
  }
})
const emit = defineEmits(['itemClick', 'close'])

const className = computed(() => {
  return {
    [ns.b()]: true,
    [props.contextmenuClass]: true,
    [ns.b('sub')]: props.isSub,
  }
})

const menuStyle = computed(() => {  
  const { left, top } = computedRect.value  
  return {
    left: `${left}px`,
    top: `${top}px`
  }
})

const computedRect = computed(() => {
  const { x, y, isSub, subRect } = props
  let left = 0
  let top = 0
  if (isSub) {
    let _left = subRect.left + subRect.width + cw.value - m_offset
    left = _left > vw.value ? subRect.left - cw.value + m_offset : subRect.left + subRect.width + m_offset
    top = subRect.top + ch.value + m_offset > vh.value ? subRect.top - ch.value + subRect.height + m_offset : subRect.top - m_offset 
  } else {
    left = x + cw.value + m_offset > vw.value ? vw.value - cw.value - m_offset : x + m_offset
    top = y + ch.value + m_offset > vh.value ? vh.value - ch.value - m_offset : y + m_offset
  }  
  return {
    left,
    top,
    width: cw.value,
    height: ch.value,
  }
})

const visible = ref(false)
const menuRef = ref(null)
const cw = ref(0)
const ch = ref(0)

function onClose() {
  emit('close')
}

function onItemClick(item) {
  emit('itemClick', item)
  emit('close')
}

onMounted(() => {  
  visible.value = true  
  nextTick(() => {
    cw.value = menuRef.value.clientWidth
    ch.value = menuRef.value.clientHeight
  })    
})
</script>

<style lang="scss">
@use './style.scss'
</style>
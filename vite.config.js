import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { terser } from 'rollup-plugin-terser'
//import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const BANNER = `
/*!
 * 
 * Author: jhc
 * 
 */
`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VContextMenu',
      formats: ['es'],
      fileName: (format) => `v-context-menu.js`,
    },
    rollupOptions: {        
      external: ['vue'],        
      output: {
      	//inlineDynamicImports: true,
        globals: {
          vue: 'Vue',
        },
        banner: BANNER,
      },      
      plugins: [
        // terser({
        //   compress: {
        //     drop_console: true,
        //   },
        // })
      ], 
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    react(),
    dts({
      exclude: ['examples']
    }),
    cssInjectedByJsPlugin({ topExecutionPriority: false })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    //打包后的目录名称
    outDir: 'lib',
    minify: 'terser',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'kaitify-react',
      fileName: format => `kaitify-react.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        exports: 'named'
      }
    },
    sourcemap: false //是否构建source map 文件
  },
  css: {
    preprocessorOptions: {
      less: {
        // 使用 less 编写样式的 UI 库（如 antd）时建议加入这个设置
        javascriptEnabled: true,
        // 全局引入的 Less 文件路径
        additionalData: `
          @import "${path.resolve(__dirname, 'src/var.less')}";
        `
      }
    }
  },
  server: {
    host: '0.0.0.0'
  }
})

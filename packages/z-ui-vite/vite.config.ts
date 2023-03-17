/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Unocss from "./config/unocss";
import { UserConfig } from "vitest";
// https://vitejs.dev/config/
const rollupOptions = {
    external: ["vue", "vue-router"],
    output: {
        globals: {
            vue: "Vue",
        },
        assetFileNames: `style.css`,
    },
};

export const config = {
    plugins: [
        vue(),
        vueJsx({}),
        // 添加UnoCSS插件
        Unocss(),
    ],
    // 添加库模式配置
    build: {
        rollupOptions,
        minify: "terser", // boolean | 'terser' | 'esbuild'
        sourcemap: true, // 输出单独 source文件
        reportCompressedSize: true, // 生成压缩大小报告
        cssCodeSplit: true,
        lib: {
            entry: "./src/entry.ts",
            name: "ZUI",
            fileName: "z-ui",
            // 导出模块格式
            formats: ["esm", "umd", "iife"],
        },
        outDir: "./dist",
    },
    test: {
        // enable jest-like global test APIs
        globals: true,
        // simulate DOM with happy-dom
        // (requires installing happy-dom as a peer dependency)
        environment: "happy-dom",
        // 支持tsx组件，很关键
        transformMode: {
            web: [/.[tj]sx$/],
        },
    },
}
export default defineConfig(config as UserConfig);

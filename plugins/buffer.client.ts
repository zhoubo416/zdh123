import { Buffer } from 'buffer';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
  if (process.client) {
    // 在客户端环境中提供 Buffer polyfill
    (globalThis as any).global = globalThis;
    (globalThis as any).Buffer = Buffer;
  }
});
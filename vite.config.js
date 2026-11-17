import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
    server: {
        port: 5050,
        host: true
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(import.meta.dirname, 'index.html'),
                sim: resolve(import.meta.dirname, 'sim.html'),
            },
        },
    },
});
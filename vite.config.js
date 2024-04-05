import { resolve } from 'path';
import { defineConfig } from "vite";

export default defineConfig(() => {
    return {
        build: {
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.html'),
                    about: resolve(__dirname, 'about.html'),
                    drinks: resolve(__dirname, 'drinks.html'),
                    favorites: resolve(__dirname, 'favorites.html'),
                    meals: resolve(__dirname, 'meals.html'),
                }
            },
            outDir: './dist'
        },
    };
});
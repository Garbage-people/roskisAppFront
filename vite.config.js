import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    // base: "/roskisAppFront/", THIS LINE BREAKS THE NPM BUILD PROCESS
    plugins: [react()],
});

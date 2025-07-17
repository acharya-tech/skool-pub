import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^src(.+)/,
        replacement: path.resolve(process.cwd(), "src/$1"),
      },

      {
        find: /^@home(.+)/,
        replacement: path.resolve(process.cwd(), "src/@home/$1"),
      },
      {
        find: /^@common(.+)/,
        replacement: path.resolve(process.cwd(), "src/@common/$1"),
      },
      {
        find: /^@components(.+)/,
        replacement: path.resolve(process.cwd(), "src/@components/$1"),
      },
      {
        find: /^@hooks(.+)/,
        replacement: path.resolve(process.cwd(), "src/@hooks/$1"),
      },
      {
        find: /^@utils(.+)/,
        replacement: path.resolve(process.cwd(), "src/@utils/$1"),
      },
      {
        find: /^@app(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@app/$1"),
      },
      {
        find: /^@academic(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@academic/$1"),
      },
      {
        find: /^@account(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@account/$1"),
      },
      {
        find: /^@billing(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@billing/$1"),
      },
      {
        find: /^@dashboard(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@dashboard/$1"),
      },
      {
        find: /^@datavalue(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@datavalue/$1"),
      },
      {
        find: /^@employee(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@employee/$1"),
      },
      {
        find: /^@exam(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@exam/$1"),
      },
      {
        find: /^@inventory(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@inventory/$1"),
      },
      {
        find: /^@library(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@library/$1"),
      },
      {
        find: /^@notice(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@notice/$1"),
      },
      {
        find: /^@repo(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@repo/$1"),
      },
      {
        find: /^@student(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@student/$1"),
      },
      {
        find: /^@vehicle(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@vehicle/$1"),
      },
      {
        find: /^@auth(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@auth/$1"),
      },
      {
        find: /^@error(.+)/,
        replacement: path.resolve(process.cwd(), "src/modules/@error/$1"),
      },
    ],
  },
});

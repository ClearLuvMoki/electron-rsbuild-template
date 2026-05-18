import { spawn } from "node:child_process";
import { join } from "node:path";
import { defineConfig, mergeRsbuildConfig } from "@rsbuild/core";
import { pluginVue } from '@rsbuild/plugin-vue';
import { logger } from "rslog";
import { releaseRenderPath, srcRenderPath } from "./paths";
import CommonConfig from "./rsbuild.common";

const Config = defineConfig({
  plugins: [
    pluginVue(),
  ],
  source: {
    entry: {
      index: join(srcRenderPath, "./index.ts"),
    },
  },
  server: {
    port: Number(process.env._PORT),
  },
  dev: {
    setupMiddlewares: [
      (middlewares) => {
        spawn("npm", ["run", "dev:main"], {
          shell: true,
          stdio: "inherit",
        }).on("error", (spawnError: Error) => {
          logger.error(`Main Server err:${spawnError}`);
        });
        return middlewares;
      },
    ],
  },
  output: {
    assetPrefix: ".",
    cleanDistPath: process.env.NODE_ENV === "production",
    distPath: {
      root: join(releaseRenderPath),
    },
  },
  html: {
    title: "Electron Rsbuild template"
  }
});

module.exports = mergeRsbuildConfig(CommonConfig, Config);

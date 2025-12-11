/// <reference types="@rsbuild/core/types" />
import type { IpcRendererEvent } from "electron";

declare global {
  interface Window {
    electron: {
      send: (channel: string, ...arg: any[]) => void;
      version: {
        electron: string;
        chrome: string;
        node: string;
      }
    };
  }
}

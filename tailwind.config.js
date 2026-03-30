import { createPreset } from "fumadocs-ui/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [
    createPreset({
      cssPrefix: "fuma-", // here!
    }),
  ],
  // other options
};
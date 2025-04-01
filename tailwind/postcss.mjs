import configMerger from "@nuxtjs/tailwindcss/merger";

import cfg2 from "./../../tailwind.config.js";
const config = [
{"content":{"files":["C:/seplagPessoasDesaparecidas/components/**/*.{vue,js,jsx,mjs,ts,tsx}","C:/seplagPessoasDesaparecidas/pages/**/*.{vue,js,jsx,mjs,ts,tsx}"]}},
{},
cfg2
].reduce((acc, curr) => configMerger(acc, curr), {});

const resolvedConfig = config;

export default resolvedConfig;
import pluginJs from "@eslint/js";
import globals from "globals";

export default [
   {
      files: ["*.js"], // ou a extensão que você estiver usando
      languageOptions: {
         globals,
         parserOptions: {
            ecmaVersion: 2020,
         },
      },
      rules: {
         indent: ["error", 2],
         "linebreak-style": ["error", "unix"],
         quotes: ["error", "double"],
         semi: ["error", "always"],
      },
   },
   pluginJs.configs.recommended,
];

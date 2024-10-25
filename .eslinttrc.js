import pluginJs from "@eslint/js";
import globals from "globals";

export default [
   {
      env: {
         node: true,
         browser: true,
         es2020: true,
      },
      languageOptions: {
         globals: globals,
         parserOptions: {
            ecmaVersion: 2020, // Make sure the ECMAScript version is set
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

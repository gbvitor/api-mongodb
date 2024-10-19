import globals from "globals";
import pluginJs from "@eslint/js";

export default [
    {
        env: { node: true },
        languageOptions: { globals: globals.browser },
        rules: {},
    },
    pluginJs.configs.recommended,
];
import pluginJs from "@eslint/js";
import globals from "globals";

export default [
    {
        env: { node: true },
        languageOptions: { globals: globals.browser },
        rules: {
            indent: ["error", 2],
            "linebreak-style": ["error", "unix"],
            quotes: ["error", "double"],
            semi: ["error", "always"],
        },
    },
    pluginJs.configs.recommended,
];

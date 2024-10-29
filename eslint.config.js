import pluginJs from "@eslint/js";
import globals from "globals";

export default [
    {
        languageOptions: { globals: globals.node, envs: ["node"] },
        rules: {
            "no-console": ["error", { allow: ["warn", "error"] }],
            "line-break-style": ["error", "windows"],
            ident: ["error", 2],
            quotes: ["error", "double"],
            semi: ["error", "always"],
        },
    },

    pluginJs.configs.recommended,
];

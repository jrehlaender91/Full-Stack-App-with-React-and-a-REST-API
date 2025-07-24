import globals from "globals";
import pluginReact from "eslint-plugin-react";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Configuración base de ESLint
  js.configs.recommended,

  // Configuración específica para React
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // No necesario con React 17+
      "react/prop-types": "off", // Desactívalo si no usas PropTypes
    },
    settings: {
      react: {
        version: "detect", // Detecta automáticamente la versión de React
      },
    },
  },

  // Configuración recomendada de eslint-plugin-react
  pluginReact.configs.flat.recommended,
]);

// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/compat"; // <-- 注意这里是 @eslint/compat，不是 @eslint/eslintrc

// 新增的导入
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react"; // 用于 React 特定规则

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  // 如果遇到 ESLint 报告规则未定义的问题，可以尝试添加推荐的基础配置
  // recommendedConfig: require('@eslint/js').configs.recommended,
});

const eslintConfig = [
  // 现有配置：Next.js 配置
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 新增配置：TypeScript ESLint 推荐规则
  // 这对应了 .eslintrc.json 中的 "plugin:@typescript-eslint/recommended"
  ...tseslint.configs.recommended,

  // 新增配置：React 规则
  // 针对 React 19 和 Next.js 的 JSX 自动运行时
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/jsx-uses-react": "off", // Next.js 13+ 和 React 17+ 不需要手动导入 React
      "react/react-in-jsx-scope": "off", // 同上
    },
    settings: {
      react: {
        version: "detect", // 自动检测 React 版本
      },
    },
  },

  // 新增配置：Prettier 集成（必须放在最后，以禁用与 Prettier 冲突的 ESLint 规则）
  // 这对应了 .eslintrc.json 中的 "plugin:prettier/recommended" 和你的 .prettierrc 内容
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier 格式化规则
      "prettier/prettier": [
        "error",
        {
          semi: false, // 对应 .prettierrc 的 "semi": false
          singleQuote: true, // 对应 .prettierrc 的 "singleQuote": true
          tabWidth: 2, // 对应 .prettierrc 的 "tabWidth": 2
          printWidth: 100, // 对应 .prettierrc 的 "printWidth": 100
        },
      ],
      // 禁用与 Prettier 冲突的 ESLint 规则
      ...prettierConfig.rules,
    },
  },

  // 新增配置：TypeScript 解析器选项
  // 确保 ESLint 能够进行类型感知的 linting (对于 Zod 和 React Hook Form 很有用)
  {
    files: ["**/*.{ts,tsx}"], // 仅应用于 TypeScript 文件
    languageOptions: {
      parser: tseslint.parser, // 使用 TypeScript 解析器
      parserOptions: {
        project: "./tsconfig.json", // 指向你的 tsconfig.json 文件
        tsconfigRootDir: __dirname, // 确保正确的 tsconfig 根目录上下文
      },
    },
  },

  // 可选：如果你需要全局的 ESLint 推荐规则 (例如，用于处理非 TypeScript 文件)
  // import pluginJs from "@eslint/js"; // 需要在文件顶部添加此导入
  // pluginJs.configs.recommended,
];

export default eslintConfig;
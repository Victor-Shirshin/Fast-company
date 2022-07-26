module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    // indent: ["error", 4], // Отступ количество пробелов
    semi: [2, "always"], // Точка с запятой в конце строки

    // Правила для пробелов у 'именнованной' и 'неименнованной' функции
    // "space-before-function-paren": ["error", "never"], // переписано
    "space-before-function-paren": ["error", { anonymous: "always", named: "never" }],

    // Использование двойных кавычек
    quotes: ["error", "double", { allowTemplateLiterals: true }]
  }
};

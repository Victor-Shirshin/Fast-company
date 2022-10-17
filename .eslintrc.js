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
    // error:  Expected indentation of 6 spaces but found 8   indent
    "indent": [0, 2], // старое решение ошибки было "indent": [0],
    // indent: ["error", 2], // это правило ошибку не устраняло

    semi: [2, "always"], // Точка с запятой в конце строки

    // Правила для пробелов у 'именнованной' и 'неименнованной' функции
    // "space-before-function-paren": ["error", "never"], // переписано
    "space-before-function-paren": ["error", { anonymous: "always", named: "never" }],

    // Использование двойных кавычек. (avoidEscape: true) чтобы не ругался на двойные кавычки в comment.service.jsx.
    quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],

    // error: Newline required at end of file but not found. (eol-last) 
    "eol-last": 0, // решение ошибки

    // Expected newline between test and consequent of ternary expression
    "multiline-ternary": ["off"]

    // Unexpected 'debugger' statement  no-debugger
    // "no-debugger": "off" не работает правило
    // debugger; // eslint-disable-line no-debugger рабочее решение писать в react
  }
};

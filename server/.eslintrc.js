module.exports = {
    "env": {
      "browser": true,
      "commonjs": true,
      "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
      {
        "env": {
          "node": true
        },
        "files": [
          ".eslintrc.{js,cjs}"
        ],
        "parserOptions": {
          "sourceType": "script"
        }
      }
    ],
    "parserOptions": {
      "ecmaVersion": "latest"
    },
    "rules": {
     // "no-console": "warn",      // Example: Enforce single quotes
    //  "no-magic-numbers": ["error", { "ignore": [-1, 0, 1] }],  // Example: Disallow magic numbers (except -1, 0, 1)
     // "no-unused-expressions": "error",
     // 'camelcase': ['error', { 'properties': 'always' }]  // Example: Report unused expressions
      // Add more custom rules as needed
    }
  };
  
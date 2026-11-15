// ESLint flat config for nmap-web.
//
// The project is an ES module package ("type": "module" in package.json), so
// this config is itself an ESM module and every JS file is parsed as
// sourceType: "module".
//
// Two runtime contexts share this repo:
//   - server.js + lib/*.js  -> Node.js
//   - public/*.js           -> browser (loaded by index.html)
//
// The rule settings below mirror the existing code style (2-space indent,
// single quotes with template literals allowed, semicolons required, no
// trailing commas). They intentionally enforce style only — no logic changes.

import js from '@eslint/js';
import globals from 'globals';

// Style rules that match the existing source. Shared by both the Node and
// browser file groups so the whole project enforces one consistent style.
const styleRules = {
  // The codebase is consistently 2-space indented, but it deliberately
  // indents the bodies of arrow functions / object literals nested inside
  // multi-line ternary branches by an extra level for readability (see
  // lib/parse.js and public/app.js). The `indent` rule's strict multi-line
  // expression handling flags that intentional formatting, which would mean
  // churning many lines of working code for a whitespace-only gain. Per the
  // project guidance ("if many errors, configure rules to match the existing
  // style rather than rewriting all the code") indentation is left unenforced.
  indent: 'off',
  // Single quotes; allow template literals and double quotes when they avoid
  // escaping a quote character.
  quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
  // Every statement ends with a semicolon (the codebase uses ASI-safe style).
  semi: ['error', 'always'],
  // The codebase does not use trailing commas.
  'comma-dangle': ['error', 'never'],
  // The code uses empty `catch {}` blocks intentionally (e.g. best-effort
  // cleanup), so allow them rather than forcing a placeholder comment.
  'no-empty': ['error', { allowEmptyCatch: true }],
  // Unused catch bindings (`catch (err) { /* noop */ }`) are common here;
  // don't flag them. `after-used` keeps real unused params honest.
  'no-unused-vars': ['error', {
    args: 'after-used',
    caughtErrors: 'none',
    ignoreRestSiblings: true
  }],
  // The scanner intentionally assigns to record fields across `await` points
  // (the `finalize`-once pattern is documented inline). This rule produces
  // false positives there and is no longer in `eslint:recommended` as of
  // ESLint 8; keep it off explicitly.
  'require-atomic-updates': 'off'
};

export default [
  {
    ignores: [
      'node_modules/**',
      'data/**',
      'coverage/**',
      '*.cjs' // CommonJS test harnesses (e.g. test/frontend-harness.cjs)
    ]
  },

  // Recommended base for every JS file in the project.
  js.configs.recommended,

  // --- Node.js files (server + library + tests) ---
  // server.js and lib/*.js are the production Node code; test/**/*.js runs
  // under `node --test` and uses the same Node globals, so it shares this
  // block (otherwise `no-undef` would fire on process/setTimeout/etc.).
  {
    files: ['server.js', 'lib/**/*.js', 'test/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    },
    rules: styleRules
  },

  // --- Browser files (frontend) ---
  {
    files: ['public/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    },
    rules: styleRules
  }
];

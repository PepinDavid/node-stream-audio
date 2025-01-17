// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        files: ['src/**/*.ts', 'tests/*.ts'],
        extends: [tseslint.configs.disableTypeChecked],
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: {
        parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
);
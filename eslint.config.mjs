import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import boundaries from 'eslint-plugin-boundaries'


const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,

    // ESLint Boundaries Configuration
    {
        plugins: {
            boundaries,
        },
        settings: {
            // Only include source files, exclude root-level config files
            'boundaries/include': ['app/**/*', 'components/**/*', 'hooks/**/*', 'lib/**/*', 'providers/**/*', 'schemas/**/*', 'server/**/*', 'emails/**/*', 'modules/**/*', 'prisma/**/*'],
            'boundaries/elements': [
                // Shared/Global folders - can be imported by anyone
                {
                    mode: 'full',
                    type: 'shared',
                    pattern: [
                        'components/**/*',
                        'hooks/**/*',
                        'lib/**/*',
                        'providers/**/*',
                        'schemas/**/*',
                        'server/**/*',
                        'emails/**/*',
                    ],
                },
                // Feature modules - isolated, cannot import from other modules
                {
                    mode: 'full',
                    type: 'module',
                    capture: ['moduleName'],
                    pattern: ['modules/*/**/*'],
                },
                // App directory - can import from shared and modules
                {
                    mode: 'full',
                    type: 'app',
                    capture: ['_', 'fileName'],
                    pattern: ['app/**/*'],
                },
                // Root level files and other folders that should not be imported
                {
                    mode: 'full',
                    type: 'neverImport',
                    pattern: ['prisma/**/*'],
                },
            ],
        },
        rules: {
            'boundaries/no-unknown': ['error'],
            'boundaries/no-unknown-files': ['error'],
            'boundaries/element-types': [
                'error',
                {
                    default: 'disallow',
                    rules: [
                        // Shared can import from shared
                        {
                            from: ['shared'],
                            allow: ['shared'],
                        },
                        // Modules can import from shared and from themselves (same module only)
                        {
                            from: ['module'],
                            allow: [
                                'shared',
                                ['module', { moduleName: '${from.moduleName}' }],
                            ],
                        },
                        // App and neverImport can import from shared and any module
                        {
                            from: ['app', 'neverImport'],
                            allow: ['shared', 'module'],
                        },
                        // App can import CSS files from app
                        {
                            from: ['app'],
                            allow: [['app', { fileName: '*.css' }]],
                        },
                    ],
                },
            ],
        },
    },

    // Override default ignores of eslint-config-next.
    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
        'node_modules/**',
    ]),
])

export default eslintConfig
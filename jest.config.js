module.exports = {
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],

    transform: {
        '^.+\\.vue$': 'vue-jest'
    },

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },

    testMatch: [
        '**/tests/**/*.js',
        '**/*.spec.js'
    ],

    testURL: 'http://localhost:8000/',
    preset: '@vue/cli-plugin-unit-jest',
    
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
}

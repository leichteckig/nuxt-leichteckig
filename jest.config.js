module.exports = {
  moduleNameMapper: {
    '^.+/(.*\\.svg)\\?inline$': '<rootDir>/assets/icons/$1',
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: [
    'js',
    'vue',
    'json'
  ],
  transform: {
    '^.+\\.svg$': '<rootDir>/svgTransform.js',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue'
  ],
  testPathIgnorePatterns: [
    "<rootDir>/cypress/"
  ]
}

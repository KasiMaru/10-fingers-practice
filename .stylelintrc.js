module.exports = {
    extends: 'stylelint-config-standard-scss',

    plugins: [
        'stylelint-scss',
    ],

    rules: {
        'color-no-invalid-hex': true,
        'indentation': 4,
    }
}
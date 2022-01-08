module.exports = {
    extends: 'stylelint-config-standard-scss',

    plugins: [
        'stylelint-scss',
    ],

    rules: {
        'indentation': 4,
        'string-quotes': 'single',
        'selector-class-pattern': null,
        'declaration-block-no-redundant-longhand-properties': null,
    }
}

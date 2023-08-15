module.exports = {
	rules: {},
	overrides: [
		{
			files: ['**/*.*'],
			rules: {
				'your-rule-name': 'off',
				// Add other rules you want to turn off here
			},
		},
	],
};

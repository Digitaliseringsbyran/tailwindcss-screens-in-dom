module.exports = function(
	opts = {
		noScreen: 'xs',
	}
) {
	return function({ addBase, config }) {
		const screens = config('theme.screens', {})

		if (Object.entries(screens).length === 0) {
			return
		}

		addBase({
			'body:before': { content: `"${opts.noScreen}"`, display: 'none' },
		})

		for (let [k, v] of Object.entries(screens)) {
			addBase({
				[`@media (min-width: ${v})`]: {
					'body:before': {
						content: `"${k}"`,
					},
				},
			})
		}
	}
}

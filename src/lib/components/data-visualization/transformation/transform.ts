import type { TransformRule } from './types';

function isAlphabetic(char: string) {
	// Check if the character is a letter using Unicode character categories
	return /\p{L}/u.test(char);
}

const wordifyBySymbol = (value: string, symbol = '_'): string => {
	return value.split(symbol).join(' ');
};

const wordifyCamel = (value: string) => {
	const words = [value.charAt(0)];
	for (let i = 1; i < value.length - 1; i++) {
		if (
			isAlphabetic(value[i - 1]) &&
			value[i - 1] !== value[i - 1].toUpperCase() &&
			isAlphabetic(value[i]) &&
			value[i] === value[i].toUpperCase() &&
			isAlphabetic(value[i + 1]) &&
			value[i + 1] !== value[i + 1].toUpperCase()
		) {
			words.push(' ');
		}

		words.push(value[i]);
	}

	return words.join('') + value.charAt(value.length - 1);
};

const capitalize = (value: string): string => {
	const words = value.split(' ');
	const result: string[] = [];

	words.forEach((word) => {
		let uppercaseCounter = 0;
		let isAcronym = false;

		for (let i = 0; i < word.length; ++i) {
			if (word[i] === word[i].toUpperCase()) {
				uppercaseCounter++;
			}
		}

		isAcronym = uppercaseCounter === word.length;

		if (isAcronym) {
			result.push(word);
		} else {
			result.push(word.charAt(0).toUpperCase() + word.slice(1));
		}
	});
	return result.join(' ');
};

export const applyRule = (value: string, rule: TransformRule | undefined = undefined): string => {
	if (!rule) return value;

	switch (rule) {
		case 'capitalize':
			return capitalize(value);
		case 'lowercase':
			return value.toLowerCase();
		case 'uppercase':
			return value.toUpperCase();
		case 'wordify':
			return wordifyBySymbol(wordifyCamel(value));
		default:
			return value;
	}
};

export const transform = (value: string, rules: TransformRule[]): string => {
	let result: string = value;

	rules.forEach((rule: TransformRule) => {
		result = applyRule(result, rule);
	});

	return result;
};

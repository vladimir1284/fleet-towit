import type { TransformRule } from './types';

const isAlphabetic = (char: string) => {
  // Check if the character is a letter using Unicode character categories
  return (/\p{L}/u.test(char));
}

const isUrl = (str: string) => {
  try {
    // Create a new URL object
    new URL(str);
    return true;
  } catch (err) {
    // If an error is thrown, it's not a valid URL
    return false;
  }
};


const wordifyBySymbol = (value: string, symbol = "_"): string => {
  return value.split(symbol).join(" ")
}

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
      result.push(word)
    } else {
      result.push(word.charAt(0).toUpperCase() + word.slice(1))
    }

  })
  return result.join(" ")
}

const simpleDatetime = (value: string | Date) => {
  const isDatetime = (str) => {
    try {
      // Create a new Date object from the string
      const date = new Date(str);

      // Check if the date object is valid (not "Invalid Date")
      return !isNaN(date.getTime());
    } catch (err) {
      // If an error is thrown, it's not a valid date/datetime
      return false;
    }
  }

  if (!isDatetime(value)) return value

  const datetime = new Date(value)

  const zerofy = (value) => {
    if (Math.abs(value) >= 10) return value

    return value < 0 ? `-0${value}` : `0${value}`
  }

  const year = zerofy(datetime.getFullYear())
  const month = zerofy(datetime.getMonth())
  const day = zerofy(datetime.getDay())
  const hours = zerofy(datetime.getHours())
  const minutes = zerofy(datetime.getMinutes())
  const seconds = zerofy(datetime.getSeconds())

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}


export const applyRule = (value: string, rule: TransformRule | undefined = undefined): string => {
	if (!rule) return value;

  switch (rule) {
    case "capitalize":
      return capitalize(value)
    case "lowercase":
      return value.toLowerCase()
    case "uppercase":
      return value.toUpperCase()
    case "wordify":
      return wordifyBySymbol(wordifyCamel(value))
    case "simple-datetime":
      return simpleDatetime(value)
    default:
      return value
  }
}

export const transform = (value: string, rules: TransformRule[]): string => {
  if (!['string', 'boolean', 'number', 'bigint'].includes(typeof value)) {
    throw new Error('Not a transformable value type.')
  }

  if (isUrl(value)) return value

  let result: string = String(value)

	rules.forEach((rule: TransformRule) => {
		result = applyRule(result, rule);
	});

	return result;
};

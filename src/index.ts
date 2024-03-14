const UNESCAPED = /`|\\/g;
const ESCAPED = /\\(`|\\)/g;
const LINE_BREAKS = /[\r\t\n]/g;
const INTERP_RAW = /<%=([\s\S]+?)%>/g;
const INTERP_ENC = /<%!([\s\S]+?)%>/g;
const EVALUATE = /<%([\s\S]+?(\}?)+)%>/g;
const NEW_LINE = /\n`;/g;

export default function (template: string, context: object): string {
	const unescape = (str: string) =>
		str.replace(ESCAPED, "$1").replace(LINE_BREAKS, " ");

	const encode = (str: string) => {
		const map = {
			"&": "&#38;",
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"/": "&#47;",
		};

		return str.replace(
			/&(?!#?\w+;)|<|>|"|'|\//g,
			(match) => map[match as keyof typeof map],
		);
	};

	const fn = `const encode = ${encode.toString()};let _=\`${template
		.replace(UNESCAPED, "\\$&")
		.replace(INTERP_RAW, (_, code) => `\`+(${unescape(code)})+\``)
		.replace(INTERP_ENC, (_, code) => `\`+encode(${unescape(code)})+\``)
		.replace(EVALUATE, (_, code) => `\`;${unescape(code)};_+=\``)
		.replace(NEW_LINE, "`;")}\`;return _;`;

	return new Function("it", fn)(context);
}

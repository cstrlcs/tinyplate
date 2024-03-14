import Bun from "bun";
import tinyplate from "./src";

const WARNING =
	"<!-- This file is generated using tinyplate. Do not edit directly. -->\n";
const SPLIT = /\r\n|\r|\n/;
const EXAMPLES = [
	"basic_example.js",
	"using_a_file.js",
	"layout_and_partials.js",
	"logic.js",
];

const template = await Bun.file("README.tinyplate").text();
const loc = (await Bun.file("./src/index.ts").text()).split(SPLIT).length - 1;
const bytes = Bun.file("./dist/index.js").size;
const code = await Bun.file("./dist/index.js").text();

const examples = await Promise.all(
	EXAMPLES.map(async (file) => ({
		title: file
			.replace(/_/g, " ")
			.replace(/^(.)/, (c) => c.toUpperCase())
			.replace(/\.js$/, ""),
		code: await Bun.file(`examples/${file}`).text(),
	})),
);

const context = [
	{
		content: `Tinyplate is a dead simple templating engine written in pure typescript. It is designed to be super fast, minimal, with zero dependencies and easy to use.\n\nIt's tiny with only ${loc} lines of code and a size of ${bytes} bytes when bundled.`,
	},
	{
		title: "Features",
		content: [
			"Has 0 dependencies",
			"Extremely fast",
			"Supports HTML encoding",
			"Requires no options or configurations for use",
			"Works in Node, Bun, Deno, browser, and even your toaster (probably)",
		],
	},
	{
		content: "The bundle even fits here:",
		code,
	},
	{
		title: "Important Considerations ⚠️",
		content: [
			"Tinyplate is extremely minimal; it does not have any options or configurations.",
			"It allows arbitrary code execution in templates, which can be extremely powerful but also be dangerous. Do not use user input as part of the template.",
			"Although it supports HTML encoding through `<%! .. %>` tags, the library is new and has not been fully tested against code injection. Use caution with untrusted input.",
			"If you need more features out of the box, consider trying [doT](https://github.com/olado/doT) or [eta](https://eta.js.org/). Both are excellent tools that have inspired this library.",
		],
	},
	{
		title: "Usage",
		content: [
			"Install with `npm i tinyplate.js`",
			"`<% .. %>` - for code blocks",
			"`<%= .. %>` - for interpolations",
			"`<%! .. %>` - for interpolations with HTML encoding",
		],
	},
	{
		title: "Examples",
		content:
			"You can check some examples here and in the `examples` folder. Even this README is generated using tinyplate.",
		codes: examples,
	},
	{
		title: "Credits",
		content:
			"Tinyplate is heavily inspired by [doT](https://github.com/olado/doT) and [eta](https://eta.js.org/).\nHuge thanks to the creators of `doT` from where I borrowed the regexes and some of the logic. Also, a big shoutout to the creators of `eta` for inspiring the templating syntax.",
	},
];

const readme = tinyplate(template, context);
await Bun.write("README.md", WARNING + readme);

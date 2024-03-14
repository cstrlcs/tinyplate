import { expect, test } from "bun:test";
import tinyplate from "../src";

test("Interpolation", () => {
	const template = "<li><%= it.name %></li>";
	const data = { name: "tinyplate" };

	expect(tinyplate(template, data)).toBe("<li>tinyplate</li>");
});

test("Complex interpolation", () => {
	const template = "<li><%= (it.name + ('plate') + 1) %></li>";
	const data = { name: "tiny" };

	expect(tinyplate(template, data)).toBe("<li>tinyplate1</li>");
});

test("Not escaped HTML", () => {
	const template = "<li><%= it.name %></li>";
	const data = { name: "<script>alert('XSS')</script>" };

	expect(tinyplate(template, data)).toBe(
		"<li><script>alert('XSS')</script></li>",
	);
});

test("Escaped HTML", () => {
	const template = "<li><%! it.name %></li>";
	const data = { name: "<script>alert('XSS')</script>" };

	expect(tinyplate(template, data)).toBe(
		"<li>&#60;script&#62;alert(&#39;XSS&#39;)&#60;&#47;script&#62;</li>",
	);
});

test("Iterations", () => {
	const template =
		"<ul><% for (let i = 0; i < it.value; i++) { %><i><%= i %></i><% } %></ul>";
	const context = { value: 3 };
	expect(tinyplate(template, context)).toBe(
		"<ul><i>0</i><i>1</i><i>2</i></ul>",
	);
});

test("Escapes backticks and backslashes", () => {
	const template = "` \\ `<%= it.value %>` \\ ``";
	const context = { value: "test" };
	expect(tinyplate(template, context)).toContain("test");
});

test("Interpolation with template literals", () => {
	const template = "<%= `test` %><%= `${'test'}` %>";
	const context = {};
	expect(tinyplate(template, context)).toBe("testtest");
});

test("Conditionals", () => {
	const template =
		"<p><% if (it.value) { %>Hello<% } else { %>Goodbye<% } %></p>";

	expect(tinyplate(template, { value: true })).toBe("<p>Hello</p>");
	expect(tinyplate(template, { value: false })).toBe("<p>Goodbye</p>");
});

test("Mantain line breaks", () => {
	const template = "Line1\n\nLine2\rLine3\tEnd";
	const context = {};
	expect(tinyplate(template, context)).toBe("Line1\n\nLine2\nLine3\tEnd");
});

test("Undefined variable", () => {
	const template = "<b><%= it.name %></b>";
	const context = {};
	expect(tinyplate(template, context)).toBe("<b>undefined</b>");
});

test("Invalid template", () => {
	const template = "<b><% it.name <% %></b>";
	const context = {};
	expect(() => tinyplate(template, context)).toThrow();
});

test("Invalid interpolation", () => {
	const template = "<b><%== it.name %></b>";
	const context = {};
	expect(() => tinyplate(template, context)).toThrow();
});

test("Invalid interpolation value", () => {
	const template = "<b><%= it.name %></b>";
	const context = { name: " <% " };
	expect(tinyplate(template, context)).toBe("<b> <% </b>");
});

test("Executes functions in context for interpolation", () => {
	const template = "Result: <%= it.calculate() %>";
	const context = { calculate: () => 5 + 3 };
	expect(tinyplate(template, context)).toBe("Result: 8");
});

test("Accesses deep object properties", () => {
	const template = "Deep value: <%= it.user.info.age %>";
	const context = { user: { info: { age: 30 } } };
	expect(tinyplate(template, context)).toBe("Deep value: 30");
});

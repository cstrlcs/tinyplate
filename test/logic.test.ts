import interpolate from "../src/index.ts";

describe("logic", () => {
  test("iterations", () => {
    expect.assertions(1);
    const template = "<ul><% for (let i = 0; i < it.value; i++) { %><i><%= i %></i><% } %></ul>";
    expect(interpolate(template, { value: 3 })).toBe("<ul><i>0</i><i>1</i><i>2</i></ul>");
  });

  test("conditionals", () => {
    expect.assertions(2);
    const template = "<p><% if (it.value) { %>Hello<% } else { %>Goodbye<% } %></p>";
    expect(interpolate(template, { value: true })).toBe("<p>Hello</p>");
    expect(interpolate(template, { value: false })).toBe("<p>Goodbye</p>");
  });
});

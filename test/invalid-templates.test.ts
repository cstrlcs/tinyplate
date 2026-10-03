import interpolate from "../src/index.ts";

describe("invalid templates", () => {
  test("throws on unclosed tag", () => {
    expect.assertions(1);
    expect(() => interpolate("<b><% it.name <% %></b>", {})).toThrow("Unexpected token '%'");
  });

  test("throws on unknown modifier", () => {
    expect.assertions(1);
    expect(() => interpolate("<b><%== it.name %></b>", {})).toThrow("Unexpected token '='");
  });
});

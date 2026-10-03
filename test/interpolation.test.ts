import interpolate from "../src/index.ts";

describe("interpolation", () => {
  test("simple value", () => {
    expect.assertions(1);
    const data = { name: "interpolate" };
    expect(interpolate("<li><%= it.name %></li>", data)).toBe("<li>interpolate</li>");
  });

  test("complex expression", () => {
    expect.assertions(1);
    const data = { name: "inter" };
    expect(interpolate("<li><%= (it.name + ('polate') + 1) %></li>", data)).toBe(
      "<li>interpolate1</li>",
    );
  });

  test("template literals", () => {
    expect.assertions(1);
    expect(interpolate("<%= `test` %><%= `test` %>", {})).toBe("testtest");
  });

  test("undefined variable", () => {
    expect.assertions(1);
    expect(interpolate("<b><%= it.name %></b>", {})).toBe("<b>undefined</b>");
  });
});

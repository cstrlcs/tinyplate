import interpolate from "../src/index.ts";

describe("escaping", () => {
  const xss = { name: "<script>alert('XSS')</script>" };

  test("keeps raw HTML with =", () => {
    expect.assertions(1);
    expect(interpolate("<li><%= it.name %></li>", xss)).toBe(
      "<li><script>alert('XSS')</script></li>",
    );
  });

  test("escapes HTML with !", () => {
    expect.assertions(1);
    expect(interpolate("<li><%! it.name %></li>", xss)).toBe(
      "<li>&#60;script&#62;alert(&#39;XSS&#39;)&#60;&#47;script&#62;</li>",
    );
  });

  test("escapes backticks and backslashes", () => {
    expect.assertions(1);
    expect(interpolate("` \\ `<%= it.value %>` \\ ``", { value: "test" })).toContain("test");
  });

  test("maintains line breaks", () => {
    expect.assertions(1);
    expect(interpolate("Line1\n\nLine2\rLine3\tEnd", {})).toBe("Line1\n\nLine2\nLine3\tEnd");
  });
});

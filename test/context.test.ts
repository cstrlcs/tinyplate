import interpolate from "../src/index.ts";

describe("context", () => {
  test("executes functions", () => {
    expect.assertions(1);
    const context = { calculate: (): number => 5 + 3 };
    expect(interpolate("Result: <%= it.calculate() %>", context)).toBe("Result: 8");
  });

  test("accesses deep object properties", () => {
    expect.assertions(1);
    const context = { user: { info: { age: 30 } } };
    expect(interpolate("Deep value: <%= it.user.info.age %>", context)).toBe("Deep value: 30");
  });

  test("does not compile tags inside values", () => {
    expect.assertions(1);
    expect(interpolate("<b><%= it.name %></b>", { name: " <% " })).toBe("<b> <% </b>");
  });
});

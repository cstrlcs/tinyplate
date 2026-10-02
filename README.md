<!-- This file is generated using interpolate. Do not edit directly. -->
# interpolate

Interpolate is a dead simple templating engine written in pure typescript. It is designed to be super fast, minimal, with zero dependencies and easy to use.

It's tiny with only 20 lines of code and a size of 288 bytes when bundled.

## Features

- Has 0 dependencies
- Extremely fast
- Supports HTML encoding
- Requires no options or configurations for use
- Works in Node, Bun, Deno, browser, and even your toaster (probably)

The bundle even fits here:

```javascript
var e=(n)=>String(n).replace(/&(?!#?\w+;)|[<>"'/]/g,(t)=>`&#${t.charCodeAt(0)};`),T=(n,t,s,r)=>r?s?`${t}\`+${s==="!"?"e":""}(${r})+\``:`\`;${r};_+=\``:`\\${n}`,g=(n,t)=>Function("it","e",`let _=\`${n.replace(/(\n?)<%([=!]?)([\s\S]+?)%>|[`\\]/g,T)}\`;return _`)(t,e);export{g as default};
```

## Important Considerations ⚠️

- Interpolate is extremely minimal; it does not have any options or configurations.
- It allows arbitrary code execution in templates, which can be extremely powerful but also be dangerous. Do not use user input as part of the template.
- Although it supports HTML encoding through `<%! .. %>` tags, the library is new and has not been fully tested against code injection. Use caution with untrusted input.
- If you need more features out of the box, consider trying [doT](https://github.com/olado/doT) or [eta](https://eta.js.org/). Both are excellent tools that have inspired this library.

## Usage

- Install with `npm i @cstrlcs/interpolate`
- `<% .. %>` - for code blocks
- `<%= .. %>` - for interpolations
- `<%! .. %>` - for interpolations with HTML encoding

## Examples

You can check some examples here and in the `examples` folder. Even this README is generated using interpolate.

### Basic example

```javascript
import interpolate from "@cstrlcs/interpolate";

interpolate("<li><%= it.name %></li>", { name: "interpolate" });
```

### Using a file

```javascript
import fs from "node:fs";
import interpolate from "@cstrlcs/interpolate";

const template = fs.readFileSync("template.txt", "utf8");
interpolate(template, { name: "interpolate" });
```

### Layout and partials

```javascript
import interpolate from "@cstrlcs/interpolate";

const LAYOUT_TEMPLATE = `
<html>
<head>
  <title><%! it.title %></title>
</head>
<body>
<%= it.body %>
</body>`;

const BODY_TEMPLATE = `
<main>
  <h1><%! it.content %></h1>
</main>
`;

const context = { title: "interpolate", content: "Hello, world!" };
interpolate(LAYOUT_TEMPLATE, {
  ...context,
  body: interpolate(BODY_TEMPLATE, context),
});
```

### Logic

```javascript
import interpolate from "@cstrlcs/interpolate";

const TEMPLATE = `
<div>
  <ul>
  <% for (let i = 0; i < it.amount; i++) { %>
    <li><%= i %></li>
  <% } %>
  </ul>

  <% if (it.name) { %>
    <p>Hello, <%= it.name %>!</p>
  <% } else { %>
    <p>Hello, world!</p>
  <% } %>
</div>`;

interpolate(TEMPLATE, { name: "interpolate", amount: 5 });
```

## Credits

Interpolate is heavily inspired by [doT](https://github.com/olado/doT) and [eta](https://eta.js.org/).
Huge thanks to the creators of `doT` from where I borrowed the regexes and some of the logic. Also, a big shoutout to the creators of `eta` for inspiring the templating syntax.


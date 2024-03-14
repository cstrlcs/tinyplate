<!-- This file is generated using tinyplate. Do not edit directly. -->
# tinyplate

Tinyplate is a dead simple templating engine written in pure typescript. It is designed to be super fast, minimal, with zero dependencies and easy to use.

It's tiny with only 37 lines of code and a size of 587 bytes when bundled.

## Features

- Has 0 dependencies
- Extremely fast
- Supports HTML encoding
- Requires no options or configurations for use
- Works in Node, Bun, Deno, browser, and even your toaster (probably)

The bundle even fits here:

```javascript
var v=/`|\\/g,w=/\\(`|\\)/g,y=/[\r\t\n]/g,z=/<%=([\s\S]+?)%>/g,F=/<%!([\s\S]+?)%>/g,G=/<%([\s\S]+?(\}?)+)%>/g,H=/\n`;/g;function J(g,j){const b=(i)=>i.replace(w,"$1").replace(y," "),k=`const encode = ${((i)=>{const f={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"};return i.replace(/&(?!#?\w+;)|<|>|"|'|\//g,(q)=>f[q])}).toString()};let _=\`${g.replace(v,"\\$&").replace(z,(i,f)=>`\`+(${b(f)})+\``).replace(F,(i,f)=>`\`+encode(${b(f)})+\``).replace(G,(i,f)=>`\`;${b(f)};_+=\``).replace(H,"`;")}\`;return _;`;return new Function("it",k)(j)}export{J as default};
```

## Important Considerations ⚠️

- Tinyplate is extremely minimal; it does not have any options or configurations.
- It allows arbitrary code execution in templates, which can be extremely powerful but also be dangerous. Do not use user input as part of the template.
- Although it supports HTML encoding through `<%! .. %>` tags, the library is new and has not been fully tested against code injection. Use caution with untrusted input.
- If you need more features out of the box, consider trying [doT](https://github.com/olado/doT) or [eta](https://eta.js.org/). Both are excellent tools that have inspired this library.

## Usage

- `<% .. %>` - for code blocks
- `<%= .. %>` - for interpolations
- `<%! .. %>` - for interpolations with HTML encoding

## Examples

You can check some examples here and in the `examples` folder. Even this README is generated using tinyplate.

### Basic example

```javascript
import tinyplate from "tinyplate";

tinyplate("<li><%= it.name %></li>", { name: "tinyplate" });
```

### Using a file

```javascript
import tinyplate from "tinyplate";
import fs from "fs";

const template = fs.readFileSync("template.txt", "utf8");
tinyplate(template, { name: "tinyplate" });
```

### Layout and partials

```javascript
import tinyplate from "tinyplate";

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
`

const context = { title: "tinyplate", content: "Hello, world!" };
tinyplate(LAYOUT_TEMPLATE, { ...context, body: tinyplate(BODY_TEMPLATE, context) });
```

### Logic

```javascript
import tinyplate from "tinyplate";

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

tinyplate(TEMPLATE, { name: "tinyplate", amount: 5 });
```

## Credits

Tinyplate is heavily inspired by [doT](https://github.com/olado/doT) and [eta](https://eta.js.org/).
Huge thanks to the creators of `doT` from where I borrowed the regexes and some of the logic. Also, a big shoutout to the creators of `eta` for inspiring the templating syntax.


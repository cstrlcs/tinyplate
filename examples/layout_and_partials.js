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

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

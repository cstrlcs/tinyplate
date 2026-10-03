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

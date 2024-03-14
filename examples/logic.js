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

# Interpolate for VS Code

Syntax highlighting for [interpolate](https://github.com/cstrlcs/interpolate) templates in `.interpolate` files.

- `<% .. %>`, `<%= .. %>` and `<%! .. %>` tags are highlighted as JavaScript
- Text outside tags is left as plain text, so templates can generate any format

## Local install

```sh
ln -s "$PWD" ~/.vscode/extensions/cstrlcs.interpolate-vscode-0.1.0
```

Restart VS Code after linking.

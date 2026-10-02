const e = (s: unknown): string =>
	String(s).replace(/&(?!#?\w+;)|[<>"'/]/g, (c) => `&#${c.charCodeAt(0)};`);

export default (template: string, it: object): string =>
	new Function(
		"it",
		"e",
		`let _=\`${template.replace(
			/(\n?)<%([=!]?)([\s\S]+?)%>|[`\\]/g,
			(m, nl, mod, code) =>
				code
					? mod
						? `${nl}\`+${mod === "!" ? "e" : ""}(${code})+\``
						: `\`;${code};_+=\``
					: `\\${m}`,
		)}\`;return _`,
	)(it, e);

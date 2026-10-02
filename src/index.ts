const CONTEXT = "it";
const ENCODER = "e";
const OUTPUT = "_";

const encode = (value: unknown): string =>
  String(value).replace(/&(?!#?\w+;)|[<>"'/]/g, (char) => `&#${char.charCodeAt(0)};`);

const compileToken = (match: string, newline: string, modifier: string, code?: string): string =>
  code
    ? modifier
      ? `${newline}\`+${modifier === "!" ? ENCODER : ""}(${code})+\``
      : `\`;${code};${OUTPUT}+=\``
    : `\\${match}`;

export default (template: string, context: object): string =>
  new Function(
    CONTEXT,
    ENCODER,
    `let ${OUTPUT}=\`${template.replace(/(\n?)<%([=!]?)([\s\S]+?)%>|[`\\]/g, compileToken)}\`;return ${OUTPUT}`,
  )(context, encode);

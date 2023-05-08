export type JsonElement = {
  tag: string;
  text: string;
  children: JsonElement[];
};

export function parseHtmlToJson(element: Element) {
  const json = {
    tag: element.tagName.toLowerCase(),
    text: element.textContent ? element.textContent.trim() : "",
    children: [] as JsonElement[],
  };

  for (let child of element.children) {
    json.children.push(parseHtmlToJson(child));
  }

  return json;
}

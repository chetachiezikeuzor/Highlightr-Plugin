export function setAttributes(element: any, attributes: any) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

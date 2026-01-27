export const loadHtml = async (path) => {
  const res = await fetch(path);
  const html = await res.text();
  const tpl = document.createElement("template");
  tpl.innerHTML = html;
  return tpl.content;
};

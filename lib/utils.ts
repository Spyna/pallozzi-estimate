export function randomId(): string {
  return new Array(3)
    .fill(null)
    .map(() => Math.random().toString(36).slice(2))
    .join("");
}

export function downloadURI(uri: string, name: string) {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

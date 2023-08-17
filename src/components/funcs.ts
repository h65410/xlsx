export const rtl = (txt: string) => {
  return (' ' + txt)
    .split(' ')
    .reverse()
    .join(' ')
    .replace(/\]/g, "^").replace(/\[/g, " ]").replace(/\^/g, "[")
    .replace(/\)/g, "^").replace(/\(/g, " )").replace(/\^/g, "(")
}

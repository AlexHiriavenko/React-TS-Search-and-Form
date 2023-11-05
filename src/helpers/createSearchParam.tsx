export function createSearhParam(basicUrl: string, url: string): string {
  url = url.replace(basicUrl, '');

  const lastIndex = url.lastIndexOf('=');
  if (lastIndex !== -1) {
    return url.substring(0, lastIndex + 1);
  }
  return url;
}

export function getLocalizedPath(path, lang) {
  
  let cleanedPath = path.startsWith('/ua') || path.startsWith('/ru')
    ? path.substring(3)
    : path;
  
  if (cleanedPath.startsWith('/')) {
    cleanedPath = cleanedPath.substring(1);
  }
  
  if (lang === 'uk') {
    return `/${cleanedPath}`;
  }
  
  return `/${lang}/${cleanedPath}`;
}

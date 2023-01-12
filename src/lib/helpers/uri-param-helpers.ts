export function setSearchParam(param: string, value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(param, value);
  window.history.pushState({}, '', url.toString());
}

export function getSearchParam(param: string) {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
}
export function setSearchParam(key: string, value: string) {
  if (!window) {
    return;
  }
  const searchParams = new URLSearchParams(window.location.search);
  console.log("searchParams", searchParams.toString());
  searchParams.set(key, value);
  console.log("searchParams", searchParams.toString());
  const path = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
  window.history.pushState({path},'', path);
}

export function getSearchParam(param: string) {
  if (!window) {
    return;
  }
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
}
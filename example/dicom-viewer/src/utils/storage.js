const storageGet = (item) => window.localStorage.getItem(item);
const storageSet = (item, val) => window.localStorage.setItem(item, val);
export { storageGet, storageSet };

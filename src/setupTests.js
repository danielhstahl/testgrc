let store= {}
const localStorageMock = {
  getItem: (key)=>store[key],
  setItem: (key, val)=>{store[key]=val},
  clear: (key)=>{store={}},
  removeItem:(key)=>{store[key]=null}
};
global.localStorage = localStorageMock

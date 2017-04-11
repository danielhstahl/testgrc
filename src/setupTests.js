const localStorageMock = {
  store : {},
  getItem: (key)=>this.store[key],
  setItem: (key, val)=>this.store[key]=val,
  clear: (key)=>this.store={},
  removeItem:(key)=>this.store[key]=null
};
global.localStorage = localStorageMock

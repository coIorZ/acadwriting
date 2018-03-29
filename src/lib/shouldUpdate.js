export default (arr, props, nextProps) => {
  if(typeof arr === 'string') {
    arr = [arr];
  }
  for(let i = 0, len = arr.length; i < len; i++) {
    const p = arr[i];
    if(props[p] !== nextProps[p]) return true;
  }
  return false;
};

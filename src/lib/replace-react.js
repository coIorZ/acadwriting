export default (str, match, fn) => {
  const reg = new RegExp(match);
  const res = str.split(reg);
  for(let i = 1, len = res.length; i < len; i += 2) {
    res[i] = fn(res[i], i);
  }
  return res;
};

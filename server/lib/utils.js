export const normalize = (id = 'id') => arr => arr.reduce((m, v) => {
  m[v[id]] = v;
  return m;
}, {});

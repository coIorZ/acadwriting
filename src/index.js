import Kar98k from '98k';
import createLoading from '98k-loading';

import home from './modules/home';

const app = Kar98k();

app.use(createLoading({
  include: ['^home/fetch'],
}))
  .module(home)
  .start('#app');

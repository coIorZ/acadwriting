import Sequelize from 'sequelize';

export default new Sequelize('acadwrit_infobase', 'root', '', {
  host             : 'localhost',
  dialect          : 'mysql',
  operatorsAliases : false,
});

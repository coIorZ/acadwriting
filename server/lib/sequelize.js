import Sequelize from 'sequelize';

export default new Sequelize('acadwrit_infobase', 'root', '123', {
  host             : 'localhost',
  dialect          : 'mysql',
  operatorsAliases : false,
  insecureAuth     : true,
  define           : {
    timestamps: false,
  },
});

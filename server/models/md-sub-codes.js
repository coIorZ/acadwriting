import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';

export default sequelize.define('Metadiscourse_Function_Subcategories', {
  id       : { type: Sequelize.INTEGER, field: 'metad_funct_subcat_id', primaryKey: true },
  mdCodeId : { type: Sequelize.INTEGER, field: 'metad_funct_id' },
  label    : { type: Sequelize.STRING, field: 'display' },
  desc     : { type: Sequelize.STRING, field: 'metad_funct_subcat_description' },
}, {
  freezeTableName: true,
});

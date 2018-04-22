import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';

export default sequelize.define('Metadiscourse_Function', {
  id    : { type: Sequelize.INTEGER, field: 'metad_funct_id', primaryKey: true },
  label : { type: Sequelize.STRING, field: 'display' },
  desc  : { type: Sequelize.STRING, field: 'metad_funct_description' },
}, {
  freezeTableName: true,
});

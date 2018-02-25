import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';

export default sequelize.define('Model', {
  id          : { type: Sequelize.INTEGER, field: 'model_id', primaryKey: true },
  label       : { type: Sequelize.STRING, field: 'model' },
  description : { type: Sequelize.STRING, field: 'model_description' },
  createdAt   : { type: Sequelize.DATE, field: 'created_on' },
  updatedAt   : { type: Sequelize.DATE, field: 'last_modified_on' },
}, {
  freezeTableName: true,
});

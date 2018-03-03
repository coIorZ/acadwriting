import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';

export default sequelize.define('Strategies', {
  id            : { type: Sequelize.INTEGER, field: 'strategy_id', primaryKey: true },
  label         : { type: Sequelize.STRING, field: 'strategy' },
  moveId        : { type: Sequelize.STRING, field: 'move_id' },
  important     : { type: Sequelize.INTEGER, field: 'important' },
  rfCode        : { type: Sequelize.STRING, field: 'rf_code' },
  rfCodePrefix  : { type: Sequelize.STRING, field: 'rf_code_prefix' },
  rfCodeText    : { type: Sequelize.STRING, field: 'rf_code_text' },
  rfDescription : { type: Sequelize.STRING, field: 'rf_description' },
  createdAt     : { type: Sequelize.DATE, field: 'created_on' },
  updatedAt     : { type: Sequelize.DATE, field: 'last_modified_on' },
}, {
  freezeTableName: true,
});

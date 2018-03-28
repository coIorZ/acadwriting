import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';

export default sequelize.define('Research_Strategy', {
  id       : { type: Sequelize.INTEGER, field: 'strategy_id', primaryKey: true },
  rsTypeId : { type: Sequelize.INTEGER, field: 'research_type_id' },
  label    : { type: Sequelize.STRING, field: 'strategy' },
}, {
  freezeTableName: true,
});

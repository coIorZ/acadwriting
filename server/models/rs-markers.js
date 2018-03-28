import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';

export default sequelize.define('Research_Strategy_Marker', {
  id       : { type: Sequelize.INTEGER, field: 'marker_id', primaryKey: true },
  rsStepId : { type: Sequelize.INTEGER, field: 'strategy_id' },
  label    : { type: Sequelize.STRING, field: 'marker' },
}, {
  freezeTableName: true,
});

import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';

export default sequelize.define('Research_Example', {
  id        : { type: Sequelize.INTEGER, field: 'sentence_id', primaryKey: true },
  subjectId : { type: Sequelize.INTEGER, field: 'subject_id' },
  rsTypeId  : { type: Sequelize.INTEGER, field: 'research_type_id' },
  rsStepId  : { type: Sequelize.STRING, field: 'strategy_id' },
  marker    : { type: Sequelize.STRING, field: 'marker' },
  text      : { type: Sequelize.STRING, field: 'sentence' },
}, {
  freezeTableName: true,
});

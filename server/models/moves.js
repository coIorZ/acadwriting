import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';
import Steps from './steps';

const Moves = sequelize.define('Moves', {
  id        : { type: Sequelize.INTEGER, field: 'move_id', primaryKey: true },
  label     : { type: Sequelize.STRING, field: 'move' },
  sectionId : { type: Sequelize.STRING, field: 'report_section_id' },
  createdAt : { type: Sequelize.DATE, field: 'created_on' },
  updatedAt : { type: Sequelize.DATE, field: 'last_modified_on' },
}, {
  freezeTableName: true,
});

Moves.hasMany(Steps, {
  as         : 'steps',
  foreignKey : 'move_id',
  sourceKey  : 'move_id',
});

export default Moves;

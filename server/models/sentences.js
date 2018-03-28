import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';

export default sequelize.define('Example', {
  id        : { type: Sequelize.INTEGER, field: 'example_id', primaryKey: true },
  subjectId : { type: Sequelize.INTEGER, field: 'subject_id' },
  sectionId : { type: Sequelize.INTEGER, field: 'report_section_id' },
  match     : { type: Sequelize.STRING, field: 'patternmatch' },
  text      : { type: Sequelize.STRING, field: 'sentence' },
}, {
  freezeTableName: true,
});

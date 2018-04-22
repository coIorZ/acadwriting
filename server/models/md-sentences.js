import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';

export default sequelize.define('Metadiscourse_Example', {
  id          : { type: Sequelize.INTEGER, field: 'sentence_id', primaryKey: true },
  subjectId   : { type: Sequelize.INTEGER, field: 'subject_id' },
  sectionId   : { type: Sequelize.INTEGER, field: 'section_id' },
  mdSubCodeId : { type: Sequelize.STRING, field: 'metad_subcategory_id' },
  marker      : { type: Sequelize.STRING, field: 'metad_marker_id' },
  match       : { type: Sequelize.STRING, field: 'pattern_match' },
  text        : { type: Sequelize.STRING, field: 'sentence' },
}, {
  freezeTableName: true,
});

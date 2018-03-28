import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';

export default sequelize.define('Research_Type', {
  id        : { type: Sequelize.INTEGER, field: 'research_type_id', primaryKey: true },
  label     : { type: Sequelize.STRING, field: 'research_type' },
  sectionId : { type: Sequelize.STRING, field: 'report_section_id' },
}, {
  freezeTableName: true,
});

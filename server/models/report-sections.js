import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';

export default sequelize.define('Report_Section', {
  id          : { type: Sequelize.INTEGER, field: 'report_section_id', primaryKey: true },
  label       : { type: Sequelize.STRING, field: 'report_section_type' },
  description : { type: Sequelize.STRING, field: 'section_desc' },
  createdAt   : { type: Sequelize.DATE, field: 'created_on' },
  updatedAt   : { type: Sequelize.DATE, field: 'last_modified_on' },
}, {
  freezeTableName: true,
});

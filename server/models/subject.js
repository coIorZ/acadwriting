import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';

export default sequelize.define('Subject', {
  id          : { type: Sequelize.INTEGER, field: 'subject_id', primaryKey: true },
  label       : { type: Sequelize.STRING, field: 'subject' },
  description : { type: Sequelize.STRING, field: 'subject_description' },
  createdAt   : { type: Sequelize.DATE, field: 'created_on' },
  updatedAt   : { type: Sequelize.DATE, field: 'last_modified_on' },
}, {
  freezeTableName: true,
});

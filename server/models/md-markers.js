import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';

export default sequelize.define('Metadiscourse_Markers', {
  id     : { type: Sequelize.INTEGER, field: 'metad_marker_id', primaryKey: true },
  marker : { type: Sequelize.STRING, field: 'metad_marker' },
}, {
  freezeTableName: true,
});

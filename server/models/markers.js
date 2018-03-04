import Sequelize from 'sequelize';

import sequelize from '../lib/sequelize';

export default sequelize.define('Marker_Regex', {
  id         : { type: Sequelize.INTEGER, field: 'marker_regex_id', primaryKey: true },
  label      : { type: Sequelize.STRING, field: 'display' },
  marker     : { type: Sequelize.STRING, field: 'marker' },
  fullMarker : { type: Sequelize.STRING, field: 'full_marker' },
  confidence : { type: Sequelize.FLOAT, field: 'confidence_value' },
}, {
  freezeTableName: true,
});

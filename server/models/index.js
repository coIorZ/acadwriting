import sequelize from '../lib/sequelize';
import Moves from './moves';
import Steps from './steps';
import ReportSections from './report-sections';
import Models from './models';
import Subjects from './subjects';
import Markers from './markers';
import Sentences from './sentences';

Moves.hasMany(Steps, {
  as         : 'steps',
  foreignKey : 'move_id',
  sourceKey  : 'move_id',
});

Steps.belongsTo(Moves, {
  as: 'move',
});

Steps.belongsToMany(Markers, {
  through    : 'Link_Strategy_Marker_Regex',
  as         : 'markers',
  foreignKey : 'strategy_id',
});

Markers.belongsToMany(Steps, {
  through    : 'Link_Strategy_Marker_Regex',
  as         : 'steps',
  foreignKey : 'marker_regex_id',
});

Markers.belongsToMany(Sentences, {
  through    : 'Link_Marker_Regex_Example',
  as         : 'sentences',
  foreignKey : 'marker_regex_id',
});

Sentences.belongsToMany(Markers, {
  through    : 'Link_Marker_Regex_Example',
  as         : 'markers',
  foreignKey : 'example_id',
});

sequelize.sync();

export {
  Moves,
  Steps,
  ReportSections,
  Models,
  Subjects,
  Markers,
  Sentences,
};

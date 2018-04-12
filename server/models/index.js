import sequelize from '../lib/sequelize';
import Moves from './moves';
import Steps from './steps';
import ReportSections from './report-sections';
import Models from './models';
import Subjects from './subjects';
import Markers from './markers';
import Sentences from './sentences';
import MdCodes from './md-codes';
import MdSubCodes from './md-sub-codes';
import MdMarkers from './md-markers';
import RsTypes from './rs-types';
import RsSteps from './rs-steps';
import RsMarkers from './rs-markers';
import RsSentences from './rs-sentences';

Moves.hasMany(Steps, {
  as         : 'steps',
  foreignKey : 'move_id',
  sourceKey  : 'move_id',
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

MdCodes.hasMany(MdSubCodes, {
  as         : 'mdSubCodes',
  foreignKey : 'metad_funct_id',
  sourceKey  : 'metad_funct_id',
});

MdSubCodes.belongsToMany(MdMarkers, {
  through    : 'Metadiscourse_Markers_Confidence',
  as         : 'mdMarkers',
  foreignKey : 'metad_funct_subcat_id',
});

MdMarkers.belongsToMany(MdSubCodes, {
  through    : 'Metadiscourse_Markers_Confidence',
  as         : 'mdSubCodes',
  foreignKey : 'metad_marker_id',
});

RsTypes.hasMany(RsSteps, {
  as         : 'rsSteps',
  foreignKey : 'research_type_id',
  sourceKey  : 'research_type_id',
});

RsSteps.belongsToMany(RsMarkers, {
  through    : 'Research_Strategy_Marker',
  as         : 'rsMarkers',
  foreignKey : 'strategy_id',
});

RsMarkers.belongsToMany(RsSteps, {
  through    : 'Research_Strategy_Marker',
  as         : 'rsSteps',
  foreignKey : 'marker_id',
});

RsSentences.belongsToMany(RsMarkers, {
  through    : 'Research_Example',
  as         : 'markers',
  foreignKey : 'sentence_id',
});

RsMarkers.belongsToMany(RsSentences, {
  through    : 'Research_Example',
  as         : 'sentences',
  foreignKey : 'strategy_id',
});

RsSentences.belongsToMany(RsSteps, {
  through    : 'Research_Example',
  as         : 'steps',
  foreignKey : 'sentence_id',
});

RsSteps.belongsToMany(RsSentences, {
  through    : 'Research_Example',
  as         : 'sentences',
  foreignKey : 'strategy_id',
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
  MdCodes,
  MdSubCodes,
  MdMarkers,
  RsTypes,
  RsSteps,
  RsMarkers,
  RsSentences,
};

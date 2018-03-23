import { Router } from 'express';

import asyncWrap from './lib/async-wrap';
import { normalize } from './lib/utils';

import { Moves, Steps, Models, Subjects, ReportSections, Markers, Sentences } from './models';

const router = Router();

router.get('/writingModels', asyncWrap(async (req, res) => {
  let result = await Models.findAll();
  result = normalize()(result);
  res.status(200).json(result);
}));

router.get('/subjectAreas', asyncWrap(async (req, res) => {
  let result = await Subjects.findAll();
  result = normalize()(result);
  res.status(200).json(result);
}));

router.get('/sections', asyncWrap(async (req, res) => {
  let result = await ReportSections.findAll();
  result = normalize()(result);
  res.status(200).json(result);
}));

router.get('/moves', asyncWrap(async (req, res) => {
  let result = await Moves.findAll({
    include: [{
      model   : Steps,
      as      : 'steps',
      include : [{
        model      : Markers,
        as         : 'markers',
        attributes : ['id'],
        through    : {
          attributes: [],
        },
      }],
    }],
  });
  result = result.reduce((acc, move) => {
    const { id, sectionId, label, steps } = move;
    acc[id] = {
      id,
      sectionId,
      label,
      steps: steps.reduce((m, step) => {
        const { id: stepId, label: stepLabel, moveId, important, rfDescription, markers } = step;
        m[stepId] = {
          id      : stepId,
          label   : stepLabel,
          moveId,
          important,
          rfDescription,
          markers : normalize()(markers),
        };
        return m;
      }, {}),
    };
    return acc;
  }, {});
  res.status(200).json(result);
}));

router.get('/markers', asyncWrap(async (req, res) => {
  let result = await Markers.findAll({
    include: [{
      model      : Steps,
      as         : 'steps',
      attributes : ['id'],
      through    : {
        attributes: [],
      },
    }],
  });
  result = result.reduce((acc, m) => {
    const { id, label, marker, fullMarker, confidence, steps } = m;
    acc[id] = {
      id,
      label,
      marker,
      fullMarker,
      confidence,
      steps: normalize()(steps),
    };
    return acc;
  }, {});
  res.status(200).json(result);
}));

router.get('/sentencesByMarkerId', asyncWrap(async (req, res) => {
  const { id } = req.query;
  let result = await Markers.findOne({
    where: {
      id, 
    },
    include: [{
      model      : Sentences,
      as         : 'sentences',
      attributes : ['id', 'subjectId', 'sectionId', 'match', 'text'],
      through    : {
        attributes: [],
      },
    }],
  });
  result = normalize()(result.sentences);
  res.status(200).json(result);
}));

router.use((err, req, res, next) => {
  if(!err.__api__) return next(err);
  const { code, status, msg } = err;
  //req.log.error(`[Api Error] ${req.originalUrl}`, err);
  res.status(status).json({ code, msg });
});

export default router;

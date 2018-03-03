import { Router } from 'express';

import asyncWrap from './lib/async-wrap';
import { normalize } from './lib/utils';

import Models from './models/models';
import Subjects from './models/subjects';
import ReportSections from './models/report-sections';
import Moves from './models/moves';
import Steps from './models/steps';

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
      model : Steps,
      as    : 'steps',
    }],
  });
  result = normalize()(result);
  res.status(200).json(result);
}));

router.use((err, req, res, next) => {
  if(!err.__api__) return next(err);
  const { code, status, msg } = err;
  //req.log.error(`[Api Error] ${req.originalUrl}`, err);
  res.status(status).json({ code, msg });
});

export default router;

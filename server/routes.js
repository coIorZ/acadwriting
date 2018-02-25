import { Router } from 'express';

import asyncWrap from './lib/async-wrap';
import { normalize } from './lib/utils';

import Model from './models/model';
import Subject from './models/subject';

const router = Router();

router.get('/writingModels', asyncWrap(async (req, res) => {
  let result = await Model.findAll();
  result = normalize()(result);
  res.status(200).json(result);
}));

router.get('/subjectAreas', asyncWrap(async (req, res) => {
  let result = await Subject.findAll();
  result = normalize()(result);
  res.status(200).json(result);
}));

router.get('/sections', asyncWrap(async (req, res) => {
  res.status(200).json({
    '1' : { id: 1, text: 'introduction' },
    '2' : { id: 2, text: 'literature review' },
  });
}));

router.use((err, req, res, next) => {
  if(!err.__api__) return next(err);
  const { code, status, msg } = err;
  //req.log.error(`[Api Error] ${req.originalUrl}`, err);
  res.status(status).json({ code, msg });
});

export default router;

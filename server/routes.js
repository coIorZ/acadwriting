import { Router } from 'express';

import asyncWrap from './lib/async-wrap';

const router = Router();

router.get('/writingModels', asyncWrap(async (req, res) => {
  res.status(200).json({
    '1' : { id: 1, text: 'Rhetorical structure model' },
    '2' : { id: 2, text: 'Argumentation model' },
    '3' : { id: 3, text: 'Metadiscourse model' },
  });
}));

router.get('/subjectAreas', asyncWrap(async (req, res) => {
  res.status(200).json({
    '1' : { id: 1, text: 'Biological Science' },
    '2' : { id: 2, text: 'Mechanical Engineering' },
    '3' : { id: 3, text: 'Sociology' },
  });
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
  req.log.error(`[Api Error] ${req.originalUrl}`, err);
  res.status(status).json({ code, msg });
});

export default router;

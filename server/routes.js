import { Router } from 'express';

import asyncWrap from './lib/async-wrap';
import { normalize } from './lib/utils';

import { 
  Moves, Steps, Models, Subjects, ReportSections, Markers, Sentences,
  MdCodes, MdSubCodes, MdMarkers,
  RsTypes, RsSteps, RsMarkers,
} from './models';

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
      model      : Steps,
      as         : 'steps',
      attributes : ['id'],
    }],
  });
  result = result.reduce((acc, move) => {
    const { id, sectionId, label, steps } = move;
    acc[id] = {
      id,
      sectionId,
      label,
      steps: normalize()(steps),
    };
    return acc;
  }, {});
  res.status(200).json(result);
}));

router.get('/steps', asyncWrap(async (req, res) => {
  let result = await Steps.findAll({
    include: [{
      model      : Markers,
      as         : 'markers',
      attributes : ['id'],
      through    : {
        attributes: [],
      },
    }],
  });
  result = result.reduce((acc, step) => {
    const { id, label, moveId, important, rfDescription, markers } = step;
    acc[id] = {
      id,
      label,
      moveId,
      important,
      rfDescription,
      markers: normalize()(markers),
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

router.get('/mdCodes', asyncWrap(async (req, res) => {
  let result = await MdCodes.findAll({
    attributes : ['id', 'label', 'desc'],
    include    : [{
      model      : MdSubCodes,
      as         : 'mdSubCodes',
      attributes : ['id'],
    }],
  });
  result = result.reduce((acc, code) => {
    const { id, label, desc, mdSubCodes } = code;
    acc[id] = {
      id,
      label,
      desc,
      mdSubCodes: normalize()(mdSubCodes),
    };
    return acc;
  }, {});
  res.status(200).json(result);
}));

router.get('/mdSubCodes', asyncWrap(async (req, res) => {
  let result = await MdSubCodes.findAll({
    attributes : ['id', 'label', 'mdCodeId', 'desc'],
    include    : [{
      model      : MdMarkers,
      as         : 'mdMarkers',
      attributes : ['id'],
      through    : {
        attributes: [],
      },
    }],
  });
  result = result.reduce((acc, sub) => {
    const { id, label, mdCodeId, desc, mdMarkers } = sub;
    acc[id] = {
      id,
      label,
      mdCodeId,
      desc,
      mdMarkers: normalize()(mdMarkers),
    };
    return acc;
  }, {});
  res.status(200).json(result);
}));

router.get('/mdMarkers', asyncWrap(async (req, res) => {
  let result = await MdMarkers.findAll();
  result = normalize()(result);
  res.status(200).json(result);
}));

router.get('/rsTypes', asyncWrap(async (req, res) => {
  let result = await RsTypes.findAll({
    include: [{
      model   : RsSteps,
      as      : 'rsSteps',
      include : [{
        model   : RsMarkers,
        as      : 'rsMarkers',
        through : {
          attributes: [],
        },
      }],
    }],
  });
  result = result.reduce((acc, type) => {
    const { id, label, sectionId, rsSteps } = type;
    acc[id] = {
      id,
      label,
      sectionId,
      rsSteps: rsSteps.reduce((a, step) => {
        const { id, label, rsTypeId, rsMarkers } = step;
        a[id] = {
          id,
          label,
          rsTypeId,
          rsMarkers: normalize()(rsMarkers),
        };
        return a;
      }, {}),
    };
    return acc;
  }, {});
  res.status(200).json(result);
}));

router.use((err, req, res, next) => {
  if(!err.__api__) return next(err);
  const { code, status, msg } = err;
  //req.log.error(`[Api Error] ${req.originalUrl}`, err);
  res.status(status).json({ code, msg });
});

export default router;

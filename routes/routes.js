import express from 'express';
import { Project } from '../models/Project.js';

export const router = express.Router();

/*
  INDEX PAGE
  - Show all projects
  - Sorting dropdown (A-Z / Z-A)
*/
router.get('/', async (req, res, next) => {
  try {
    const sort = req.query.sort || 'az';

    const sortOption =
      sort === 'za'
        ? { title: -1 }
        : { title: 1 };

    const projects = await Project.find().sort(sortOption);

    res.render('index', {
      title: 'Service Fair Projects',
      projects,
      currentSort: sort
    });
  } catch (err) {
    next(err);
  }
});

/*
  CREATE PROJECT
*/
router.post('/projects', async (req, res, next) => {
  try {
    const { title, subtitle, description, ctsorcap} = req.body;

    if (!title || !subtitle || !description || !ctsorcap) {
      return res.redirect('/');
    }

    await Project.create({ title, subtitle, description, ctsorcap});

    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

/*
  PROJECT CREATOR/VIEWER
*/

router.get('/projectOWN', async (req, res, next) => {
  try {
    const sort = req.query.sort || 'az';

    const sortOption =
      sort === 'za'
        ? { title: -1 }
        : { title: 1 };

    const projects = await Project.find().sort(sortOption);

    res.render('ownerPage', {
      title: 'Service Fair Projects',
      projects,
      currentSort: sort
    });
  } catch (err) {
    next(err);
  }
});

/*
  SHOW SINGLE PROJECT
*/
router.get('/projects/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    res.render('character', {
      title: project.title,
      project,
      note: project.note,
    });

  } catch (err) {
    next(err);
  }
});

router.post('/projects/:id/note', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    const {note} = req.body;

     await Project.findByIdAndUpdate(req.params.id, {
      $push: { note: note }
    });

    res.redirect(`/projects/${req.params.id}`);

  } catch (err) {
    next(err);
  }
});

/*
  SHOW PROJECT PLUS EDIT
*/
router.get('/projects/:id/own', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    res.render('ownerChar', {
      title: project.title,
      project
    });
  } catch (err) {
    next(err);
  }
});

/*
  EDIT PAGE
*/
router.get('/projects/:id/edit', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    res.render('edit', {
      title: `Edit ${project.title}`,
      project
    });
  } catch (err) {
    next(err);
  }
});

/*
  UPDATE PROJECT
*/
router.post('/projects/:id', async (req, res, next) => {
  try {
    const { title, subtitle, description, ctsorcap} = req.body;

    await Project.findByIdAndUpdate(req.params.id, {
      title,
      subtitle,
      description,
      ctsorcap
    });

    res.redirect(`/projects/${req.params.id}`);
  } catch (err) {
    next(err);
  }
});


/*
  DELETE PROJECT
*/
router.post('/projects/:id/delete', async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});


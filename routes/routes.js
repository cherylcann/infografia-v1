const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.html', { title: 'Inicio', page: 'inicio' });
});

router.get('/proyectos', (req, res) => {
  res.render('projects.html', { title: 'Proyectos', page: 'proyectos', css: 'projects' });
});

router.get('/cherylcann', (req, res) => {
  res.render('infografia.html', { title: 'Conóceme', page: 'conoceme', css: 'conoceme' });
});

router.use((req, res) => {
  res.status(404).render('error.html', { title: 'Página no encontrada' });
});

module.exports = router;

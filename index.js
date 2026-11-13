const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/routes'));

app.listen(port, () => {
  console.log(`Servidor disponible en http://localhost:${port}`);
});

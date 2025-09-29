const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const docs = await global.db.selectClients();
    console.log(docs);
    res.render('index', {docs});
    console.log("Index renderizado!");
  }
  catch(error) {
    res.redirect('/?erro=' + error);
  }
});

// GET new page
router.get('/new', (req, res, next) => {
  res.render('new', { title: 'New Client', result: {}, action: "/new"});
})

router.get('/edit/:idclient', async(req, res) => {
  const idclient = parseInt(req.params.idclient);
  try {
    const result = await global.db.selectClient(idclient);
    res.render('new', {title: 'Client Edition', result,action: '/edit/' + idclient});
  }
  catch(error) {
    res.redirect('/?erro=' + error);
  }
});

router.post('/new', async (req, res) => {
  const name = req.body.name;
  const age =! req.body.age ? null:
  parseInt(req.body.age);
  const state = req.body.state;
  try {
    await global.db.insertClient({name, age, state});
    res.redirect('/?new=true');
  }
  catch(error) {
    res.redirect('/?erro=' + error);
  }
});

// POST edit page
router.post('/edit/:idclient', async (req, res) => {
  const idclient = parseInt(req.params.idclient);
  const name = req.body.name;
  const age =! req.body.age ? null : parseInt(req.body.age);
  const state = req.body.state;

  try {
    await global.db.updateClient(idclient, {name, age, state});
    res.redirect('/?edit=true');
  } catch(error) {
    res.redirect('/?erro=' + error);
  }
})

// GET delete page
router.get('/delete/:idclient', async (req, res) => {
  const idclient = parseInt(req.params.idclient);
  try {
    await global.db.deleteClient(idclient);
    res.redirect('/?delete=true');
  }
  catch(error) {
    res.redirect('/?erro=' + error);
  }
})

module.exports = router;

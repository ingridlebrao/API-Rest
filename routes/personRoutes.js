const router = require('express').Router();
const Person = require('../models/Person');

router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name) {
    return res.status(400).json({
      error: 'Missing name',
    });
  } else if (!salary) {
    return res.status(400).json({
      error: 'Missing salary',
    });
  }

  const person = {
    name,
    salary,
    approved,
  };

  try {
    await Person.create(person);

    res.status(201).json('Pessoa criada com sucesso');
  } catch (error) {
    res.status(400).json({ error: 'Error creating new person' });
  }
});

// Read - leitura de dados
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(400).json({ error: 'Error reading people' });
  }
});

router.get('/:id', async (req, res) => {
  // extrair o dado da requisicao
  // campo dinamico (:id)
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      return res.status(404).json({
        error: 'Person not found',
      });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(400).json({ error: 'Error reading person' });
  }
});

// update - atualizacao de dados (PUT -- PATCH)
router.patch('/:id', async (req, res) => {
  const id = req.params.id;

  const person = {
    name: req.body.name,
    salary: req.body.salary,
    approved: req.body.approved,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (!updatedPerson) {
      return res.status(404).json({
        error: 'Person not found',
      });
    }
    res.status(200).json(updatedPerson);
  } catch (error) {
    res.status(400).json({ error: 'Error updating person' });
  }
});

// delete - remocao de dados
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

  if (!person) {
    return res.status(404).json({
      error: 'Person not found',
    });
  }

  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json('Person deleted');
  } catch (error) {
    res.status(400).json({ error: 'Error deleting person' });
  }
});

module.exports = router;

import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import Joi from 'joi';
import * as planetsController from './controllers/planets';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

type Planet = {
  id: number;
  name: string;
};

let planets: Planet[] = [
  {
    id: 1,
    name: 'Earth'
  },
  {
    id: 2,
    name: 'Mars'
  }
];

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required()
});

app.get("/", (req, res) => {
  res.send("Welcome to the Planets API!");
});

app.get('/api/planets', (req, res) => {
  res.status(200).json(planets);
});

app.get('/api/planets', planetsController.getAll);

app.get('/api/planets/:id', planetsController.getOneById);

app.post('/api/planets', planetsController.create);

app.put('/api/planets/:id', planetsController.updateById);

app.delete('/api/planets/:id', planetsController.deleteById);

app.get('/api/planets/:id', (req, res) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) res.status(404).send('The planet with the given ID was not found.');
  res.send(planet);
});

app.post('/api/planets', (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const planet: Planet = {
    id: planets.length + 1,
    name: req.body.name
  };
  planets.push(planet);
  res.status(201).send('The planet was created.');
});

app.put('/api/planets/:id', (req, res) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send('The planet with the given ID was not found.');

  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  planet.name = req.body.name;
  res.status(200).send('The planet is updated.');
});

app.delete('/api/planets/:id', (req, res) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).send('The planet with the given ID was not found.');

  const index = planets.indexOf(planet);
  planets.splice(index, 1);

  res.status(200).send('The planet is deleted.');
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

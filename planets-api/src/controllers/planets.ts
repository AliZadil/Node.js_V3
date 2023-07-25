import { Request, Response } from 'express';
import { Planet, Planets } from '../server';

let planets: Planets = [
  {
    id: 1,
    name: 'Earth',
  },
  {
    id: 2,
    name: 'Mars',
  },
];

export const getAll = (req: Request, res: Response) => {
  res.status(200).json(planets);
};

export const getOneById = (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));

  if (planet) {
    res.status(200).json(planet);
  } else {
    res.status(404).json({ msg: `Planet with ID ${id} not found.` });
  }
};

export const create = (req: Request, res: Response) => {
  const { id, name } = req.body;
  const newPlanet: Planet = { id, name };
  planets = [...planets, newPlanet];

  res.status(201).json({ msg: 'Planet successfully created.' });
};

export const updateById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  res.status(200).json({ msg: 'Planet updated successfully.' });
};

export const deleteById = (req: Request, res: Response) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));

  res.status(200).json({ msg: 'Planet deleted successfully.' });
};

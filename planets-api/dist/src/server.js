"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const joi_1 = __importDefault(require("joi"));
const planetsController = __importStar(require("./controllers/planets"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
let planets = [
    {
        id: 1,
        name: 'Earth'
    },
    {
        id: 2,
        name: 'Mars'
    }
];
const planetSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    name: joi_1.default.string().required()
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
    if (!planet)
        res.status(404).send('The planet with the given ID was not found.');
    res.send(planet);
});
app.post('/api/planets', (req, res) => {
    const { error } = planetSchema.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const planet = {
        id: planets.length + 1,
        name: req.body.name
    };
    planets.push(planet);
    res.status(201).send('The planet was created.');
});
app.put('/api/planets/:id', (req, res) => {
    const planet = planets.find(p => p.id === parseInt(req.params.id));
    if (!planet)
        return res.status(404).send('The planet with the given ID was not found.');
    const { error } = planetSchema.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    planet.name = req.body.name;
    res.status(200).send('The planet is updated.');
});
app.delete('/api/planets/:id', (req, res) => {
    const planet = planets.find(p => p.id === parseInt(req.params.id));
    if (!planet)
        return res.status(404).send('The planet with the given ID was not found.');
    const index = planets.indexOf(planet);
    planets.splice(index, 1);
    res.status(200).send('The planet is deleted.');
});
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

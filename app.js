const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const { success, getUniqueId } = require("./helper");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 3000;

app
	.use(express.json())
	.use(favicon(__dirname + "/favicon.ico"))
	.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Hello Express!");
});

app.get("/api/pokemons/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const pokemon = pokemons.find((pokemon) => pokemon.id === id);
	const message = "Un pokémon a bien été trouvé.";
	res.json(success(message, pokemon));
});

app.get("/api/pokemons", (req, res) => {
	const message = "La liste de pokémons a bien été récupérée.";
	res.json(success(message, pokemons));
});

app.post("/api/pokemons", (req, res) => {
	const id = getUniqueId(pokemons);
	const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
	pokemons.push(pokemonCreated);
	const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`;
	res.json(success(message, pokemonCreated));
});

app.put("/api/pokemons/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const pokemonUptaded = { ...req.body, id: id };
	pokemons = pokemons.map((pokemon) => {
		return pokemon.id === id ? pokemonUptaded : pokemon;
	});
	const message = `Le pokémon ${pokemonUptaded.name} a bien été modifié.`;
	res.json(success(message, pokemonUptaded));
});

app.delete("/api/pokemons/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
	pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
	const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
	res.json(success(message, pokemonDeleted));
});

app.listen(port, console.log(`Notre application est démarée sur http://localhost:${port}`));

const express = require("express");
const { success } = require("./helper");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 3000;

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

app.listen(port, console.log(`Notre application est démarée sur http://localhost:${port}`));

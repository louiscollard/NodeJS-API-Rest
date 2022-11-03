const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = 3000;

app
	.use(express.json())
	.use(favicon(__dirname + "/favicon.ico"))
	.use(morgan("dev"));

sequelize.initDb();

require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);

app.use(({ res }) => {
	const message = "Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL.";
	res.status(404).json({ message });
});

app.listen(port, console.log(`Notre application est démarée sur http://localhost:${port}`));

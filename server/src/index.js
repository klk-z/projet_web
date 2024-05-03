const app = require("./app.js");
const port = process.env.PORT || 3000;

app.default.listen(port, () => {
  console.log(`Serveur actif sur le port ${port}`);
});


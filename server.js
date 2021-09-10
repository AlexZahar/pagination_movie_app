const express = require("express");
const app = express();
const port = 3000;

// exprress static options
// https://expressjs.com/en/4x/api.html#express.static
app.use(
  "/",
  express.static("build", {
    immutable: true,
    maxAge: 300000, // the assetes will be kep on the client 300 seconds
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

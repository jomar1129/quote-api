const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

// get random quote from

app.get("/api/quotes/random", async (req, res) => {
  const data = await getRandomElement(quotes);
  if (!data) {
    console.log("ERROR FOUND");
  }
  res.json({ quote: data });
});

// get all quotes
app.get("/api/quotes", async (req, res) => {
  const data = await quotes;
  if (req.query.person) {
    const found = data.filter((person) =>
      person.person.toLowerCase().includes(req.query.person.toLowerCase())
    );
    res.json({ quotes: found });
  } else {
    res.json({ quotes: data });
  }
});

// post api/quotes

app.post("/api/quotes", (req, res) => {
  if (!req.query.quote && !req.query.person) {
    res.status(400).send();
  } else {
    const person = req.query.person;
    const quote = req.query.quote;
    quotes.push({ person: person, quote: quote });
    res.send({ quote: { person: person, quote: quote } });
  }
});

//listen to port number

app.listen(PORT, () => console.log(`listening to port ${PORT}`));

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

morgan.token("data", (req, res) => JSON.stringify(req.body));

app.use(cors());
app.use(bodyParser.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

let persons = [
  {
    name: "Arto Hellas",
    id: 1,
    phone: "0806 625",
  },
  {
    name: "Ada Lovelace",
    phone: "39-44-5323523",
    id: 2,
  },
  {
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
    id: 4,
  },
  {
    name: "Mob",
    phone: "0904 412 358",
    date: "2020-01-30T09:36:40.160Z",
    id: 5,
  },
  {
    name: "Askeladd",
    phone: "0951",
    date: "2020-01-30T09:36:52.624Z",
    id: 6,
  },
  {
    name: "L",
    phone: "???",
    date: "2020-02-01T11:41:21.384Z",
    id: 7,
  },
];

app.get("/", (req, res) => {
  res.send(`<p>Hello world</p>`);
});

app.get("/api/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${
      persons.length
    } people.</p> <p>${new Date()}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);

  const nameArray = persons.map((person) => person.name);

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  } else if (!body.phone) {
    return response.status(400).json({
      error: "phone missing",
    });
  } else if (nameArray.indexOf(body.name) !== -1) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    phone: body.phone,
    id: Math.round(Math.random() * 100000),
  };

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

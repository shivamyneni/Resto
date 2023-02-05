const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.get('/', (req, res) => res.send('Hello world!'));
app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server running on port ${port}`));
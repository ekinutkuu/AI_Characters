const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const chatRoutes = require('./routes/chatRoutes');
const characterRoutes = require('./routes/characterRoutes');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send('Backend is running without any problems');
});

app.use("/chat", chatRoutes);
app.use("/character", characterRoutes);

const PORT = 5000;
app.listen(PORT, () => {
   console.log(`\nServer is running on: http://localhost:${PORT}`);
});

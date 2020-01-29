import express from 'express';
const port = 5000 | process.env.PORT;

const app = express();

app.listen(port, () => {
  console.log(`connected on port ${port}`);
});


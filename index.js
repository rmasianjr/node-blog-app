const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DATABASE)
  .catch(err => console.log(`Error: ${err.message}`));

const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

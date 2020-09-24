require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

//const restaurantController = require('./controllers/restaurants');

const { PORT, MONGODB_URI } = process.env;

const port = PORT || 3000;

//set up express
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//mongodb connection
mongoose.connect(
  MONGODB_URI || 'mongodb://localhost:27017/bd',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err !== null) {
      console.log('mongodb is not connected err:', err);
      return;
    }
    console.log('mongobb is  connected');
  }
);

// test routes
app.get('/', (req, res) => {
  res.send('Welcome to Restaurant  API');
});

// // Controllers (Routes) - START
// app.use('/restaurants', restaurantController);
// // Controllers - END

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

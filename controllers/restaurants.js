const express = require('express');
const router = express.Router();

const RestaurantModel = require('../models');

const createRestaurant = (req, res) => {
  console.log('POST /restaurants');
  const {
    name,
    address,
    city,
    country,
    stars,
    cuisine,
    priceCategory,
  } = req.body;

  const restaurant = new RestaurantModel({
    name,
    address,
    city,
    country,
    stars,
    cuisine,
    priceCategory,
  });

  restaurant.save((err, restaurant) => {
    if (err !== null) {
      res.json({
        success: false,
        message: err.toString(),
      });
      return;
    }

    res.json({
      success: true,
      data: restaurant,
    });
  });
};

const getRestaurant = (req, res) => {
  console.log('GET /restaurants/:id');
  const restaurantId = req.params.id;

  RestaurantModel.findById(restaurantId, (err, restaurant) => {
    if (err !== null) {
      res.json({
        success: false,
        message: err.toString(),
      });
      return;
    }

    res.json({
      success: true,
      data: restaurant,
    });
  });
};

const getRestaurants = (req, res) => {
  console.log('GET /restaurants');
  Restaurant.find({}, (err, restaurant) => {
    if (err !== null) {
      res.json({
        success: false,
        message: err.toString(),
      });
      return;
    }

    res.json({
      success: true,
      data: restaurant,
    });
  });
};

const updateRestaurant = (req, res) => {
  console.log('PUT /restaurants/:id');
  const restaurantId = req.params.id;
  const newName = req.query.name;

  RestaurantModel.updateOne(
    { _id: restaurantId },
    { name: newName },
    (err, status) => {
      console.log('err', err);
      console.log('status', status);

      if (err !== null) {
        res.json({
          success: false,
          message: err.toString(),
        });
        return;
      }

      res.json({
        success: true,
        data: `The restaurant ${restaurantId} has been is  updated`,
      });
    }
  );
};

const deleteRestaurant = (req, res) => {
  console.log('DELETE /restaurants/:id');
  const restaurantId = req.params.id;

  Restaurant.deleteOne({ _id: restaurantId }, (err, deletedObj) => {
    console.log('deleted:', deletedObj);
    if (err !== null) {
      res.json({
        success: false,
        message: err.toString(),
      });
      return;
    }

    res.json({
      success: true,
      data: {
        isDeleted: true,
      },
    });
  });
};

router.route('/').get(getRestaurant).post(createRestaurant);

router
  .route('/:id')
  .get(getRestaurant)
  .put(updateRestaurant)
  .delete(deleteRestaurant);

module.exports = router;

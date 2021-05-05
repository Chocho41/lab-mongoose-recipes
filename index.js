const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { model } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
   
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  const firstRecipe = {
    title: "pate au pesto",
     level: "Easy Peasy",
    "ingredients": [
    "pasta",
    "cheese",
  ],
  "cuisine": "Italian",
  "dishType": "main_course",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
  "duration": 20,
  "creator": "Chef Peperroni"
  ,};
  
  Recipe.create(firstRecipe)
  .then (recipe =>console.log("title", recipe))  
  .catch (error=> console.log("An error occurred, receipes are not imported", error));

  Recipe.insertMany(data)
  .then(recipe => console.log("All recipes are imported", recipe))
  .catch(error=> console.log("An error occurred, receipes are not imported", error));

  Recipe.findByIdAndUpdate('6092aecf46f650060068fa48')
    .then(recipe => {recipe.duration = 100;
      return recipe.save();
    })
    .catch(error => console.log ("Recipe has not been updated", error));
let meal;
//send get request to server for a meal
fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=garlic_powder')
  //parse the network response from JSON
  .then((res) => res.json())
  //then use the created object

  .then((listOfMeals) => {
    //choose a random array item number(done on a separate line for readability)
    let randomItemNumber = Math.floor(Math.random() * listOfMeals.meals.length);
    //log the .strMeal (name) of the meal
    console.log(listOfMeals.meals[randomItemNumber].strMeal);
  });
//note we have to write a function that randomises the chosen meal

let meal;
//send get request to server for a meal
fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=garlic_powder')
  //parse the network response from JSON
  .then((res) => res.json())
  //then use the created object
  .then((listOfMeals) => console.log(listOfMeals.meals[0]));
//note we have to write a function that randomises the chosen meal

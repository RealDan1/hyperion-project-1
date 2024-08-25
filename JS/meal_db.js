//create the meal class - my task reviewer said I should start getting used to using classes and experiment with them:
class Meal {
  constructor(description, orderNumber, completionStatus) {
    this.description = description;
    this.orderNumber = orderNumber;
    this.completionStatus = completionStatus;
  }

  print() {
    console.log(`this meal is ${this.description}`);
  }
}
//send get request to server for a meal
fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=garlic_powder')
  //parse the network response from JSON
  .then((res) => res.json())

  .then((listOfMeals) => {
    //choose a random array item number(done on a separate line for readability)
    let randomItemNumber = Math.floor(Math.random() * listOfMeals.meals.length);
    //log the .strMeal (name) of the meal
    // console.log(listOfMeals.meals[randomItemNumber].strMeal);
    //set this item as the order and then initiate the order

    let order1 = new Meal(
      listOfMeals.meals[randomItemNumber].strMeal,
      1,
      false
    );
    order1.print();

    // sessionStorage.setItem("");
  });

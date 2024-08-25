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
fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=avocado')
  //parse the network response from JSON
  .then((res) => res.json())

  .then((listOfMeals) => {
    //choose a random array item number(i.e. choose a random meal). Done on a separate line for readability.
    let randomItemNumber = Math.floor(Math.random() * listOfMeals.meals.length);

    //set this item as the order and then initiate the order

    //create a new Meal instance with the selected item and print it.
    let order1 = new Meal(
      listOfMeals.meals[randomItemNumber].strMeal,
      1,
      false
    );
    order1.print();

    // sessionStorage.setItem("");

    //WRITE A CASE FOR IF THE RETURNED OBJECT IS NULL INCASE WE TYPE IN THE WRONG NAME
  });

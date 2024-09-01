//create the Order class - my task reviewer said I should start getting used to using classes and experiment with them:
class Order {
  constructor(description, orderNumber, completionStatus) {
    this.description = description;
    this.orderNumber = orderNumber;
    this.completionStatus = completionStatus;
  }
}

let allorders;
//send get request to server for a meal
fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=beef')
  //parse the network response from JSON
  .then((res) => res.json())

  .then((listOfMeals) => {
    //choose a random array item number(i.e. choose a random meal). Done on a separate line for readability.
    let randomItemNumber = Math.floor(Math.random() * listOfMeals.meals.length);

    let mealForThisRound = new Order(
      listOfMeals.meals[randomItemNumber].strMeal,
      1,
      false
    );
    console.log('meal for this round is:');
    console.log(mealForThisRound.description);

    //set this item as the order and then initiate the order
    //=====================================================

    // DELETE THIS: Comment all sections of code neatly from now on.

    //create an allOrders array to store all orders - the length of this array will also be used to determine how many times the page has been refreshed which will be useful later.
    let allOrders = [];

    //create a new Order instance with the selected item and push it to the array.

    if (sessionStorage.getItem(`allOrders`)) {
      let retrievedOrders = JSON.parse(sessionStorage.getItem(`allOrders`));
      retrievedOrders.push(mealForThisRound);
      console.log(
        'i just added an order to the previously existing array - this should accumulate something now'
      );
      console.log(retrievedOrders);
      sessionStorage.setItem(`allOrders`, JSON.stringify(retrievedOrders));
    } else {
      allOrders.push(mealForThisRound);
      sessionStorage.setItem(`allOrders`, JSON.stringify(allOrders));
      console.log(
        'i just added the new order to allorders array and then stored it for the first time in session storage. the array contains:'
      );
      console.log(allOrders);
    }
  });

//WRITE A CASE FOR IF THE RETURNED OBJECT IS NULL INCASE WE TYPE IN THE WRONG NAME

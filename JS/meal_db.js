//create the Order class - my task reviewer said I should start getting used to using classes and experiment with them:
class Order {
  constructor(description, orderNumber, completionStatus) {
    this.description = description;
    this.orderNumber = orderNumber;
    this.completionStatus = completionStatus;
  }
}
//DELETE: PLACE ALL THIS INTO A FUNCTION, arg(mainIngredient) - returns meal for this round OR finishes the code up to adding to session storage. Perhaps we should make this a seperate function - this should run the core process of creating a new order and adding it. from there UI should dictate how we move the program around

//send get request to server for a meal
function getMeal(mainIngredient) {
  //DELETE - still need to make this mainIngredient only take LOWERCASE AND WITH UNDERSCORE IN SPACES
  //DELETE ALSO - write a case for if the returned API object is "null" in which case a seemingly valid name was entered but they dont have it in the DBase
  fetch(
    'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + mainIngredient
  )
    //parse the network response from JSON
    .then((res) => res.json())

    //run main function code
    .then((listOfMeals) => {
      //choose a random array item number(i.e. choose a random meal). Done on a separate line for readability.
      let randomItemNumber = Math.floor(
        Math.random() * listOfMeals.meals.length
      );

      //create the newly generated meal so we can use it later
      let meal = new Order(
        listOfMeals.meals[randomItemNumber].strMeal,
        1,
        false
      );
      //DELETE - log the meal to console for testing
      console.log('initiated API call to get meal, the meal is:');
      console.log(meal);
      //return the newly created meal object for further processing
      return meal;
    });
}

//initiate the function chain - NOTE: getMeal() contains promises so has to be followed by .then
getMeal('beef').then();

//function to set an item as the order and then initiate the order
//=====================================================

//create an allOrders array to store all orders - the length of this array will also be used to determine how many times the page has been refreshed which will be useful later.
let allOrders = [];

//create a new Order instance with the selected item and push it to the array.

if (sessionStorage.getItem(`allOrders`)) {
  let ssAllOrders = JSON.parse(sessionStorage.getItem(`allOrders`));
  ssAllOrders.push(mealForThisRound);
  ssAllOrders[ssAllOrders.length + 1].orderNumber = ssAllOrders.length + 1;
  console.log(
    'i just added an order to the previously existing array - this should accumulate something now'
  );
  console.log(ssAllOrders);
  sessionStorage.setItem(`allOrders`, JSON.stringify(ssAllOrders));
} else {
  allOrders.push(mealForThisRound);
  sessionStorage.setItem(`allOrders`, JSON.stringify(allOrders));
  console.log(
    'i just added the new order to allOrders array and then stored it for the first time in session storage. the array contains:'
  );
  console.log(allOrders);
}

//WRITE A CASE FOR IF THE RETURNED OBJECT IS NULL INCASE WE TYPE IN THE WRONG NAME

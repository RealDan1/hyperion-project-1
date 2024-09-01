// Define Order class with properties for description, order number, and completion status - my task reviewer said I should start getting used to using classes and experiment with them:
class Order {
  constructor(description, orderNumber, completionStatus) {
    this.description = description;
    this.orderNumber = orderNumber;
    this.completionStatus = completionStatus;
  }
}

// DELETE: PLACE ALL THIS INTO A FUNCTION, arg(mainIngredient) - returns meal for this round OR finishes the code up to adding to session storage. Perhaps we should make this a seperate function - this should run the core process of creating a new order and adding it. from there UI should dictate how we move the program around

// create a function to send a get request to the server for a meal using user input(prompt) as the mainIngredient
function getMeal() {
  //DELETE - still need to make this mainIngredient only take LOWERCASE AND WITH UNDERSCORE IN SPACES

  // DELETE ALSO - write a case for if the returned API object is "null" in which case a seemingly valid name was entered but they dont have it in the DBase

  let mainIngredient = prompt(
    'please enter your (single) main ingredient of choice seperated by only spaces if its multiple words:'
  );
  fetch(
    'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + mainIngredient
  )
    // Parse the network response from JSON
    .then((res) => res.json())

    // Run main function code
    .then((listOfMeals) => {
      // Choose a random array item number(i.e. choose a random meal). Done on a separate line for readability.
      let randomItemNumber = Math.floor(
        Math.random() * listOfMeals.meals.length
      );

      // Create the newly generated meal so we can use it later
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

function setOrder(meal) {
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
    allOrders.push(meal);
    sessionStorage.setItem(`allOrders`, JSON.stringify(allOrders));
    console.log(
      'i just added the new order to allOrders array and then stored it for the first time in session storage. the array contains:'
    );
    console.log(allOrders);
  }
}

// Initiate the function chain

//NOTE: getMeal() contains promises so has to be followed by .then
getMeal()
  //
  .then((meal) => setOrder(mealForThisRound));

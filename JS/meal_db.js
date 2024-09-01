// Define Order class with properties for description, order number, and completion status
// =====================================================
// (My task reviewer said I should start getting used to using classes and experiment with them)
class Order {
  constructor(description, orderNumber, completionStatus) {
    this.description = description;
    this.orderNumber = orderNumber;
    this.completionStatus = completionStatus;
  }
}

// DELETE: PLACE ALL THIS INTO A FUNCTION, arg(mainIngredient) - returns meal for this round OR finishes the code up to adding to session storage. Perhaps we should make this a seperate function - this should run the core process of creating a new order and adding it. from there UI should dictate how we move the program around

// Create a function to send a get request to the server for a meal using user input(prompt) as the mainIngredient
// =====================================================
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
      // Return the newly created meal object for further processing
      return meal;
    });
}

// Function to set an item as the order and then initiate the order
// =====================================================
function setOrder(meal) {
  // Create an allOrders array to store all orders as an array of Meal objects.
  let allOrders = [];

  // Create a new Order instance with the selected item and add it to sessionStorage

  // If we already have orders in session storage: overwrite the existing one
  if (sessionStorage.getItem(`allOrders`)) {
    // retrieve the allOrders array (Use prefix "ss" and save the retrieved data as a new variable)
    let ssAllOrders = JSON.parse(sessionStorage.getItem(`allOrders`));
    // Add the meal to the retrieved array
    ssAllOrders.push(meal);
    // Create a unique order number and add it to the orderNumber value within the object. The number will be generated from the length of the ssAllOrders array +1
    // POTENTIAL BUG - order number in array could be wrong it may be one too high
    ssAllOrders[ssAllOrders.length + 1].orderNumber = ssAllOrders.length + 1;
    // Console.log the order for testing
    console.log('Overwriting the array now, the new array is:');
    console.log(ssAllOrders);
    // overwrite the previous sessionstorage allOrders array with the latest array
    sessionStorage.setItem(`allOrders`, JSON.stringify(ssAllOrders));
    //set the last ordernumber as the latest order in session storage (overwrite any previous value)
    //POTENTIAL BUG: orderNumber in sessionStorage could be the wrong number
    let currentOrder = ssAllOrders.length + 1;
    sessionStorage.setItem(`currentOrder`, JSON.stringify(currentOrder));
  } else {
    // Else add the meal to the first place in the array:
    allOrders.push(meal);
    // and save the array to sessionStorage for the first time:
    sessionStorage.setItem(`allOrders`, JSON.stringify(allOrders));
    console.log(
      'Added the first new order to allOrders array and stored it for the first time. The array contains:'
    );
    console.log(allOrders);
  }
}

// Initiate the function chain

//NOTE: getMeal() contains promises so has to be followed by .then
getMeal()
  //
  .then((meal) => setOrder(mealForThisRound));

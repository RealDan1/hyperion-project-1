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

// Create a function to send a get request to the API for a meal using prompt() as the mainIngredient
// =====================================================
async function getMeal() {
  //DELETE STORE THE LAST ORDER NUMBER

  try {
    // prompt the user for a main ingredient
    let mainIngredient = prompt(
      'please enter your (single) main ingredient of choice seperated by only spaces if its multiple words:'
    );

    // Lowercase the returned string
    mainIngredient = mainIngredient.toLowerCase();
    // Replace spaces with underscores
    mainIngredient = mainIngredient.replace(/ /g, '_');
    // Do the api call with the resulting string
    let apiResult = await fetch(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + mainIngredient
    );

    // Parse the network response from JSON
    let listOfMeals = await apiResult.json();
    //if the result from the api is null - the ingredient doesnt exist
    if (listOfMeals.meals === null) {
      alert(
        'The ingredient does not seem to exist on the server - please try again with a valid ingredient'
      );
      //RECURSION: use recursion to start the whole process again (call the main() function chain in this case - not this(getMeal()) function since that will lead to a dead end in the UI flow)
      main();
    } else {
      // Else continue adding the meal to orders
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
    }
  } catch (error) {
    //catch any error and log it
    console.error(error);
  }
}

// Create function to set an item as the order and then initiate the order
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
    // Create a unique order number: The number will be generated from the length of the ssAllOrders array +1
    let currentOrder = ssAllOrders.length;
    // and then add it to the orderNumber field within the object.
    ssAllOrders[ssAllOrders.length - 1].orderNumber = currentOrder;
    // Console.log the order for testing
    console.log(
      'Overwriting the array now with a NEWLY ADDED item, the new array is:'
    );
    console.log(ssAllOrders);
    // overwrite the previous sessionstorage allOrders array with the latest array
    sessionStorage.setItem(`allOrders`, JSON.stringify(ssAllOrders));
    //set the last ordernumber as the latest order in session storage (overwrite any previous value)
    //POTENTIAL BUG: orderNumber in sessionStorage could be the wrong number

    sessionStorage.setItem(`currentOrder`, JSON.stringify(currentOrder));
    //console.log currentOrderBumber
  } else {
    // Else add the meal to the first place in the array:

    allOrders.push(meal);
    // and save the array to sessionStorage for the first time:
    sessionStorage.setItem(`allOrders`, JSON.stringify(allOrders));
    // Console.log the array for testing
    console.log(
      'Added the first new order to allOrders array and stored it for the first time. The array contains:'
    );
    console.log(allOrders);
  }
}

// Create the confirm meal as complete or incomplete function
function completeMeals() {
  //pull the sessionStorage array of all orders - prefix is ss
  let ssAllOrders = JSON.parse(sessionStorage.getItem('allOrders'));
  //filter the incomplete orders only and add them to a new array
  let incompleteOrders = ssAllOrders.filter((order) => !order.completionStatus);
  //to display the orders: create a string of each element and add each string to a new array (with .map())
  let displayIncompleteOrders = incompleteOrders.map(
    (order) => `Order no: ${order.orderNumber} - Name: ${order.description}`
  );
  //join the array into a single string with each array item on a new line
  displayIncompleteOrders = displayIncompleteOrders.join('\n');
  //ask user to choose an incomplete order to mark as complete
  let orderToComplete = Number(
    prompt(
      'please choose an order number to mark as complete, or alternatively enter zero to not mark anything complete. The currently incomplete orders are:\n' +
        displayIncompleteOrders
    )
  );
  //DELETE console.log the answer for testing
  console.log('the order you want to complete is now:');
  console.log(orderToComplete);
  //if the user chooses to not complete an order: give the choice of either redisplaying incomplete orders OR starting the program again
  if (orderToComplete === 0) {
    let answer = Number(
      prompt(
        'You chose to not mark anything as complete, enter 1 if you would like to add a new order or 2 to see the list of incomplete orders again'
      )
    );
    //if answer is 1 start the program again
    if (answer === 1) {
      //RECURSION: call the main function and start the entire program from scratch (with the current items still in storage)
      main();
    } else if (answer === 2) {
      //RECURSION: call the completeMeals() function again, to just display incomplete meals
      completeMeals();
    } else {
      //error check the answer - the user didnt enter correctly - start again
      alert('you didnt enter 1 or 2 please refresh the page and try again');
    }
    //if the user chose to mark an order as complete:
  } else {
    //select the orderArrayItem and mark it as complete(true)
    ssAllOrders[orderToComplete - 1].completionStatus = true;
    //DELETE: display the new array of objects in console for testing
    console.log(
      'Overwriting the array now with a MODIFIED COMPLETIONSTATUS item, the new array is:'
    );
    console.log(JSON.stringify(ssAllOrders));
    //store the modified ssAllOrders array in sessionStorage
    sessionStorage.setItem(`allOrders`, JSON.stringify(ssAllOrders));
  }
}

// Write the main function chain
// =====================================================
//async function to wait for the API return;
async function main() {
  try {
    // Call getMeal() to ask the user for an ingredient and return a chosen dish from the API
    let meal = await getMeal();
    setOrder(meal);
    // Then display the current meals - next part of activity
    completeMeals();
    //tell the user the program will now restart
    alert(
      'you have successfully run the program, the program will now restart for the next order'
    );
    //RECURSION: start the program over again (call the main() function) - and choose a new order
    //(saves the user the trouble of having to press refresh to start the process again)
    main();
  } catch (error) {
    console.error(error);
  }
}

// Initiate the main function chain
// =====================================================
main();

//BUG: function still stores null as order item into array

//create the Order class - my task reviewer said I should start getting used to using classes and experiment with them:
class Order {
  constructor(description, orderNumber, completionStatus) {
    this.description = description;
    this.orderNumber = orderNumber;
    this.completionStatus = completionStatus;
  }

  //DELETE THIS
  print() {
    console.log(`this meal is ${this.description}`);
  }
}
//send get request to server for a meal
fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=beef')
  //parse the network response from JSON
  .then((res) => res.json())

  .then((listOfMeals) => {
    //choose a random array item number(i.e. choose a random meal). Done on a separate line for readability.
    let randomItemNumber = Math.floor(Math.random() * listOfMeals.meals.length);

    //set this item as the order and then initiate the order
    //=====================================================

    //create an allOrders array to store all orders - the length of this array will also be used to determine how many times the page has been refreshed which will be useful later.
    let allOrders = [];

    //create a new Order instance with the selected item and push it to the array.
    allOrders.push(
      new Order(listOfMeals.meals[randomItemNumber].strMeal, 1, false)
    );
    console.log('this is just a test to show the array initialised:');
    console.log(allOrders);

    sessionStorage.setItem(`allOrders`, JSON.stringify(allOrders));
    console.log("retrieved:")
    console.log(JSON.parse(sessionStorage.getItem(`allOrders`)));

    //SESSION STORAGE SECTION BUG: ITS NOW REFERENCING THE SAME MEAL BUT GENERATING NEW ONES UP TOP
    //if the ordernumber exists in sessionstorage??(dno if this is correct since there is no way to reference order numbers yet) then we just need to retrieve it from storage.

    //refreshing the page will generate a new order number
    //RETRIEVE allOrders before setting might cause a bug - but it will always set first
    // if i understand this correctly - its gna push once to sessionSt and then never set again.
    //then dont do an if?
    // if (sessionStorage.getItem(`allOrders`)) {
    //   // DELETE fill this - soemthing like get it again?
    //   let retrievedOrder = sessionStorage.getItem(`allOrders`);
    //   console.log('this is the retrieved orders, now as an array of objects:');
    //   console.log(retrievedOrder);
    // } else {
    //   //otherwise the order does not exist yet inside session storage so we need to save it into storage
    //   sessionStorage.setItem(`allOrders`, JSON.stringify(allOrders));
    //   console.log(
    //     'this is still the old array, nothin exists yet only one object should be in here:\n' +
    //       allOrders
    //   );
    }

    //do if statement to check for stored item, THEN follow up

    let returnedMeal = JSON.parse(
      sessionStorage.getItem(`meal${order.orderNumber}`)
    );
    console.log(`this is the returned ${returnedMeal.description}`);

    //WRITE A CASE FOR IF THE RETURNED OBJECT IS NULL INCASE WE TYPE IN THE WRONG NAME
  });

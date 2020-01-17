//  Iffy -  Immediately invoked function or expression
// returns and object containing all of the functions e want public




/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//BUDGET CONTROLLER
// Keeps track of all the income and expenses and the budget itself
// And also the percentages
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
var budgetController = (function(){
    // Creating a Function Constructor
    class Expense {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    };

    class Income {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    };

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
            /*
            0
            [200, 400, 100]
            sum = 0 + 200
            sum = 200 + 400
            sum = 600 + 100 = 700
             */
        });
        // Setting the data variable to to sum that we just calculated
        data.totals[type] = sum
    };


    // var allExpenses = [];
    // var allIncomes = [];
    // var totalExpenses = 0;

    var data = {
        allItems:{
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1, // setting it to -1 initially to say that nothing is exist at the moment.
    };

    // Public Method - To allow other modules to add new item into data structure
    return {
        addItem: function(type, des, val){
            var newItem, ID;

            // Create new ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on "inc" or "exp" type
            if (type === "exp"){
                newItem = new Expense (ID, des, val);
            }
            else if (type === "inc"){
                newItem = new Income (ID, des, val);
            }

            // Pushes new item into the proper array depending on the type
            data.allItems[type].push(newItem)

            // return the new elements
            return newItem;
              
            },
            calculateBudget: function(){
                // calculate total income and expence.
                calculateTotal('exp');
                calculateTotal('inc');

                // calculate the Budget income - expenses
                data.budget = data.totals.inc - data.totals.exp; // This retrieves the values from the data structure and calculates one minus the other then stores it into our datat structure in the budget property (data.budget)
                
                // calculate the percentage of income that we spent
               // we can not divid a number by 0 so we only want to run this when the total income is greater than 0
                if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
                //  Expense = 100 and income 300, spent 33.333% = 100/300 = 0.333 * 100

               }else{
                   // otherwise reset the percentage to -1 which represents non existence.
                   data.percentage = -1;

               }
  
            },

            getBudget: function(){
                // need to return the budget

                return {
                    // This is returning the newly updated data structure
                    budget: data.budget,
                    totalInc: data.totals.inc,
                    totalExp: data.totals.exp,
                    percentage: data.percentage

                }

            },


        // Used this to see whether budget controller had acess to the data
        testing: function() {
            console.log(data);
        }
    };


})();

// UI CONTROLLER 
var UIController = (function(){
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    }

// Modules return functions as objects
    return{
        getInput: function(){
            // Adding an nest object in order to return several properties at once
            return {
                 type : document.querySelector(DOMstrings.inputType).value, // will be inc or exp
                 description : document.querySelector(DOMstrings.inputDescription).value,
                 value : parseFloat(document.querySelector(DOMstrings.inputValue).value),
            };
        },

        addListItem: function(obj, type){
            var html, newHtml, element;

            // Create HTML String w/ Placeholder text
            if (type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }
            else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insery the HTML into the DOM

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


        },

        clearFields: function() {
            var fields, fieldsArr ; 

            // The querySelectAll returns a list. 
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            // because we are recieving a list we will use this trick to get the results as an array
            fieldsArr = Array.prototype.slice.call(fields);

            // Loop over the array
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function(obj){
            // See the budget update on the user interface
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
        
            if (obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }else{
                document.querySelector(DOMstrings.percentageLabel).textContent = "---";

            }
        
        },

        getDOMstrings: function(){
            // Basically exposing DOMstrings to the public
            return DOMstrings;
        }

    };



})();



/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// GLOBAL APP CONTROLLER - control center of the app
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };


// Update the Budget 

var updateBudget = function(){
    // [x] calculate the budget
    budgetCtrl.calculateBudget();
    // [x] return the budget
    var budget = budgetCtrl.getBudget();
    // [x] display the budget on the UI
    UICtrl.displayBudget(budget);
}




    var ctrlAddItem = function (){
        var input, newItem;
        // [x] get the field input 
        input = UICtrl.getInput();
        

        if (input.description !== "" && !isNaN(input.value) && input.value > 0 ){
            // [x] add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value ); // We are getting the type, deescription and value from the UICtrl,getInput above
            // [x] Add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            // [x] Clear the fieds
            UICtrl.clearFields();

            // [x] Calculate and update the Budget
            updateBudget();

        }
    
       
        console.log("This is currrently working! ")
    };

    return {
        init: function (){
            console.log("Application has started.");
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }

// Bringing in the 2 seperate modules
})(budgetController, UIController);

// initializing the setupEventListeners that exist inside of the Global App Controller
controller.init();

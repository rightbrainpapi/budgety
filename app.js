// add event handler
// get input values
// add the new item to our data structure
// add the new item to the UI
// add the new item to the UI
// calculate the new budget
// Update the UI


//  Iffy -  Immediately invoked function or expression
// returns and object containing all of the functions e want public

//BUDGET CONTROLLER 
var budgetController = (function(){
// some code

})();

// UI CONTROLLER 
var UIController = (function(){
//  Some code 

var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: '.add__btn'


}

// Modules return functions as objects
    return{
        getInput: function(){
            // Adding an nest object in order to return several properties at once
            return {
                 type : document.querySelector(DOMstrings.inputType).value, // will be inc or exp
                 description : document.querySelector(DOMstrings.inputDescription).value,
                 value : document.querySelector(DOMstrings.inputValue).value,
            };
        },
        getDOMstrings: function(){
            // Basically exposing DOMstrings to the public
            return DOMstrings;
        }

    };



})();





// GLOBAL APP CONTROLLER
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

    var ctrlAddItem = function (){
        // [x] get the field input 
        var input = UICtrl.getInput();
        console.log(input);
        // [] add the item to the budget controller
        // [] Add the item to the UI
        // [] calculate the budget
        // [] display the budget on the UI
        console.log("This is currrently working! ")
    };

    return {
        init: function (){
            console.log("Application has started.");
            setupEventListeners();
        }
    }

// Bringing in the 2 seperate modules
})(budgetController, UIController);

// initializing the setupEventListeners that exist inside of the Global App Controller
controller.init();

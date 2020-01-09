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
//  Some 


})();





// GOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){



    var ctrlAddItem = function (){
        // [] get the field input 
        // [] add the item to the budget controller
        // [] Add the item to the UI
        // [] calculate the budget
        // [] display the budget on the UI
        console.log("This is currrently working! ")
    }
    document.querySelector('.add__btn').addEventListener("click", ctrlAddItem);


    document.addEventListener('keypress', function(event){
        if (event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    })

})(budgetController, UIController);

// add event handler
// get input values
// add the new item to our data structure
// add the new item to the UI
// add the new item to the UI
// calculate the new budget
// Update the UI


//  Iffy -  Immediately invoked function or expression
// returns and object containing all of the functions e want public
var budgetController = (function(){

var x = 23;

var add = function(a){
    return x + a;
}

return {
    publicTest: function(b){
        return add(b);
    }
}
})();


var UIController = (function(){
//  Some Code
})();

var controller = (function(budgetCtrl, UICtrl){
    var z = budgetCtrl.publicTest(5);

    return{
        anotherPublic: function(){
            console.log(z)

        }
    }
})(budgetController, UIController);

// we write an anonymous function that builds and returns an object
// that encapsulates what we want to publish
var toDoList;
toDoList = (function () {

    // private members: an array of courses and a string of the HTML to display
    var ToDoCompleteList = [];
    var ToDoUnCompleteList = [];
    var ToDoList = [];
    var toDoObj = {};


    // sample private method
    function checkValid(task) {
        task = task.trim()
        if (task == '' || ToDoUnCompleteList.lastIndexOf(task) != -1)
            return false;
        return true;
    }

    //function to check if the input is uncorrected  - public method
    function getError(task) {
        task = task.trim()
        if (task == '')
            return 'Please Enter a non-empty Task'
        else
            return 'This Task Already Exists! Please Enter Different Task'
    }


    // add more public method ti build the uncompleted tasks
    toDoObj.buildHTMLToDoList = function (task) {

        ToDoUnCompleteList.push(task);
        var btn = document.createElement('button');
        btn.style = "width:60%; height: auto; text-align:center; moz-border-radius: 6px ;" +
            " webkit-border-radius: 6px; background-color:#f0f7fb; border:solid 1px #3498db;border-radius: 6px; font-size: 27px;" +
            "  margin: 5px; cursor: pointer"
        btn.innerHTML = task;
        btn.addEventListener('click', event => {
            var inerTxt = btn.innerHTML;
            btn.parentNode.removeChild(btn);
            toDoList.MarkAsCompleted(inerTxt);
        });
        document.getElementById("unCompletedList").appendChild(btn);

    };


    //function to mark the task as completed  - public method
    toDoObj.MarkAsCompleted = function (task) {

        var txt = document.createElement('text');
        txt.style = "width:70%; height: 21%; moz-border-radius: 6px ; webkit-border-radius: 6px;" +
            " background-color:#f7fbf0; border:solid 1px #1ABC9C; font-size: 27px;" +
            "border-radius: 6px; display: inline-block;margin: 5px"

        var index = ToDoUnCompleteList.indexOf(task);
        ToDoUnCompleteList.splice(index, 1);
        txt.innerHTML = task;
        document.getElementById("completedList").appendChild(txt);


    }

    //function to show the completed tasks' list  - public method
    toDoObj.showCompletList = function () {
        document.getElementById("backBtn").style.display = 'block';
        document.getElementById("completedList").style.display = 'block';
    }

    //function to add a new task for the uncompleted tasks' list  - public method
    toDoObj.AddListener = function (task) {
        task = task.trim()
        if (!checkValid(task))
            document.getElementById("error").innerHTML = getError(task)
        else {
            this.buildHTMLToDoList(task);
        }
    }

    // we return the object containing the 'public' functions
    return toDoObj;

})();
// end of definition and building of our namespace

// wait for the DOM before reaching elements
window.addEventListener('DOMContentLoaded', (event) => {

    //Listener for inputText
    document.getElementById("inputText").addEventListener('click', function () {
        document.getElementById("error").innerHTML = "";
    });

    //Listener for addBtn
    document.getElementById("addBtn").addEventListener('click', function () {
        document.getElementById("error").innerHTML = "";
        toDoList.AddListener(document.getElementById("inputText").value);
        document.getElementById("inputText").value = "";

    });

    //Listener for backBtn
    document.getElementById("backBtn").addEventListener('click', function () {
        document.getElementById("error").innerHTML = "";
        document.getElementById("mainContainer").style.display = 'block'
        document.getElementById("secondaryContainer").style.display = 'none'

    });

    //Listener for completedBtn
    document.getElementById("completedBtn").addEventListener('click', function () {
        document.getElementById("error").innerHTML = "";

        document.getElementById("secondaryContainer").style.display = 'block';
        document.getElementById("mainContainer").style.display = 'none';
        toDoList.showCompletList();

    });

});
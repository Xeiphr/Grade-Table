var arrays = {}; // creates empty object where it will hold arrays
//var array1 = [];
var r = 10; // variable to keep track of the row that keeps track of array to use for averaging
var id = 51; // id variable to assign id to each cell that contains assignments
var unsubmitted = 50; //unsubmitted assignments variable to track unsubmitted assignments
var unsubmittedelem = document.getElementById("unsubmitted");
var theTable = document.getElementById("theTable"); //the table so i can easily edit it
var avgarray = [] // array containing elementbyID of avg cells for easy editing
var statechange = {}; //keeps track if 

let gradetablecount = 0; //count that changes which grade table is displayed

var avgnumbers = [];
var avgnumberspercent = []; 
var avgother = [];

function AllFunctions(element,value,name,rownumberforarray,arraynumber) //function that takes all values needed for each function and calls them
{
    TextAlignRight(element, value,arraynumber); 
    createArray(arraynumber);
    createAvgElement(arraynumber);
    PutIntoArray(name,value,rownumberforarray,arraynumber);
}
function createAvgElement(arraynumber)//gets elementbyID for each avg cell for each row
{
    if(avgarray[arraynumber] != null) //if already created will do nothing
    {

    }
    else
    avgarray[arraynumber] = document.getElementById("average" + arraynumber); //creates it
}
function createArray(arraynumber) //creates an array for each row
{
    if(arrays['array' + arraynumber] != null) //if it contains something does nothing
    {

    }
    else
    arrays['array' + arraynumber] = []; //else creates the arraya
}
function TextAlignRight(element,value,arraynumber)
{
    if(value == "-") //if value == -
    {
        element.style.textAlign = "center"; //aligns text center
        element.style.backgroundColor = "yellow"; //changes background color to yellow
        if (!statechange[element.id])  //if state change == false at positionc corresponding to the id 
        {
            unsubmitted++; 
            statechange[element.id] = true; //changes state to true
        }
    }
    else if(isNaN(value) || value > 100|| value < 0) //if value entered is not a number, over 100 or under 0
    {
        alert("please re-enter a digit between 0 and 100 or - for empty"); //displays this to user
        element.value = "-"; //changes cell back to -
        element.style.backgroundColor = "yellow"; //resets background color to yellow
        element.style.textAlign = "center"; //centers the text
    }
    else
    {
        if(arraynumber == 0 || arraynumber % 2 == 0) // checks if even and sets to grey (since it starts at 0 it will be odd numbers set to grey instead)
        {
            element.style.backgroundColor = "grey";
        }
        else
        {
            element.style.backgroundColor = "white";
        }
        if (statechange[element.id] || statechange[element.id] == null)  // if state change == true or equals nothing
        {
            unsubmitted--; // take away an assignment as a value other than - has been placed in
            statechange[element.id] = false; // make statechange at position false
        }
        element.style.textAlign = "right"; //aligns text right
    }
    unsubmittedelem.innerHTML = unsubmitted + " unsubmitted assignments"; //displays new number of assignments that are unsubmitted.
}
function PutIntoArray(name, value, rownumberforarray,arraynumber) 
{
    {
        arrays['array' + arraynumber][rownumberforarray] = value; //row number for array is inserted from html and this makes the value the user entered go into the array at this positoin
        let count = 0; //count for what to divide by for averaging
        let sum = 0; //to plus up all the assignment cells for averaging

        for (let i = 0; i < arrays['array' + arraynumber].length; i++)  //calculates sum and count goes up for how many numbers in the array
        {
            if (!isNaN(arrays['array' + arraynumber][i]) && arrays['array' + arraynumber][i] !== null) //if not a number and not empty
            {
                sum += parseFloat(arrays['array' + arraynumber][i]); //plus whats in this position into sum and turns it into a decimal number
                count++;
            }
        }
        if (count !== 0) //if count went up
        {
            let average = sum / count; //gets average
            AvgCheck(arraynumber,average); // checks if average is above 60 and if not turns red
            avgarray[arraynumber].innerHTML = average.toFixed(0)+"%"; // displays average with 0 decimal places and adds % at the end
        } else //if count didnt go up (no averaging was done)
        {
            avgarray[arraynumber].innerHTML = ""; //puts nothing into the average if nothing is entered into assignment cells (all are -)
        }
    }
}
function AvgCheck(arraynumber,average)
{
    if(average < 60) //if average is under 60, red background white font colour
    {
        avgarray[arraynumber].style.color = "white";
        avgarray[arraynumber].style.backgroundColor = "red";
    }
    else if(average >= 60 && (arraynumber == 0 || arraynumber % 2 == 0)) //if average is above, odd numbers grey background
    {
        avgarray[arraynumber].style.color = "black";
        avgarray[arraynumber].style.backgroundColor = "grey";

    }
    else //if average is above, even numbers grey background
    {
        avgarray[arraynumber].style.color = "black";
        avgarray[arraynumber].style.backgroundColor = "white";
    }
}

function gradeChanger() //function to change grade
{
    var title = document.getElementById("avgname"); //gets element for the heading Average
    gradetablecount++; //pluses gradetablecount by 1
    if(gradetablecount == 1)
    {
        for(let i = 0; i<r;i++)
        {
            if(avgarray[i] == null) //if avg array at position equals nothing break loop to assure no problems
            break;
            avgnumberspercent[i] = avgarray[i].innerText; //stores the percent versions in an array for when switching back to percents
            avgnumbers[i] =avgnumberspercent[i].replace('%',''); //stores without the percent in avgnumbers
        }
        title.innerHTML = "Average (Letter)" //calls title Average Letter instead of %
        for(let i = 0; i<r; i++) //checks each position and swaps them to letter grade
        {
            if(avgarray[i] == null) //if check to avoid problems
            break;
            if(avgnumbers[i] >= 93 && avgnumbers[i] <= 100)
            {
                avgother[i] = "A";
            }
            if(avgnumbers[i] >= 90 && avgnumbers[i] <= 92)
            {
                avgother[i] = "A-";
            }
            if(avgnumbers[i] >= 87 && avgnumbers[i] <= 89)
            {
                avgother[i] = "B+";
            }
            if(avgnumbers[i] >= 83 && avgnumbers[i] <= 86)
            {
                avgother[i] = "B";
            }
            if(avgnumbers[i] >= 80 && avgnumbers[i] <= 82)
            {
                avgother[i] = "B-";
            }
            if(avgnumbers[i] >= 77 && avgnumbers[i] <= 79)
            {
                avgother[i] = "C+";
            }
            if(avgnumbers[i] >= 73 && avgnumbers[i] <= 76)
            {
                avgother[i] = "C";
            }
            if(avgnumbers[i] >= 70 && avgnumbers[i] <= 72)
            {
                avgother[i] = "C-";
            }
            if(avgnumbers[i] >= 67 && avgnumbers[i] <= 69)
            {
                avgother[i] = "D+";
            }
            if(avgnumbers[i] >= 63 && avgnumbers[i] <= 66)
            {
                avgother[i] = "D";
            }
            if(avgnumbers[i] >= 60 && avgnumbers[i] <= 62)
            {
                avgother[i] = "D-";
            }
            if(avgnumbers[i] < 60)
            {
                avgother[i] = "F";
            }
            avgarray[i].innerHTML = avgother[i];
        }
    }
    else if(gradetablecount == 2) //same thing but for 4.0 grade type
    {
        title.innerHTML = "Average (4.0)"
        for(let i = 0; i<r; i++)
        {
            if(avgarray[i] == null)
            break;
            if(avgother[i] == "A")
            {
                avgother[i] = "4.0";
            }
            if(avgother[i] == "A-")
            {
                avgother[i] = "3.7";
            }
            if(avgother[i] == "B+")
            {
                avgother[i] = "3.3";
            }
            if(avgother[i] == "B")
            {
                avgother[i] = "3.0";
            }
            if(avgother[i] == "B-")
            {
                avgother[i] = "2.7";
            }
            if(avgother[i] == "C+")
            {
                avgother[i] = "2.3";
            }
            if(avgother[i] == "C")
            {
                avgother[i] = "2.0";
            }
            if(avgother[i] == "C-")
            {
                avgother[i] = "1.7";
            }
            if(avgother[i] == "D+")
            {
                avgother[i] = "1.3";
            }
            if(avgother[i] == "D")
            {
                avgother[i] = "1.0";
            }
            if(avgother[i] == "D-")
            {
                avgother[i] = "0.7";
            }
            if(avgother[i] == "F")
            {
                avgother[i] = "0.0";
            }
            avgarray[i].innerHTML = avgother[i];
        }
    }
    else //using avgnumberspercent from earlier put all cells back to it again
    {
        title.innerHTML = "Average (%)"
        for(let i = 0; i<r; i++)
        {
            if(avgarray[i] == null)
            break;
            avgarray[i].innerHTML = avgnumberspercent[i];
        }
        gradetablecount = 0;
    }
}
function addRow() //adds a new row
{
    var newRow = document.createElement("tr"); //creates a tr

    let firstrow = theTable.rows[0]; //takes firstrow so can see how long it is
    let numCells = firstrow.cells.length; //gets length

    newRow.innerHTML = ` 
        <td>New Student</td>
        <td>New ID</td>
    `;
    //adds student name and student id cells
    for(let i = 0; i < numCells-3; i++) //num cells -3 as ignoring student name, id and average
    {
        unsubmitted++; //unsubmitted goes up for each assignment made
        newRow.innerHTML += ` 
        <td class="assignment"><input class="assignment" id = ${id} type="text" value="-" onchange="AllFunctions(this, this.value, this.name, ${i}, ${r})"></td>
        `; //creates a new td with the same format as in html. r is the row identifier, i is the cell number, id is unique id for each cell
        id++; //id counts up for the next td
    }
    unsubmittedelem.innerHTML = unsubmitted + " unsubmitted assignments"; 
    newRow.innerHTML += ` 
        <td id="average${r}"></td>
    `; //at the end creates an average cell for calculating average
    
    r++; //increment the row counter
    theTable.appendChild(newRow);
}
function addColumn() 
{
    let averageColumnIndex = -1; //will get the position of just before the average column so it knows where to put the column.
    const headerRow = theTable.rows[0]; //slots top row into headerRow
    for (let i = 0; i < headerRow.cells.length; i++) { //checks for where average column is
        if (headerRow.cells[i].id === "avgname") {
            averageColumnIndex = i; // equals the index to i
            break; //stops loop
        }
    }
    const newColumnIndex = averageColumnIndex;

    const newColumnHeader = document.createElement("th"); //creates a new th
    newColumnHeader.textContent = `Assignment ${newColumnIndex-1}`; //calls it assignment x 
    headerRow.insertBefore(newColumnHeader, headerRow.cells[averageColumnIndex]); //inserts the title before the average title on top row

    for (let i = 1; i < theTable.rows.length; i++) //adds new cell for each row
    {
        const newRow = theTable.rows[i];
        const newCell = document.createElement("td");
        newCell.className = "assignment";
        const input = document.createElement("input");
        input.className = "assignment";
        input.type = "text";
        input.name = "ok";
        input.value = "-";
        input.onchange = function() 
        {
            AllFunctions(this, this.value, this.name, newColumnIndex - 1, i - 1);
        };
        newCell.appendChild(input);
        newRow.insertBefore(newCell, newRow.cells[averageColumnIndex]);
    }
    unsubmitted += theTable.rows.length-1;
    unsubmittedelem.innerHTML = unsubmitted + " unsubmitted assignments";

}
//saving and loading doesnt work. couldnt find a great way to implement it using the coding method i did.
function saveCurrent() //doesnt seem to save input fields for some reason, also makes it so averaging doesnt work.
{
    var currentTable = document.getElementById("theTable").innerHTML;
    localStorage.setItem('currentTable',currentTable);
}
function loadState()
{
    var reload = localStorage.getItem('currentTable');
    document.getElementById("theTable").innerHTML = reload;
}


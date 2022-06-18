/*
	Author:		William Stoddart
	Date:		6/18/2022
	Purpose:	Dynamically generates the content of a calendar and changes it to next or prior month
				uses the calendar to open a php generated web page.
PHP file call location:	Line 28
*/

//Event Listener for the 'nextMonth' button element nextMonth() function on click which calls buildNewCalendar(newDate)
//repopulating the calendar element
document.getElementById('nextMonth').addEventListener('click', function() { nextMonth() });

//Event Listener populates the 'calendar' element with days of the month
// as well as populating the 'month' and 'year' elements with appropriate text
document.addEventListener('load', buildCalendar());

//Event Listener for any click events within the calendar element, 
//if the target ID is not empty opens "bookAppointment.php?date=(decision based on target ID)
document.getElementById('calendar').addEventListener('click', function(event) { if (event.target.id != "") openBookAppointment(event.target.id) });


//Repopulates the calendar element using the date passed in by nextMonth() or priorMonth()
function buildNewCalendar(newDate)
{
	//Variable declaration
	var dt = newDate;
	const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	var calendar = document.getElementById('calendar');
	var priorMonthDay = (daysInMonth[dt.getMonth() -1 ]-(dt.getDay()-1));
	
	//sets 'month' and 'year' elements text 
	document.getElementById('month').innerHTML = monthName[dt.getMonth()];
	document.getElementById('year').innerHTML = dt.getFullYear();
	
	//loops through the 'calendar' element setting cell text to the appropriate day
	for (let r = 1, day = 1; r <= 5; r++)
	{
		for (let c = 0; c < 7; c++)
		{
			while  (r == 1 && c < dt.getDay())
			{
				
				calendar.rows[r].cells[c].innerHTML = priorMonthDay;
				c++;
				priorMonthDay++;
			}
			
			if (day <= daysInMonth[dt.getMonth()])
			{
				calendar.rows[r].cells[c].innerHTML = (day);
				day++;
			}
			else
			{
				day = 1;
				calendar.rows[r].cells[c].innerHTML = (day);
				day++;
			}
		}
	}
}

//Used by a Click Listener attached to the calendar element which passes in Element ID of the cell clicked
// uses that information along with the 'month' and 'year' elements to open a new window with the URL
// 'bookAppointment.php?date=6-12-2022' the date is dynamically generated 6-12-2022 is an example
function openBookAppointment(tdElementId)
{
	//variable declaration
	var dt = new Date(Date.now());
	const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var day = parseInt(tdElementId);
	
	//sets the month, day, and year of dt based on the text of the <TD> element passed in, and the 'month' and 'year' elements
	dt.setMonth(monthName.indexOf(document.getElementById("month").innerHTML) + 1);
	dt.setDate(document.getElementById(tdElementId).innerHTML);
	dt.setFullYear(document.getElementById('year').innerHTML);
	
	//determines if the month and/or year need to change and changes them based on whether the the cell clicked is in the first
	//or last row and whether the text of the cell is greater than 20 or less than 10 respectively
	//year changes based on whether the month would increases past 12 or decrease below 1
	if (day < 7 && dt.getDate() > 20)
	{
		if (dt.getMonth() == 1)
		{
			dt.setMonth(12);
			dt.setFullYear(dt.getFullYear - 1);
		}
		else
			dt.setMonth(dt.getMonth - 1);
	}
	else if (day > 30 && dt.getDate() < 10)
	{
		if (dt.getMonth() == 12)
		{
			dt.setMonth(1);
			dt.setFullYear(dt.getFullYear() + 1);
		}
		else
			dt.setMonth(dt.getMonth() + 1);
	}
	
	//declares the urlString variable then uses that variable to open the new bookAppointment.php window
	var urlString = "bookAppointment.php?date=" + dt.getMonth() + "-" + dt.getDate() + "-" + dt.getFullYear();
	window.open(urlString, "BookAppointment", "height=250, width=350, resizable=no, toolbar=no, menubar=no, location=no");
}

// function called by an onLoad event listener populates the 'calendar' element on initial page load using the current
// date to set the 'calendar' element to the current month and year also sets the 'month' and 'year' elements
function buildCalendar()
{
	// variable declaration
	const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const daysInMonth = [31,28,31,30,31,30,31,31,30,31,31,30];
	var dt = new Date(Date.now());
	var calendar = document.getElementById('calendar');
	var priorMonthDay = (daysInMonth[dt.getMonth() - 1]-(dt.getDay()-1));
	
	// setting dt variable to 1 to start populating calendar from 1
	dt.setDate(1);
	
	//sets text for the 'month' and 'year' elements
	document.getElementById('month').innerHTML = monthName[dt.getMonth()];
	document.getElementById('year').innerHTML = dt.getFullYear();
	
	//loops through the calendar object setting the text of each cell
	for (let r = 1, day = 1; r <= 5; r++)
	{
		for (let c = 0; c < 7; c++)
		{
			while  (r == 1 && c < dt.getDay())
			{
				calendar.rows[r].cells[c].innerHTML = priorMonthDay;
				c++;
				priorMonthDay++;
			}
			if (day <= daysInMonth[dt.getMonth()])
			{	
				calendar.rows[r].cells[c].innerHTML = (day);
				day++;
			}
			else
			{
				day = 1;
				calendar.rows[r].cells[c].innerHTML = (day);
				day++;
			}
		}
	}	
}

//sets the date of the next month and submits to buildCalendar(newDate)
function nextMonth()
{
	var newDate = new Date(Date.now());
	newDate.setDate(1);
	newDate.setFullYear(document.getElementById("year").innerHTML);
	const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var month = document.getElementById("month").innerHTML;
	var currentMonth = monthName.indexOf(month);
	if (currentMonth != 11)
		newDate.setMonth(currentMonth + 1);
	else
	{
		newDate.setMonth(0);
		newDate.setFullYear(newDate.getFullYear() + 1);
	}
	buildNewCalendar(newDate);
}
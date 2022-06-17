/*
	This is the page that needs attention as far as I can tell, the other page uses a combination of php and html and the code that fires this javascript is contained in the "buildCalendar" function in "catsDogWalking.php"
*/

//This event listener fires on click but runs the openBookAppointment function
document.getElementById('nextMonth').addEventListener('click', function() {nextMonth()});
//This event listener fires but fires every onclick listener inside the build calendar function opening 35 popups on load
document.addEventListener('load', buildCalendar());


//rebuilds calendar after adjustments have been made to date ie. setting date to prior or next month
//This has 3 event listeners that are never fired
function buildCalendar(newDate)
{
	var dt = newDate;

	const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	document.getElementById('month').innerHTML = monthName[dt.getMonth()];
	document.getElementById('year').innerHTML = dt.getFullYear();
	var calendar = document.getElementById('calendar');
	var weekday = (daysInMonth[dt.getMonth() -1 ]-(dt.getDay()-1));
	for (let r = 1, day = 1; r <= 5; r++)
	{
		for (let c = 0; c < 7; c++)
		{
			while  (r == 1 && c < dt.getDay())
			{
				
				calendar.rows[r].cells[c].innerHTML = weekday;
//This should set the cell to open bookAppointment.php
				calendar.rows[r].cells[c].addEventListener('click', openBookAppointment(id));
				c++;
				weekday++;
			}
			
			if (day <= daysInMonth[dt.getMonth()])
			{
				calendar.rows[r].cells[c].innerHTML = (day);
//This should set the cell to open bookAppointment.php
				calendar.rows[r].cells[c].addEventListener('click', openBookAppointment(calendar.rows[r].cells[c].id));
				day++;
			}
			else
			{
				day = 1;
				calendar.rows[r].cells[c].innerHTML = (day);
//This should set the cell to open bookAppointment.php
				calendar.rows[r].cells[c].addEventListener('click', openBookAppointment(calendar.rows[r].cells[c].id));
				day++;
			}
		}
	}
}

// sets each cell of the calendar with a click listener that opens boookAppointment.php
function openBookAppointment(tdElementId)
{
	var dt = new Date(Date.now());
	const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	dt.setMonth(monthName.indexOf(document.getElementById("month").innerHTML) + 1);
	var day = tdElementId;
	dt.setDate(document.getElementById(tdElementId).innerHTML);
	dt.setFullYear(document.getElementById('year'));
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
	var urlString = "bookAppointment.php?date=" + dt.getMonth() + "-" + dt.getDate() + "-" + dt.getFullYear();
	window.open(urlString, "BookAppointment", "height=250, width=350, resizable=no, toolbar=no, menubar=no, location=no");
}

// fills the initial calendar table for the scheduling page
// This is the function called in the onload listener at the top of code
// contains 3 event listeners
function buildCalendar()
{
	const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const daysInMonth = [31,28,31,30,31,30,31,31,30,31,31,30];
	var dt = new Date(Date.now());
	dt.setDate(1);
	document.getElementById('month').innerHTML = monthName[dt.getMonth()];
	document.getElementById('year').innerHTML = dt.getFullYear();
	var calendar = document.getElementById('calendar');
	var weekday = (daysInMonth[dt.getMonth() - 1]-(dt.getDay()-1));

	for (let r = 1, day = 1; r <= 5; r++)
	{
		for (let c = 0; c < 7; c++)
		{
			while  (r == 1 && c < dt.getDay())
			{
				calendar.rows[r].cells[c].innerHTML = weekday;
//This event listener fires on load but doesn't create a click event in the cell I'm trying to target
				calendar.rows[r].cells[c].addEventListener('click', openBookAppointment(calendar.rows[r].cells[c].id));
				c++;
				weekday++;
			}
			if (day <= daysInMonth[dt.getMonth()])
			{	
				calendar.rows[r].cells[c].innerHTML = (day);
//This event listener fires on load but doesn't create a click event in the cell I'm trying to target
				calendar.rows[r].cells[c].addEventListener('click', openBookAppointment(calendar.rows[r].cells[c].id));
				day++;
			}
			else
			{
				day = 1;
				calendar.rows[r].cells[c].innerHTML = (day);
//This event listener fires on load but doesn't create a click event in the cell I'm trying to target
				calendar.rows[r].cells[c].addEventListener('click', openBookAppointment(calendar.rows[r].cells[c].id));
				day++;
			}
		}
	}
	
}

//sets the date of the next month and submits to buildCalendar(newDate)
//This is what the onclick listener at the top of page should fire
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
	buildCalendar(newDate);
}
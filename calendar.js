/*
	This is the page that needs attention as far as I can tell, the other page uses a combination of php and html and the code that fires this javascript is contained in the "buildCalendar" function in "catsDogWalking.php"
*/

//This event listener fires on click but runs the openBookAppointment function
document.getElementById('nextMonth').addEventListener('click', function() { nextMonth() });
//This event listener fires but fires every onclick listener inside the build calendar function opening 35 popups on load
document.addEventListener('load', buildCalendar());
//BSNote: You can't add the events onto the td's from a reference to the table like the table.row.cell 
//you would have needed to go and get the elements the whole getElementById for each one then add the event listener but below
//is a slightly cleaner way taking advantage of the builtin event target so when a click event happens it will tell you which element is clicked so by
//adding the event to the entire calender any click inside will trigger this then it will tell you where is clicked 
//(you may need to add some logic to do nothing if not a td is clicked currently clicking the header will trigger with an empty string for the id)
//also since the event is just attached to the calendar it's a little cleaner to just add this at the top instead of re-adding it each time the month 
//changes as it no longer matters
document.getElementById('calendar').addEventListener('click', function(event) { openBookAppointment(event.target.id) });


//rebuilds calendar after adjustments have been made to date ie. setting date to prior or next month
//This has 3 event listeners that are never fired
//BSNote: There is no function overloading in JS (stupid I agree) so it needed a unique name previously this method would never be called and it just recalled the bottom one
function buildNewCalendar(newDate)
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
				c++;
				weekday++;
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

// sets each cell of the calendar with a click listener that opens boookAppointment.php
function openBookAppointment(tdElementId)
{
	var dt = new Date(Date.now());
	const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	dt.setMonth(monthName.indexOf(document.getElementById("month").innerHTML) + 1);
	var day = tdElementId;
	dt.setDate(document.getElementById(tdElementId).innerHTML);
	dt.setFullYear(document.getElementById('year').innerHTML); //BSNote: missing the innerHTML so was causing the popup to fail
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
				c++;
				weekday++;
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
	buildNewCalendar(newDate);
}
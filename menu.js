/*
	Author:		William Stoddart
	Date:		6/18/2022
	Purpose:	Change the appearance of the navbar based on active page and mouse hover
	PHP file call location: Line 29
*/
/*
//sets mouseOver event listener that calls mouseOverClassChange
document.getElementById('menu').addEventListener('mouseover', function(event) { mouseOverClassChange(event.target); });

//sets mouseOut event listener that calls mouseOutClassChange
document.getElementById('menu').addEventListener('mouseout', function(event) { mouseOutClassChange(event.target); });

//sets page load event listener that sets the active link in the navbar and sets other links to ""
document.getElementById('menu').addEventListener('load', setActive());

//changes theclass of the target (menuItem) of the event listener to "hover"
function mouseOverClassChange(menuItem)
{
	if (menuItem.className != "active")
		menuItem.className = "hover";
}

//changes theclass of the target (menuItem) of the event listener to ""
function mouseOutClassChange(menuItem)
{
	if (menuItem.className != "active")
		menuItem.className = "";
}

//Loops through the links in the navbar and sets the class of the one with an href matching the current url to active
//setting all others to "", if url doesnt match an href sets Home Page link to active
function setActive()
{	
	pageURL = window.location.href.toLowerCase();
	if (pageURL.toLowerCase() != ("http://localhost/catsDogWalking.php").toLowerCase())
	{
		urlStart = "http://localhost/";
		for (var i = 1, elementID; i <= 5; i++)
		{
			elementID = ("menu" + i.toString());
			var urlEnd = document.getElementById(elementID).href.toString();
			urlEnd.replace("http://", "");
			var testURL = (urlStart.toLowerCase() + urlEnd.toLowerCase());
			if (testURL == pageURL.toLowerCase())
				document.getElementById(elementID).className = "active";
			else
				document.getElementById(elementID).className = "";
		}
	}
}
*/

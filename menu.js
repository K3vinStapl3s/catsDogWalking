// document.getElementById('menu').addEventListener('mouseover', function(event) { mouseOverColorChange(event.target); });
// document.getElementById('menu').addEventListener('mouseout', function(event) { mouseOutColorChange(event.target); });
// document.getElementById('menu').addEventListener('load', setActive());

// function mouseOverColorChange(menuItem)
// {
// 	if (menuItem.className != "active")
// 		menuItem.className = "hover";
// }

// function mouseOutColorChange(menuItem)
// {
// 	if (menuItem.className != "active")
// 		menuItem.className = "";
// }

// function setActive()
// {	
// 	pageURL = window.location.href.toLowerCase();
// 	if (pageURL.toLowerCase() != ("http://localhost/catsDogWalking.php").toLowerCase())
// 	{
// 		urlStart = "http://localhost/";
// 		for (var i = 1, elementID; i <= 5; i++)
// 		{
// 			elementID = ("menu" + i.toString());
// 			var urlEnd = document.getElementById(elementID).href;
// 			urlEnd.replace("http://", "");
// 			var testURL = (urlStart.toLowerCase() + urlEnd.toLowerCase());
// 			if (testURL == pageURL.toLowerCase())
// 				document.getElementById(elementID).className = "active";
// 			else
// 				document.getElementById(elementID).className = "";
// 		}
// 	}
// }
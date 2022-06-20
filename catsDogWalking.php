<!DOCTYPE html>
<!--
	Author: William Stoddart
	Date:	6/13/22
-->
<?PHP
	// Checks to see if there is a variable passed through the URL assigns that variable to $pageName so
	// The appropriate page can be generated if null the homepage will be generated
	if (isset($_GET['page']))
		$pageName = ($_GET['page']);
	else 
		$pageName = null;
?>
	<!--Page Layout-->
	<HTML>
		<HEAD>
			<LINK rel="stylesheet" href="sample.css">
			<TITLE>Cat's Dog Walking</TITLE>
			
		</HEAD>
		<BODY>
			<DIV class="content">
			
			<?php buildPage($pageName); // calls buildPage() to generate content?>
			</DIV>
		</BODY>
		<!--Loads javascript for the "Scheduling" Page from the calendar.js file-->
		<?php if ($pageName == "Scheduling") print ('<SCRIPT type="text/javascript" src="calendar.js"></script>');?>
	</HTML
		
<?php
	// Uses the variable passed in through the url to call the appropriate function to generate content
	function buildPage($pName)
	{
		if  ($pName == "About")
		{
			buildAbout($pName);
		}
		elseif ($pName == "Scheduling")
		{
			buildCalendar($pName);
		}
		elseif ($pName == "About")
		{
			buildAbout($pName);
		}
		elseif ($pName == "About")
		{
			buildAbout($pName);
		}
		elseif ($pName == "Contact")
		{
			buildContact($pName);
		}
		else
		{
			buildHome($pName);
		}
	}
	
	function buildAbout($pageName)
	{
		print ("<TABLE align=\"center\" width=\"960\"><TR>");
		buildMenu($pageName);
		print ("</TR><TR><p>This is where the about me goes</p></TR></TABLE>");
		
	}

	function buildHome($pageName)
	{
		print ("<TABLE align=\"center\" width=\"960\"><TR>");
		buildMenu($pageName);
		print ("
				</TR><TR><p>Welcome to my new dog walking website there will be photos up soon to help fill out the home page.<br/>
					my name's Mary-Cat, an entreprenour and avid animal lover and I'm assisted in my endeavors by my husband Kevin.<br/>
					We do <b>petsitting</b> in-home or regular check-ins and <b>dog-walking by appointment</b>. Please let us know<br/>
					what we can do for you or go ahead and schedule an appointment and we'll see you soon.</p>
				</TR></TABLE>
		");
	}
	
	function buildCalendar($pageName)
	{
		buildMenu($pageName);
		
		print ("<H2><DIV id=\"month\"></DIV></h2><H3><DIV id=\"year\"></DIV></H3>");
		print ("<TABLE border=\"1\" id=\"calendar\" width=\"750\">");
		print ("<TR height=\"10\" ><TD width=\"50\">Sunday</TD><TD width=\"50\">Monday</TD><TD width=\"50\">Tuesday</TD><TD width=\"50\">Wednesday</TD>
				<TD width=\"50\">Thursday</TD><TD width=\"50\">Friday</TD><TD width=\"50\">Saturday</TD></TR>");
		$day = 1;
		for ($i = 1; $i <= 5; $i++)
		{
			print ("<TR>");
			for ($weekday = 1; $weekday <= 7; $weekday++)
			{
				?><TD vertical-align="top" height="50" width="50" id="<?php print ($day);?>">
				</TD><?php
				$day++; 
			}
			print ("</TR>");
		}
		print ("</TABLE>");
		?><DIV class="button"><button class="inactive" type="button" id="priorMonth">Prior Month</button>
		<button class="active" type="button" id="nextMonth">Next Month</button></DIV><?php
	}
	
	function buildMenu($pageName)
	{
		print ("
			<H1>Cat's Dog Walking</H1>
			<div id=\"menu\" class=\"topnav\" background-color=\"green\" text=\white\">
				<a" . ($pageName == 'Home' || $pageName == null?' class="active"':'') . " id=\"menu1\" href=\"catsDogWalking.php?page=Home\");\">Home</a>
				<a" . ($pageName == 'About'?' class="active"':'') . " id=\"menu2\" href=\"catsDogWalking.php?page=About\">About Us</a>
				<a" . ($pageName == 'Services'?' class="active"':'') . " id=\"menu3\" href=\"catsDogWalking.php?page=Services\">Services</a>
				<a" . ($pageName == 'Scheduling'?' class="active"':'') . " id=\"menu4\" href=\"catsDogWalking.php?page=Scheduling\">Schedule Appointment</a>
				<a" . ($pageName == 'Contact'?' class="active"':'') . " id=\"menu5\" href=\"catsDogWalking.php?page=Contact\">Contact Us</a>
			</div>
		");
	}
?>
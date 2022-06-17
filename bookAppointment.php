<!DOCTYPE html>
<?php
if (isset($_GET['date']))
{
	$date = $_GET['date'];
	if (isset($_POST['name']))$name = $_POST['name']; else $name = "";
	if (isset($_POST['telephone']))$telephone = $_POST['telephone']; else $telephone = "";
	if (isset($_POST['dogName']))$dogName = $_POST['dogName']; else $dogName = "";
	if (isset($_POST['appointmentTime']))$appointmentTime = trim($_POST['appointmentTime']); else $appointmentTime = "";
	$appointmentFile = "appointmentFile" . $date . ".txt";
	if (!file_exists($appointmentFile))
	{ 
		writeBaseFile($appointmentFile, $date);
	}
	$fileReader = fopen($appointmentFile, "r") or die("Sorry something went wrong."); 
	$appointmentInfo = array();
	if (feof($fileReader))
	{
		writeBaseFile($appointmentFile, $date);
	}
	while (!feof($fileReader))
	{
		$line = fgets($fileReader);
		$lineArray = explode(";", $line);
		array_push($appointmentInfo, $lineArray);
	}
	fclose($fileReader);
	?>
	<HTML>
		<HEAD>
			<LINK rel="styleSheet" href="sample.css">
			<TITLE>Book Apppointment</TITLE>
		</HEAD>
		<BODY>
			<?php
			if ($name == "")
			{
				?>
				<TABLE>
				<FORM action="bookappointment.php?date=<?php print $date ?>" method="post">
					<TR><TD><LABEL for="appointmentTime">Appointment Time</LABEL></TD>
					<TD><SELECT name="appointmentTime" id="appointmentTime" width="50" required>
					<?php
						foreach ($appointmentInfo as $line)
						{
							if (strcmp($line[1], "") == 0)
							{
								?><OPTION value="<?php print $line[4]; ?>"><?php print $line[4]; ?></option>;<?php
							}
						}
					?>
					</SELECT></TD></TR>
					<TR><TD><LABEL for="fullName">Full Name</Label></TD>
					<TD><INPUT type="text" maxlength="40" width="50" name="name" ID="name" required></TD></TR>
					<TR><TD><LABEL for="telephone">Phone Number:</LABEL></TD>
					<TD><INPUT type="tel" width="50" id="telephone" name="telephone" required></TD></TR>
					<TR><TD><LABEL for="dogName">Dog Name:</LABEL></TD>
					<TD><INPUT type="text" maxlength="40" width="50" id="dogName" name="dogName" required></TD></TR>
					<TR><TD> </TD><TD><BUTTON type="submit">Book Appointment</button></TD></TR>
				</FORM>
				</TABLE>
				<?php
			} 
			else
			{
				$fileWriter = fopen($appointmentFile, "w");
				foreach ($appointmentInfo as $line)
				{
					if (strcmp(trim($line[4]),$appointmentTime) == 0)
					{
						fwrite($fileWriter, $date . ";" . $name . ";" . $telephone . ";" . $dogName . ";" . $appointmentTime . "\n");
						print ("<p>" . $name . " You've successfully booked your appointment for " . $dogName ." on " . $date . " at " . $appointmentTime . ".</p>");
					}
					else
						fwrite($fileWriter, $line[0] . ";" . $line[1] . ";" . $line[2] . ";" . $line[3] . ";" . $line[4]);
				}
				fclose($fileWriter);
			}
			?>
		</BODY>
	</HTML>
	<?php
	}
	else
		print ("Sorry we don't have appointments ready for this date yet.");
	
function writeBaseFile($appointmentFile, $date)
{
	$fileWriter = fopen($appointmentFile, "w") or die("Sorry something went wrong.");
	for ($i=0;$i<10;$i++)
	{
		if ($i < 6)
			fwrite($fileWriter, $date . ";;;;" . ($i + 6) . ":30am");
		elseif ($i == 6)
			fwrite($fileWriter, $date . ";;;;" . ($i + 6) . ":30pm");
		else
			fwrite($fileWriter, $date . ";;;;" . ($i - 6) . ":30pm");
		if ($i < 9)
			fwrite($fileWriter, "\n");
	}
	fclose($fileWriter);
}
?>
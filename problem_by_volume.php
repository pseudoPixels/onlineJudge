<?php
    session_start();
    
 
    if ($_SESSION['loggedin'] != 1) {
        header("Location: index.php");
        exit;
    }
 include("config.php");
?>

<html>
<head>
<link rel="stylesheet" type="text/css" href="CSS/icb_style_01.css"  media="screen,projection" />

<link rel="stylesheet" type="text/css" href="CSS/styles.css" />
<link rel="stylesheet" type="text/css" href="CSS/finalCss.css" />
<link rel="stylesheet" type="text/css" href="CSS/vertical.css" />
<link href="CSS/menu_assets/styles.css" rel="stylesheet" type="text/css">
<link href="CSS/menu_assets/top_menu_styles.css" rel="stylesheet" type="text/css">
<title>iut coder block</title>
</head>
<body  width="100%">
<div id="wrap">
<h1 ><span style="color:#FFFFFF;">IUT CODER BLOCK</span></h1>
<p class="slogan" ><span style="color:#FFFFFF;">Dare to challange the world...</span></p>
<br>
<div id="cssmenu_top">
		<ul>
			<li ><a href="login_success.php"><span style="text-color:#FF0000;">Home</span></a></li>
			<li>
			<a href="#">Algorithms</a>
		    </li>
			<li><a href="contests.php">Contests</a>
				
			</li>
			<li class='has-sub'><a href="#"><span>Problems</span></a>
				<ul>
					<li><a href="problem_by_algorithm.php">By Algorithm</a></li>
					<li><a href="problem_by_volume.php">By Volume</a></li>
					<li><a href="problem_by_contests.php">By Contest</a></li>
					<li class='last'><a href="problem_by_setters.php">By Problem Setter</a>
						
					</li>
				</ul>
				
			</li>
			
			
			
			
			
			
			
			
			<li><a href="rankList.php">Rank List</a></li>
			<li><a href="#">Learn To Program</a></li>
			<li><a href="#">Contact Us</a></li>
			<li><a href="logout.php">Logout</a></li>
		</ul>
	
</div>

<div id="content">
<div class="my_left_menu">
<div id='cssmenu7'>
<ul>
   <li class='active' ><a href='login_success.php'><span>Quick Submit</span></a></li>
   <li><a href='mySubmission.php'><span>My Submissions</span></a></li>
   <li><a href='myProfileView.php'><span>My Profile</span></a></li>
   <li><a href='submissionStat.php'><span>Submission Stat</span></a></li>
   <li><a href='createTeam.php'><span>Create New Team</span></a></li>
   <li><a href='joinTeam.php'><span>Join A Team</span></a></li>
</ul>
</div>

	
	
</div>



<div class="my_right_content">

 
 <?php
 date_default_timezone_set('Asia/Dhaka');
 
 $distAlg = "SELECT * From probleminfo GROUP BY problemId ASC";
 $result = mysql_query($distAlg);
 
 echo '<span style ="font-size:18pt;color:#000000;">Problems By Volume</span><hr><br/>';
 while($row=mysql_fetch_array($result)){
    $isContestProblem =  $row['contestID'];
	$pID = $row['problemId'];
	
	if($isContestProblem == NULL){
	  echo "<a href='viewProblemGivenID.php?id="."$pID'"."><span style ='font-family:comic sans ms;font-size:15pt;color:#006600;'><strong>icb".$row['problemId']. "</strong>: &nbsp &nbsp ".$row['problemTitle']."</span></a> &nbsp &nbsp";
	  echo "<a href='login_success.php?problemID="."$pID'"."><span style ='font-family:comic sans ms;font-size:10pt;color:#FF0000;'> <strong> Submit </strong></span></a><br/>";
	}
	else {
	  $conQ = "SELECT * FROM contestinfo WHERE contestId = '$isContestProblem'";
	  $res = mysql_query($conQ);
	  $myRow=mysql_fetch_array($res);
	  
	  
	  
		$compDate = $myRow['contestDate'];
		
		$compDuration = $myRow['Duration'];
		
		$date1 = date("Y-m-d H:i:s",time()-3600); 
	    $secVal = strtotime($date1) - strtotime($compDate);
		
		if($secVal >= 0 && $secVal > $compDuration){
		  
		  $title = $row['problemTitle'];
		  echo "<a href='viewProblemGivenID.php?id="."$pID'"."><span style ='font-family:comic sans ms;font-size:15pt;color:#006600;'><strong>icb".$row['problemId']. "</strong>: &nbsp &nbsp ".$title."</span></a> &nbsp &nbsp &nbsp";
		  echo "<a href='login_success.php?problemID="."$pID'"."><span style ='font-family:comic sans ms;font-size:10pt;color:#FF0000;'> <strong> Submit </strong></span></a><br/>";
		
		}
	  
	}
	
	
	
	
	
 }

 
 ?>
</div>


<hr class="clear" />

</div>


</div>
</body>
</html>

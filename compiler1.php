<?php
        session_start();
		$userName = $_SESSION['userName'];
		include("Config.php");
?>

<html>
	<head>
		<head>
<link rel="stylesheet" type="text/css" href="CSS/icb_style_01.css" title="icb" media="screen,projection" />
<link rel="stylesheet" type="text/css" href="CSS/icb_style_top_menu.css" title="icb" media="screen,projection" />
<link rel="stylesheet" type="text/css" href="CSS/styles.css" />
<title>iut coder block</title>
</head>
<body background="images/img.jpg" width="100%">
<div id="wrap">
<h1 ><span style="color:#00FF00;">IUT CODER BLOCK</span></h1>
<p class="slogan" ><span style="color:#FFFFFF;">Dare to challange the world...</span></p>
<br><br><br>
<div id="menu">
		<nav>
		<ul>
			<li><a href="#"><span style="text-color:#FF0000;">Home</span></a></li>
			<li><a href="#">Problems</a>
				<ul>
					<li><a href="#">By Algorithm</a></li>
					<li><a href="problem_by_volume.php">By Volume</a></li>
					<li><a href="#">By Contest</a>
					<li><a href="#">By Problem Setter</a>
						
					</li>
				</ul>
			</li>
			<li><a href="#">Algorithms</a>
				
			</li>
			<li><a href="#">Rank List</a></li>
			<li><a href="#">Learn To Program</a></li>
			<li><a href="#">Contact Us</a></li>
			<li><a href="#">Logout</a></li>
		</ul>
	</nav>
</div>
<img class="feature" src="images/sample1.jpg" width="100%" height="200" alt="sample image" />
<div id="content">
<div class="my_left_menu">
<div id='cssmenu'>
<ul>
   <li ><a href='#'><span>Quick Submit</span></a></li>
   <li><a href='#'><span>My Submissions</span></a></li>
   <li><a href='#'><span>My Profile</span></a></li>
   <li><a href='#'><span>Submission Stat</span></a></li>
</ul>
</div>

	
	
</div>

		<?php
		//SETTING UP ALL NEEDED DIRECTORIES
		$p_id=$_POST['id'];
		
		$producedCpp = $userName."_icb".$p_id.".cpp";
		$producedExe = $userName."_icb".$p_id.".exe";
		$producedOutput = $userName."_icb".$p_id.".txt";
		
		
		$sampleInput = "inputs//icb".$p_id.".txt";
		$sampleOutput = "outputs//icb".$p_id.".txt";
		
		?>
		<br></br>
		<h4 <span style ="font-family:comic sans ms;font-size:15pt;color:#000066;">Submission Result</h4>
		<hr>
		<?php
		//GETTING ALL VARIABLES FROM userRankList TABLE
		$sql="SELECT * FROM userranklist WHERE userName='$userName'";
	    $result=mysql_query($sql);
        $row = mysql_fetch_array($result);
		
		$totalSubmitted = $row['totalSubmitted'];
		$totalAccepted = $row['totalAccepted'];
		$totalWrongAns = $row['totalWrongAnswers'];
		$totalTimeLimit = $row['totalTimeLimitExceeded'];
		$totalRunTime = $row['totalRuntimeErrors'];
		$totalCompile = $row['totalCompileTimeErrors'];
		$rank = $row['Rank'];
		
		
		
		
		if(!file_exists($sampleInput)){
		    echo '<span style="color:#FF0000;text-align:center;font-family:comic sans ms;font-size:15pt;">Invalid Problem ID !!!</span>';
		}
		else{
		//PLACING THE SUBMITTED CODE IN A TEMPORARY FILE
	    $source=$_POST['source'];
		$fp = fopen($producedCpp, "w") or die("Couldn't open $file for writing!");
		fwrite($fp, $source) or die("Couldn't write values to file! ...Compilation Error");
		fclose($fp);
		
		//COMPILING THAT SAVED FILE
		$compileMsg = system("Dev-Cpp\\bin\\g++ {$producedCpp} -O3 -o {$producedExe}");
		
		
		//CHECK IF COMPILE ERROR HAS OCCURED OR NOT
		if(!file_exists($producedExe)){
		   echo '<span style="color:#FF0000;text-align:center;font-family:comic sans ms;font-size:50pt;">Compile Error !!!</span>';
		   
		   //IF COMPILE ERROR THEN TOTAL SUBMISSION AND COMPILE
		   //ERROR MUST BE INCREASE BY ONE.
		   $totalSubmitted = $totalSubmitted + 1;
		   $totalCompile = $totalCompile + 1;
		   $upd  = "UPDATE userRankList SET totalSubmitted = $totalSubmitted , totalCompileTimeErrors = $totalCompile WHERE userName = '$userName'";
		   mysql_query($upd);
		}
		else{
		//SETTING UP SAMPLE INPUT AND THE NEW OUTPUT ENVIRONMENT
		//AND EXECUTING THAT .exe 
		$all_dir = $producedExe. " < ";
		$all_dir .= $sampleInput;
		$all_dir .= "  >  ";
		$all_dir .= $producedOutput;
		
		$executionMsg = system($all_dir);
		
		
		
		$runtime=0;
		$wronganswer=0;
		$accept=1;
		
		
		//OPENING THE SAMPLE OUTPUT AND PRODUCED OUTPUT 
		//FOR COMPARING.
		$file1=fopen($sampleOutput,"r");
		$file2=fopen($producedOutput,"r");
		
		while(!feof($file1))
		{
		    
			$ch1 = fgetc($file1);
			$ch2 = fgetc($file2);
			
			 if($ch1!=$ch2&&$ch1!=null&&$ch2!=null)
			{
			$wronganswer=1;
			$accept=0;
			break;
			}
			
		}
		fclose($file1);
		fclose($file2);
		
		
		
		 
		 
		if($wronganswer){
		   echo '<span style="color:#FF0000;text-align:center;font-family:comic sans ms;font-size:50pt;">Wrong Answer !!!</span>';
		   
		   //IF WRONG ANS THEN TOTAL SUBMISSION AND WRONG
		   //ANS MUST BE INCREASE BY ONE.
		   $totalSubmitted = $totalSubmitted + 1;
		   $totalWrongAns = $totalWrongAns + 1;
		   $upd  = "UPDATE userRankList SET totalSubmitted = $totalSubmitted , totalWrongAnswers = $totalWrongAns WHERE userName = '$userName'";
		   mysql_query($upd);
		
		}
		if($accept){
		echo '<span style="color:#00CC66;text-align:center;font-family:comic sans ms;font-size:50pt;">Accepted. </span>';
		 
		    //IF ACCEPTED THEN TOTAL SUBMISSION AND ACCEPTED
		   //MUST BE INCREASE BY ONE.
		   $totalSubmitted = $totalSubmitted + 1;
		   $totalAccepted = $totalAccepted + 1;
		   $upd  = "UPDATE userRankList SET totalSubmitted = $totalSubmitted , totalAccepted = $totalAccepted WHERE userName = '$userName'";
		   mysql_query($upd);
		 
		}
		}
		}
		if(file_exists($producedOutput))unlink($producedOutput);
		if(file_exists($producedCpp))unlink($producedCpp);
		if(file_exists($producedExe))unlink($producedExe);
		
		?>
		</body>			
</html>
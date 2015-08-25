<?php
	$bookInfos = array(
		"bm"=> array( //Biographies and Memoirs
			array("title"=> "The Last Lecture", "author1"=> "Randy Pausch", "author2"=> "Jeffrey Zaslow"),
			array("title"=> "Always Looking Up: The Adventures of an Incurable Optimist ", "author1"=> "Michael F. Fox", "author2"=> "")
		),
		"ci"=> array( //Computer and Internet
			array("title"=> "ZK: Ajax without the Javascript Framework", "author1"=> "HenriChen", "author2"=> "Robbie Cheng"),
			array("title"=> "Beautiful Teams: Inspiring and Cautionary Tales", "author1"=> "Andrew Stellman", "author2"=> "Jennifer Greene")
		),
		"lf"=> array( //lf: Literature and Fiction
			array("title"=> "The Shack", "author1"=> "William P. Young", "author2"=> ""),
			array("title"=> "Watchmen", "author1"=> "Alan Moore", "author2"=> "Dave Gibbons"),
			array("title"=> "Long Lost", "author1"=> "Harlan Coben", "author2"=> "")
		)
	);

	header('Content-Type: text/plain;charset=UTF-8');
	echo json_encode($bookInfos[$_REQUEST['categoryId']]);
?>
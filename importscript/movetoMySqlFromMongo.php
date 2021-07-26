<?php

include 'class.database.php';


try {
	
	//read the places and insert them in the database
	//get connection singleton
	$db = Database::getInstance();
	$mysqli = $db->getConnection();

    $mng = new MongoDB\Driver\Manager("mongodb://localhost:27017");
	$query = new MongoDB\Driver\Query([]); 
	 
	$rows = $mng->executeQuery("parking15.lots", $query); 

	foreach ($rows as $row) {
        echo print_r($row,true)."\n";
		$stmt = $mysqli->prepare("INSERT INTO `smartParking`.`places` (`name`,`loc`,`lat`, `long`, `disabledcount`, `empty`,`avaliable`,`user_id`,`cost`, `parkingtype_id`, `capacity`,`time`,`created_at`,`updated_at`,`reportedcount`,`maximumduration`) VALUES (?,POINT(".$row->loc[0].",".$row->loc[1]."),?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?);");
		$name=empty($row->name)?"NO NAME":$row->name;
		$disabledcount=empty($row->disabledcount)?0:$row->disabledcount;
		$empty=empty($row->empty)?0:$row->empty;
		$avaliable=empty($row->avaliable)?0:$row->avaliable;
		$user= ($row->user<1003)?1003:$row->user;
		$cost=empty($row->cost)?0:$row->cost;
		$type=6;
		$capacity=empty($row->capacity)?0:$row->capacity;
		$time=empty($row->time)?date("Y-m-d H:i:s"):date("Y-m-d H:i:s", $row->time);
		$now=date("Y-m-d H:i:s");
		$reportedcount=$capacity;
		$maximumduration=0;
		$stmt->bind_param("sddiiiidiisssii",$name, $row->loc[0], $row->loc[1],$disabledcount,$empty,$avaliable,$user,$cost,$type,$capacity,$time,$now,$now,$reportedcount,$maximumduration);
		$stmt->execute();
		if (!empty($stmt->error)) {
			printf("Error: %s.\n", $stmt->error);
		}
		$stmt->close();
	
    }

	$rows = $mng->executeQuery("parking15.places", $query);

	foreach ($rows as $row) {
        echo print_r($row,true)."\n";
		$stmt = $mysqli->prepare("INSERT INTO `smartParking`.`places` (`name`,`loc`,`lat`, `long`, `disabledcount`, `empty`,`avaliable`,`user_id`,`cost`, `parkingtype_id`, `capacity`,`time`,`created_at`,`updated_at`,`reportedcount`,`maximumduration`) VALUES (?,POINT(".$row->loc[0].",".$row->loc[1]."),?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?);");
		$name=empty($row->name)?"NO NAME":$row->name;
		$disabledcount=empty($row->disabledcount)?0:$row->disabledcount;
		$empty=empty($row->empty)?0:$row->empty;
		$avaliable=empty($row->avaliable)?0:$row->avaliable;
		$user= ($row->user<1003)?1003:$row->user;
		$cost=empty($row->cost)?0:$row->cost;
		$type=7;
		$capacity=empty($row->capacity)?0:$row->capacity;
		$time=empty($row->time)?date("Y-m-d H:i:s"):date("Y-m-d H:i:s", $row->time);
		$now=date("Y-m-d H:i:s");
		$reportedcount=$capacity;
		$maximumduration=0;		
		$stmt->bind_param("sddiiiidiisssii",$name, $row->loc[0], $row->loc[1],$disabledcount,$empty,$avaliable,$user,$cost,$type,$capacity,$time,$now,$now,$reportedcount,$maximumduration);
		$stmt->execute();
		if (!empty($stmt->error)) {
			printf("Error: %s.\n", $stmt->error);
		}
		$stmt->close();
	
    }
	
	
     
	$rows = $mng->executeQuery("parking15.activity", $query);		
   
	foreach ($rows as $row) {
        echo print_r($row,true)."\n";
		$stmt = $mysqli->prepare("SELECT checkIfParkingExists(?,?) as result;");
		$stmt->bind_param("dd", $row->loc[0],$row->loc[1]);
		$stmt->execute();
		$result = $stmt->get_result();
		$places_id=0;
		if($result->num_rows === 0) exit('No rows');
		while($rowLoc = $result->fetch_assoc()) {
		  //print_r($row);
		  if (!empty($rowLoc['result'])) {
				$places_id=$rowLoc['result'];  
		  }
		  else {
				$stmt2 = $mysqli->prepare("INSERT INTO `smartParking`.`places` (`name`,`loc`,`lat`, `long`, `disabledcount`, `empty`,`avaliable`,`user_id`,`cost`, `parkingtype_id`, `capacity`,`time`,`created_at`,`updated_at`,`reportedcount`,`maximumduration`) VALUES (?,POINT(".$row->loc[0].",".$row->loc[1]."),?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?);");
				$name="From Activity";
				$disabledcount=0;
				$empty=0;
				$avaliable=1;
				$user= ($row->user<1003)?1003:$row->user;
				$cost=0;
				$type=empty($row->type)?1:$row->type;
				$capacity=empty($row->reportedCount)?0:$row->reportedCount;
				$time=empty($row->time)?date("Y-m-d H:i:s"):date("Y-m-d H:i:s", $row->time);
				$now=date("Y-m-d H:i:s");
				$reportedcount=$capacity;
				$maximumduration=0;	
				$stmt2->bind_param("sddiiiidiisssii",$name, $row->loc[0], $row->loc[1],$disabledcount,$empty,$avaliable,$user,$cost,$type,$capacity,$time,$now,$now,$reportedcount,$maximumduration);
				$stmt2->execute();
				if (!empty($stmt2->error)) {
					printf("Error: %s.\n", $stmt2->error);
					$places_id=null;
				}
				else {
					$places_id=$stmt2->insert_id;
				}
				$stmt2->close();			  
		  }
		  
		}
		$stmt->close();				

		$stmt = $mysqli->prepare("INSERT INTO `smartParking`.`activities` ( `parked`, `user_id`, `places_id`,`time`,`created_at`,`updated_at`) VALUES (?, ?, ?, ?, ?, ?);");
		$parked=empty($row->parked)?0:$row->parked;
		$user= ($row->user<1003)?1003:$row->user;
		$time=empty($row->time)?date("Y-m-d H:i:s"):date("Y-m-d H:i:s", $row->time);
		$now=date("Y-m-d H:i:s");
		$stmt->bind_param("iiisss", $parked,$user,$places_id,$time,$now,$now);
		$stmt->execute();
		if (!empty($stmt->error)) {
			printf("Error: %s.\n", $stmt->error);
		}
		$stmt->close();		
    }
	
	
	$rows = $mng->executeQuery("parking15.bookmarks", $query);

	foreach ($rows as $row) {
        echo print_r($row,true)."\n";
		$places_id=0;
		if  (isset($row->loc) && is_array($row->loc) &&(!empty($row->loc[0]) && !empty($row->loc[1]))) {
			$stmt = $mysqli->prepare("SELECT checkIfParkingExists(?,?) as result;");
			$stmt->bind_param("dd", $row->loc[0],$row->loc[1]);
			$stmt->execute();
			$result = $stmt->get_result();
			if($result->num_rows === 0) exit('No rows');
			while($rowLoc = $result->fetch_assoc()) {
			  //print_r($row);
			  if (!empty($rowLoc['result'])) {
					$places_id=$rowLoc['result'];  
			  }
			  else {
					$stmt2 = $mysqli->prepare("INSERT INTO `smartParking`.`places` (`name`,`loc`,`lat`, `long`, `disabledcount`, `empty`,`avaliable`,`user_id`,`cost`, `parkingtype_id`, `capacity`,`time`,`created_at`,`updated_at`,`reportedcount`,`maximumduration`) VALUES (?,POINT(".$row->loc[0].",".$row->loc[1]."),?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?);");
					$name="From BOOKMARK";
					$disabledcount=0;
					$empty=0;
					$avaliable=1;
					$user= ($row->user<1003)?1003:$row->user;
					$cost=0;
					$type=empty($row->type)?6:$row->type;
					$capacity=0;
					$time=empty($row->time)?date("Y-m-d H:i:s"):date("Y-m-d H:i:s", $row->time);
					$now=date("Y-m-d H:i:s");
					$reportedcount=$capacity;
					$maximumduration=0;	
					$stmt2->bind_param("sddiiiidiisssii",$name, $row->loc[0], $row->loc[1],$disabledcount,$empty,$avaliable,$user,$cost,$type,$capacity,$time,$now,$now,$reportedcount,$maximumduration);
					$stmt2->execute();
					if (!empty($stmt2->error)) {
						printf("Error: %s.\n", $stmt2->error);
						$places_id=null;
					}
					else {
						$places_id=$stmt2->insert_id;
						
					}
					$stmt2->close();			  
			  }
			   
			}
			$stmt->close();				
		}
		$stmt = $mysqli->prepare("INSERT INTO `smartParking`.`bookmarks` (`temporary`,`description`,`user_id`,`places_id`, `time`,`created_at`,`updated_at`,`name`) VALUES (?, ?, ?, ?, ?, ?,?,?);");
		if (isset($row->name)) {
			$name=empty($row->name)?0:$row->name;
		}
		else {
			$name="No Name";
		}		
		if (isset($row->temporary)) {
			$temporary=empty($row->temporary)?0:$row->temporary;
		}
		else {
			$temporary=0;
		}
		if (isset($row->description)) {
			$description=empty($row->description)?"Not Description":$row->description;			
		}
		else {
			$description="Not Description";
		}
		if (isset($row->user)) {
			$user= ($row->user<1003)?1003:$row->user;			
		}
		else {
			$user==1003;
		}
		$time=empty($row->time)?date("Y-m-d H:i:s"):date("Y-m-d H:i:s", $row->time);
		$now=date("Y-m-d H:i:s");
		$stmt->bind_param("isiissss", $temporary,$description,$user,$places_id,$time,$now,$now,$name);
		$stmt->execute();
		if (!empty($stmt->error)) {
			printf("Error: %s.\n", $stmt->error);
		}
		$stmt->close();	
	
    }	
	
	$rows = $mng->executeQuery("parking15.target", $query);
	foreach ($rows as $row) {
        echo print_r($row,true)."\n";
		$stmt = $mysqli->prepare("INSERT INTO `smartParking`.`targets` (`loc`,`lat`, `long`,`user_id`,`time`,`created_at`,`updated_at`) VALUES (POINT(".$row->loc[0].",".$row->loc[1]."),?, ?, ?, ?, ?,?);");
		$user= ($row->user<1003)?1003:$row->user;
		$time=empty($row->time)?date("Y-m-d H:i:s"):date("Y-m-d H:i:s", $row->time);
		$now=date("Y-m-d H:i:s");
		$stmt->bind_param("ddisss", $row->loc[0], $row->loc[1],$user,$time,$now,$now);
		$stmt->execute();
		if (!empty($stmt->error)) {
			printf("Error: %s.\n", $stmt->error);
		}
		$stmt->close();
	
    }		
	
	
	$rows = $mng->executeQuery("parking15.requests", $query);
	foreach ($rows as $row) {
        echo print_r($row,true)."\n";
		$stmt = $mysqli->prepare("INSERT INTO `smartParking`.`user_requests` (`userloc`,`userlat`,`userlong`,`destloc`,`destlat`, `destlong`,`user_id`,`time`,`totaltime`,`fuzzytime`,`created_at`,`updated_at`) VALUES (POINT(".$row->userLat.",".$row->userLon."),?, ?,POINT(".$row->destLat.",".$row->destLon."), ?, ?, ?,?,?,?,?,?);");
		$user= ($row->userId<1003)?1003:$row->userId;
		$time=empty($row->time->milliseconds)?date("Y-m-d H:i:s"):date("Y-m-d H:i:s", $row->time->milliseconds);
		$now=date("Y-m-d H:i:s");
		$totaltime=empty($row->totalTime)?0:$row->totalTime;
		$fuzzytime=empty($row->fuzzyTime)?0:$row->fuzzyTime;
		$stmt->bind_param("ddddisddss", $row->userLat, $row->userLon,$row->destLat,$row->destLon,$user,$time,$totaltime,$fuzzytime,$now,$now);
		$stmt->execute();
		$user_requests_id=$stmt->insert_id;
		if (!empty($stmt->error)) {
			printf("Error: %s.\n", $stmt->error);
		}
		else {
			$resultsofRow=$row->results;
			foreach ($resultsofRow as $extraRow) {
				
				$places_id=0;
				if  (isset($extraRow->loc) && is_array($extraRow->loc) &&(!empty($extraRow->loc[0]) && !empty($extraRow->loc[1]))) {
					$stmtLoc = $mysqli->prepare("SELECT checkIfParkingExists(?,?) as result;");
					$stmtLoc->bind_param("dd", $extraRow->loc[0],$extraRow->loc[1]);
					$stmtLoc->execute();
					$result = $stmtLoc->get_result();
					if($result->num_rows === 0) exit('No extraRows');
					while($extraRowLoc = $result->fetch_assoc()) {
					  if (!empty($extraRowLoc['result'])) {
							$places_id=$extraRowLoc['result'];  
					  }
					  else {
							$stmt2 = $mysqli->prepare("INSERT INTO `smartParking`.`places` (`name`,`loc`,`lat`, `long`, `disabledcount`, `empty`,`avaliable`,`user_id`,`cost`, `parkingtype_id`, `capacity`,`time`,`created_at`,`updated_at`,`reportedcount`,`maximumduration`,`validity`) VALUES (?,POINT(".$extraRow->loc[0].",".$extraRow->loc[1]."),?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?);");
							$name="From Result";
							$disabledcount=empty($extraRow->disabled)?0:$extraRow->disabled;
							$empty=empty($extraRow->empty)?0:$extraRow->empty;
							$avaliable=1;
							$user= ($extraRow->user<1003)?1003:$extraRow->user;
							$cost=empty($extraRow->cost)?0:$extraRow->cost;
							$type=empty($extraRow->type)?6:$extraRow->type;
							$capacity=0;
							$time=empty($extraRow->time)?date("Y-m-d H:i:s"):date("Y-m-d H:i:s", $extraRow->time);
							$now=date("Y-m-d H:i:s");
							$reportedcount=empty($extraRow->reportedCount)?0:$extraRow->reportedCount;	
							$maximumduration=empty($extraRow->duration)?0:$extraRow->duration;
							$validity=empty($extraRow->validity)?5:$extraRow->validity;						
							$stmt2->bind_param("sddiiiidiisssiii",$name, $extraRow->loc[0], $extraRow->loc[1],$disabledcount,$empty,$avaliable,$user,$cost,$type,$capacity,$time,$now,$now,$reportedcount,$maximumduration,$validity);
							$stmt2->execute();
							if (!empty($stmt2->error)) {
								printf("Error: %s.\n", $stmt2->error);
								$places_id=null;
							}
							else {
								$places_id=$stmt2->insert_id;
							}
							$stmt2->close();			  
					  }
					   
					}
					$stmtLoc->close();					
				}
			
				$stmtresults = $mysqli->prepare("INSERT INTO `smartParking`.`request_results` (`distanceDest`,`distanceDestNorm`,`distanceUser`,`distanceUserNorm`,`durationDest`,`durationDestNorm`,`durationUser`, `durationUserNorm`,`costNorm`,`score`,`places_id`,`user_id`,`created_at`,`updated_at`,`name`) VALUES  (?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?);");
				$distanceDest= empty($extraRow->distanceDest)||$extraRow->distanceDest=='NAN'?0:$extraRow->distanceDest;
				$distanceDestNorm= empty($extraRow->distanceDestNorm)||$extraRow->distanceDestNorm=='NAN'?0:$extraRow->distanceDestNorm;
				$distanceUser= empty($extraRow->distanceUser)||$extraRow->distanceUser=='NAN'?0:$extraRow->distanceUser;
				$distanceUserNorm= empty($extraRow->distanceUserNorm)||$extraRow->distanceUserNorm=='NAN'?0:$extraRow->distanceUserNorm;
				$durationDest= empty($extraRow->durationDest)||$extraRow->durationDest=='NAN'?0:$extraRow->durationDest;
				$durationDestNorm= empty($extraRow->durationDestNorm)||$extraRow->durationDestNorm=='NAN'?0:$extraRow->durationDestNorm;
				$durationUser= empty($extraRow->durationUser)||$extraRow->durationUser=='NAN'?0:$extraRow->durationUser;
				$durationUserNorm= empty($extraRow->durationUserNorm)||$extraRow->durationUserNorm=='NAN'?0:$extraRow->durationUserNorm;
				$costNorm= empty($extraRow->costNorm)||$extraRow->costNorm=='NAN'?0:$extraRow->costNorm;
				$score= empty($extraRow->score)?0:$extraRow->score;		
				$user= ($extraRow->user<1003)?1003:$extraRow->user;
				$now=date("Y-m-d H:i:s");
				$name=empty($extraRow->name)?0:$extraRow->name;	
				$stmtresults->bind_param("ddddddddddiisss",$distanceDest,$distanceDestNorm,$distanceUser,$distanceUserNorm,$durationDest,$durationDestNorm,$durationUser,$durationUserNorm, $costNorm,$score,$places_id,$user,$now,$now,$name);
				$stmtresults->execute();
				$request_results_id=$stmtresults->insert_id;
				if (!empty($stmtresults->error)) {
					printf("Error: %s.\n", $stmtresults->error);
				}
				$stmtresults->close();			
				
				$stmtresults = $mysqli->prepare("INSERT INTO `smartParking`.`user_results` (`user_requests_id`,`request_results_id`,`created_at`,`updated_at`) VALUES (?,?,?,? ) ;");				
				$stmtresults->bind_param("ddss",$user_requests_id,$request_results_id,$now,$now);
				$stmtresults->execute();
				if (!empty($stmtresults->error)) {
					printf("Error: %s.\n", $stmtresults->error);
				}
				$stmtresults->close();	
				
			}
			
			$eachArrayofParameters=Array("userdistance"=>1,"destdistance"=>2,"cost"=>3,"duration"=>4,"userDuration"=>5,"destduration"=>6);
				
			$param[0]=strtolower($row->param1);
			$param[1]=strtolower($row->param2);
			$param[2]=strtolower($row->param3);				
			$stmtresults = $mysqli->prepare("INSERT INTO `smartParking`.`request_parameters` (`user_requests_id`,`parameters_id`,`order`,`created_at`,`updated_at`) VALUES  (?,?,?,?,? );");
			$order=1;
			foreach ($param as $paramet) {
				//echo "gamw se gormiti .. xm.. gormiti ".$eachArrayofParameters[$paramet]. " ".$paramet." !".$order.PHP_EOL;
				$stmtresults->bind_param("dddss",$user_requests_id,$eachArrayofParameters[$paramet],$order,$now,$now);
				$stmtresults->execute();
				if (!empty($stmtresults->error)) {
					printf("Error on Parameters: %s.\n", $stmtresults->error);
				}					
				$order++;
			}
			//die();
			$stmtresults->close();		
	
		}
		$stmt->close();		
	}	


	
	
	
} catch (MongoDB\Driver\Exception\Exception $e) {

    $filename = basename(__FILE__);
    
    echo "The $filename script has experienced an error.\n"; 
    echo "It failed with the following exception:\n";
    
    echo "Exception:", $e->getMessage(), "\n";
    echo "In file:", $e->getFile(), "\n";
    echo "On line:", $e->getLine(), "\n";       
}

?>
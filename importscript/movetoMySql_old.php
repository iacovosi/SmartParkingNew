<?php

include 'class.database.php';


try {
	
	//read the places and insert them in the database
	//get connection singleton
	$db = Database::getInstance();
	$mysqli = $db->getConnection();

    $mng = new MongoDB\Driver\Manager("mongodb://localhost:27017");
	$query = new MongoDB\Driver\Query([]); 
     
	$rows = $mng->executeQuery("parking15.places", $query);

	foreach ($rows as $row) {
        echo print_r($row,true)."\n";
		/*
		$stmt = $mysqli->prepare("INSERT INTO `smartParking`.`activities` (`loc`,`lat`, `long`, `parked`, `user_id`, `parkingtype_id`, `reported_count`,`time`,`created_at`,`updated_at`) VALUES (POINT(".$row->loc[0].",".$row->loc[1]."),?, ?, ?, ?, ?, ?,?,?,?);");
		$parked=empty($row->parked)?0:$row->parked;
		$type=empty($row->type)?1:$row->type;
		$reportedCount=empty($row->reportedCount)?0:$row->reportedCount;
		$user= ($row->user<1003)?1003:$row->user;
		$time=empty($row->time)?date("Y-m-d H:i:s"):date("Y-m-d H:i:s", $row->time);
		$now=date("Y-m-d H:i:s");
		$stmt->bind_param("ddiiiisss", $row->loc[0], $row->loc[1],$parked,$user,$type,$reportedCount,$time,$now,$now);
		$stmt->execute();
		if (!empty($stmt->error)) {
			printf("Error: %s.\n", $stmt->error);
		}
		$stmt->close();
*/		
    }
	
	/*
	
	
	//get connection singleton
	$db = Database::getInstance();
	$mysqli = $db->getConnection();

    $mng = new MongoDB\Driver\Manager("mongodb://localhost:27017");
	$query = new MongoDB\Driver\Query([]); 
     
	$rows = $mng->executeQuery("parking15.activity", $query);
		
		
		
		
		
   
	foreach ($rows as $row) {
        echo print_r($row,true)."\n";
		
		
		$stmt = $mysqli->prepare("SELECT checkIfParkingExists(?,?);");
		$stmt->bind_param("dd", $row->loc[0],$row->loc[1]);
		$stmt->execute();
		$result = $stmt->get_result();
		if($result->num_rows === 0) exit('No rows');
		while($row = $result->fetch_assoc()) {
		  print_r($row);
		}
		$stmt->close();				
		
		
		$stmt = $mysqli->prepare("INSERT INTO `smartParking`.`activities` (`loc`,`lat`, `long`, `parked`, `user_id`, `parkingtype_id`, `reported_count`,`time`,`created_at`,`updated_at`) VALUES (POINT(".$row->loc[0].",".$row->loc[1]."),?, ?, ?, ?, ?, ?,?,?,?);");
		$parked=empty($row->parked)?0:$row->parked;
		$type=empty($row->type)?1:$row->type;
		$reportedCount=empty($row->reportedCount)?0:$row->reportedCount;
		$user= ($row->user<1003)?1003:$row->user;
		$time=empty($row->time)?date("Y-m-d H:i:s"):date("Y-m-d H:i:s", $row->time);
		$now=date("Y-m-d H:i:s");
		$stmt->bind_param("ddiiiisss", $row->loc[0], $row->loc[1],$parked,$user,$type,$reportedCount,$time,$now,$now);
		$stmt->execute();
		if (!empty($stmt->error)) {
			printf("Error: %s.\n", $stmt->error);
		}
		$stmt->close();			
    }
	*/
	
} catch (MongoDB\Driver\Exception\Exception $e) {

    $filename = basename(__FILE__);
    
    echo "The $filename script has experienced an error.\n"; 
    echo "It failed with the following exception:\n";
    
    echo "Exception:", $e->getMessage(), "\n";
    echo "In file:", $e->getFile(), "\n";
    echo "On line:", $e->getLine(), "\n";       
}

?>
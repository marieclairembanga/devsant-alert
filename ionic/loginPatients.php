<?php


header('Access-Control-Allow-Origin: *');
if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        
            {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET["email"]) && isset($_GET["password"]) ){
	if( !empty($_GET["email"])  && !empty($_GET["password"])  ){

		include"config.php";

		$email=$_GET["email"];
		$password=$_GET["password"];

		$query="SELECT * FROM patients
				where email='".$_GET["email"]."' and password='".$_GET["password"]."'  ";
		$result = $conn->query($query);

    $outp = "";
		if( $rs=$result->fetch_array()) {
			if ($outp != "") {$outp .= ",";}
            $outp .= '{"p_nom":"'  . $rs["nom"] . '",';
            $outp .= '"p_prenom":"'   . $rs["prenom"]        . '",';
            $outp .= '"p_telephone":"'   . $rs["telephone"]        . '",';
            $outp .= '"p_email":"'   . $rs["email"]        . '"}';
		}
		$outp ='{"records":'.$outp.'}';
		$conn->close();

		echo($outp);
	}
}
?>

<?php 
$serve = "localhost";
$user = "root";
$password = "root";
$database = "aula_php";
$port = 3307;

$conn = new mysqli($serve, $user, $password, $database, $port);

if($conn -> connect_error){
    die("Erro na conexão com o banco de dados" . $conn -> connect_error);
}else{
    echo("Conetado com sucesso!!");
}

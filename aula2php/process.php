<?php 

include("conetion.php");

$email = $_POST['email'];
$password = $_POST['password'];
$confirmPassword = $_POST['confirmPassword'];

$sql = "INSERT INTO user (email, password) VALUES ('$email','$password')";

if($conn->query($sql) === TRUE){
    echo"Usuario cadastro com sucesso!";
}
else{
    echo "Erro: " . $sql . "<br>" . $conn->error;
}
$conn->close();
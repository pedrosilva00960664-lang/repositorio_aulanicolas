<?php
$host = "localhost";
$user = "root";
$password = "root";
$database  = "biblioteca";
$port = 3307;

$conn = mysqli_connect($host, $user, $password, $database, $port);

if (!$conn) {
    die("Erro na conexão: " . mysqli_connect_error());
}

// Opcional: definir charset UTF-8
mysqli_set_charset($conn, "utf8mb4");
?>
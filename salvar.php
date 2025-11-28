<?php
require "connection.php";

if ($_POST) {
    $titulo = $_POST['titulo'];
    $autor = $_POST['autor'];
    $ano = $_POST['ano'];
    $categoria = $_POST['categoria'];
    $quantidade = $_POST['quantidade'];

    if (empty($titulo)) {
        echo "<p style='color:#E57373;'>Título não pode ser vazio!</p>";
        exit;
    }

    $sql = "INSERT INTO livros (titulo, autor, ano, categoria, quantidade)
            VALUES ('$titulo', '$autor', '$ano', '$categoria', '$quantidade')";

    if (mysqli_query($conn, $sql)) {
        echo "<p style='color:#26A69A;'>Livro cadastrado com sucesso!</p>";
        echo "<a href='listar.php'>Ver lista de livros</a>";
    } else {
        echo "<p style='color:#E57373;'>Erro ao cadastrar: " . mysqli_error($conn) . "</p>";
    }
}
?>

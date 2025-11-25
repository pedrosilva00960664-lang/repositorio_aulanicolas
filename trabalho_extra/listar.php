<?php
require "connection.php";

$filtro = "";
if (isset($_GET['busca']) && !empty($_GET['busca'])) {
    $busca = $_GET['busca'];
    $filtro = "WHERE titulo LIKE '%$busca%' OR categoria LIKE '%$busca%'";
}

$sql = "SELECT * FROM livros $filtro ORDER BY titulo ASC";
$res = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Lista de Livros</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<nav class="navbar">
    <div class="logo">📚 Biblioteca</div>
    <div class="nav-button">
        <a href="cadastro.php" class="btn-nav">Cadastrar Livro</a>
    </div>
</nav>

<div class="container">
    <h2>Lista de Livros</h2>

    <form method="GET" style="margin-bottom: 15px;">
        <input type="text" name="busca" placeholder="Buscar por título ou categoria">
        <button type="submit">Filtrar</button>
    </form>

    <table>
        <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Ano</th>
            <th>Categoria</th>
            <th>Quantidade</th>
        </tr>

        <?php if(mysqli_num_rows($res) > 0): ?>
            <?php while($livro = mysqli_fetch_assoc($res)): ?>
                <tr>
                    <td><?= $livro['id'] ?></td>
                    <td><?= $livro['titulo'] ?></td>
                    <td><?= $livro['autor'] ?></td>
                    <td><?= $livro['ano'] ?></td>
                    <td><?= $livro['categoria'] ?></td>
                    <td><?= $livro['quantidade'] ?></td>
                </tr>
            <?php endwhile; ?>
        <?php else: ?>
            <tr>
                <td colspan="6" class="error">Nenhum livro encontrado!</td>
            </tr>
        <?php endif; ?>
    </table>
</div>

</body>
</html>

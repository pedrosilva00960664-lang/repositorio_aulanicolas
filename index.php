<?php
require_once 'connection.php';

$mensagem = '';
$tipo_mensagem = '';

// Lista fixa de categorias
$categorias_fixas = [
    'Romance',
    'Didático',
    'Fantasia',
    'Biografia',
    'Tecnologia',
    'História',
    'Ciências',
    'Outros'
];

// Processar envio do formulário
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = trim($_POST['titulo'] ?? '');
    $autor = trim($_POST['autor'] ?? '');
    $ano = isset($_POST['ano']) && $_POST['ano'] !== '' ? (int) $_POST['ano'] : null;
    $categoria = $_POST['categoria'] ?? '';
    $quantidade = isset($_POST['quantidade']) && $_POST['quantidade'] !== '' ? (int) $_POST['quantidade'] : 0;

    if ($titulo === '') {
        $mensagem = 'O título não pode ficar vazio.';
        $tipo_mensagem = 'erro';
    } elseif ($categoria === '') {
        $mensagem = 'Selecione uma categoria.';
        $tipo_mensagem = 'erro';
    } else {
        $sql_insert = "INSERT INTO livros (titulo, autor, ano, categoria, quantidade) VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql_insert);

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "ssisi", $titulo, $autor, $ano, $categoria, $quantidade);
            if (mysqli_stmt_execute($stmt)) {
                $novo_id = mysqli_insert_id($conn);
                mysqli_stmt_close($stmt);
                
                // Redireciona para listagem
                header("Location: listar.php?sucesso=1&novo=" . $novo_id);
                exit;
            } else {
                $mensagem = 'Erro ao cadastrar livro: ' . mysqli_stmt_error($stmt);
                $tipo_mensagem = 'erro';
                mysqli_stmt_close($stmt);
            }
        } else {
            $mensagem = 'Erro ao preparar o comando SQL.';
            $tipo_mensagem = 'erro';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Cadastro de Livros - Biblioteca Escolar</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h1>Biblioteca Escolar</h1>
    <h2>Cadastro de Livros</h2>

    <div class="nav-links">
        <a href="cadastro.php">Cadastrar livro</a> |
        <a href="listar.php">Listar livros</a>
    </div>

    <?php if ($mensagem !== ''): ?>
        <div class="mensagem <?= htmlspecialchars($tipo_mensagem) ?>">
            <?= htmlspecialchars($mensagem) ?>
        </div>
    <?php endif; ?>

    <form method="post" action="cadastro.php">
        <div class="linha">
            <div class="campo">
                <label for="titulo">Título *</label>
                <input type="text" name="titulo" id="titulo" required>
            </div>

            <div class="campo">
                <label for="autor">Autor</label>
                <input type="text" name="autor" id="autor">
            </div>
        </div>

        <div class="linha">
            <div class="campo">
                <label for="ano">Ano de publicação</label>
                <input type="number" name="ano" id="ano" min="0" max="2100">
            </div>

            <div class="campo">
                <label for="categoria">Categoria *</label>
                <select name="categoria" id="categoria" required>
                    <option value="">Selecione...</option>
                    <?php foreach ($categorias_fixas as $cat): ?>
                        <option value="<?= htmlspecialchars($cat) ?>"><?= htmlspecialchars($cat) ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="campo">
                <label for="quantidade">Quantidade disponível</label>
                <input type="number" name="quantidade" id="quantidade" min="0" value="1">
            </div>
        </div>

        <button type="submit" class="botao">Cadastrar</button>
    </form>

    <div class="rodape">
        Mini-sistema de biblioteca escolar em PHP - Cadastro
    </div>
</div>
</body>
</html>
<?php
// listagem.php

session_start();

// --- DEBUG MODE ---
define('DEBUG_MODE', true); // Defina como false para produção

if (DEBUG_MODE) {
    echo '<pre style="background-color: #fff; padding: 15px; border: 1px solid #ddd; margin-bottom: 20px;">';
    echo '<h2>DEBUG: Dados recebidos via GET (para filtros/ordenação)</h2>';
    var_dump($_GET);
    echo '<h2>DEBUG: Sessão atual</h2>';
    var_dump($_SESSION); // Adicionado para ver o ID do livro
    echo '</pre>';
}
// --- FIM DEBUG MODE ---

require_once 'connection.php';

// --- Cores (precisam ser definidas aqui também para o CSS) ---
$cores = [
    'primaria' => '#2C73D2',    // Azul biblioteca
    'secundaria' => '#26A69A',   // Verde suave
    'fundo' => '#F5F5F5',       // Cinza muito claro
    'texto_principal' => '#333333', // Cinza escuro
    'texto_secundario' => '#666666', // Cinza médio
    'erro' => '#E57373',        // Vermelho suave
    'sucesso' => '#81C784'      // Verde claro
];

$mensagem_sucesso = '';
$mensagem_erro = '';
$highlight_book_id = null; // Variável para armazenar o ID do livro a ser destacado

// Verifica se há uma mensagem de sucesso ou um livro recém-cadastrado na sessão
if (isset($_SESSION['cadastro_mensagem_sucesso'])) {
    $mensagem_sucesso = $_SESSION['cadastro_mensagem_sucesso'];
    unset($_SESSION['cadastro_mensagem_sucesso']); // Limpa a mensagem após exibir
}

if (isset($_SESSION['last_inserted_book_id'])) {
    $highlight_book_id = $_SESSION['last_inserted_book_id'];
    unset($_SESSION['last_inserted_book_id']); // Limpa o ID após usá-lo para destacar
}

// --- Lógica de Listagem e Filtragem (SELECT) ---
$sql = "SELECT id, titulo, autor, ano, categoria, quantidade FROM livros";
$params = [];
$types = '';

// Adicionar filtro opcional
if (isset($_GET['busca']) && !empty(trim($_GET['busca']))) {
    $termo_busca = '%' . trim($_GET['busca']) . '%';
    $filtro_por = $_GET['filtro_por'] ?? 'titulo';

    if ($filtro_por == 'titulo') {
        $sql .= " WHERE titulo LIKE ?";
        $params[] = $termo_busca;
        $types .= 's';
    } elseif ($filtro_por == 'categoria') {
        $sql .= " WHERE categoria LIKE ?";
        $params[] = $termo_busca;
        $types .= 's';
    }
}

// Desafio Extra: Ordenação
$ordem_por = $_GET['ordem_por'] ?? 'titulo'; // Padrão: titulo
$direcao_ordem = $_GET['direcao_ordem'] ?? 'ASC'; // Padrão: crescente

if (in_array($ordem_por, ['titulo', 'ano', 'id']) && in_array(strtoupper($direcao_ordem), ['ASC', 'DESC'])) {
    $sql .= " ORDER BY {$ordem_por} {$direcao_ordem}";
} else {
    $sql .= " ORDER BY titulo ASC"; // Ordem padrão se parâmetros inválidos
}

$result = null;
if (!empty($params)) {
    $stmt_list = $conn->prepare($sql);
    if ($stmt_list) {
        call_user_func_array([$stmt_list, 'bind_param'], array_merge([$types], $params));
        $stmt_list->execute();
        $result = $stmt_list->get_result();
    } else {
        $mensagem_erro .= " Erro na preparação da query de listagem: " . $conn->error;
    }
} else {
    $result = $conn->query($sql);
}

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listagem de Livros</title>
    
    <link rel="stylesheet" href="style.css" type="text/css">
</head>
<body>
    <div class="container">
        <h1>Sistema de Biblioteca Escolar</h1>
        <p style="text-align: center;"><a href="cadastro.php" style="color: var(--cor-primaria); text-decoration: none; font-weight: bold;">Cadastrar Novo Livro</a></p>

        <h2>Livros Cadastrados</h2>

        <?php if ($mensagem_sucesso): // Exibe a mensagem de sucesso da sessão ?>
            <div class="message success"><?php echo htmlspecialchars($mensagem_sucesso); ?></div>
        <?php endif; ?>
        <?php if (isset($mensagem_erro) && $mensagem_erro): ?>
            <div class="message error"><?php echo htmlspecialchars($mensagem_erro); ?></div>
        <?php endif; ?>

        <div class="filter-section">
            <form method="GET" action="" style="display: flex; gap: 10px; flex-wrap: wrap; width: 100%;">
                <label for="busca">Buscar:</label>
                <input type="text" id="busca" name="busca" placeholder="Título ou Categoria" value="<?php echo htmlspecialchars($_GET['busca'] ?? ''); ?>">

                <label for="filtro_por">Filtrar por:</label>
                <select id="filtro_por" name="filtro_por">
                    <option value="titulo" <?php echo (isset($_GET['filtro_por']) && $_GET['filtro_por'] == 'titulo') ? 'selected' : ''; ?>>Título</option>
                    <option value="categoria" <?php echo (isset($_GET['filtro_por']) && $_GET['filtro_por'] == 'categoria') ? 'selected' : ''; ?>>Categoria</option>
                </select>

                <button type="submit">Aplicar Filtro</button>
                <button type="button" onclick="window.location.href='listagem.php'">Limpar Filtro</button>
            </form>
        </div>

        <table>
            <thead>
                <tr>
                    <?php
                        $current_query = $_GET; // Copia os parâmetros GET atuais
                        $get_url = function($field, $current_field, $current_direction) use ($current_query) {
                            $query = $current_query;
                            $query['ordem_por'] = $field;
                            $query['direcao_ordem'] = ($current_field == $field && $current_direction == 'ASC') ? 'DESC' : 'ASC';
                            if (empty($query['busca'] ?? '')) unset($query['busca']);
                            if (empty($query['filtro_por'] ?? '')) unset($query['filtro_por']);
                            return http_build_query($query);
                        };
                    ?>
                    <th><a href="?<?php echo $get_url('id', $ordem_por, $direcao_ordem); ?>" style="color:white; text-decoration: none;">ID <?php echo ($ordem_por == 'id' ? ($direcao_ordem == 'ASC' ? '▲' : '▼') : ''); ?></a></th>
                    <th><a href="?<?php echo $get_url('titulo', $ordem_por, $direcao_ordem); ?>" style="color:white; text-decoration: none;">Título <?php echo ($ordem_por == 'titulo' ? ($direcao_ordem == 'ASC' ? '▲' : '▼') : ''); ?></a></th>
                    <th>Autor</th>
                    <th><a href="?<?php echo $get_url('ano', $ordem_por, $direcao_ordem); ?>" style="color:white; text-decoration: none;">Ano <?php echo ($ordem_por == 'ano' ? ($direcao_ordem == 'ASC' ? '▲' : '▼') : ''); ?></a></th>
                    <th>Categoria</th>
                    <th>Quantidade</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($result && $result->num_rows > 0): ?>
                    <?php while ($row = $result->fetch_assoc()): ?>
                        <?php
                            // Adiciona a classe de destaque se o ID corresponder ao livro recém-cadastrado
                            $row_class = ($highlight_book_id == $row['id']) ? 'highlight-row' : '';
                        ?>
                        <tr class="<?php echo $row_class; ?>">
                            <td><?php echo htmlspecialchars($row['id']); ?></td>
                            <td><?php echo htmlspecialchars($row['titulo']); ?></td>
                            <td><?php echo htmlspecialchars($row['autor']); ?></td>
                            <td><?php echo htmlspecialchars($row['ano']); ?></td>
                            <td><?php echo htmlspecialchars($row['categoria']); ?></td>
                            <td><?php echo htmlspecialchars($row['quantidade']); ?></td>
                        </tr>
                    <?php endwhile; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="6">Nenhum livro encontrado.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <?php
    if ($result) $result->close();
    if (isset($stmt_list)) $stmt_list->close();
    $conn->close();
    ?>
</body>
</html>
<link rel="stylesheet" href="style.css">

<div class="container">
    <h2>Cadastrar Livro</h2>
    <form action="salvar.php" method="POST">
        <div class="input-box">
            <label>Título</label>
            <input type="text" name="titulo" required>
        </div>

        <div class="input-box">
            <label>Autor</label>
            <input type="text" name="autor">
        </div>

        <div class="input-box">
            <label>Ano</label>
            <input type="number" name="ano">
        </div>

        <div class="input-box">
            <label>Categoria</label>
            <select name="categoria" required>
                <option value="">Selecione</option>
                <option value="Romance">Romance</option>
                <option value="Didático">Didático</option>
                <option value="Fantasia">Fantasia</option>
                <option value="Biografia">Biografia</option>
            </select>
        </div>

        <div class="input-box">
            <label>Quantidade</label>
            <input type="number" name="quantidade" min="1">
        </div>

        <button type="submit">Cadastrar</button>
    </form>
</div>

<!-- <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>formulario de cadastro </title>
</head>

<body>
    ---Tela de cadastro---
    <h2>CADASTRO</h2>
    <form action="process.php" method="POST">
        <input type="email" placeholder="e-mail" name="email">
        <input type="password" placeholder="senha" name="password">
        <input type="password" placeholder="confirmar senha" name="confirmPassword">
        <input type="submit" placeholder="enviar">
    </form>
</body>

</html> -->
<!-- ----------------------------------------------------------------------------------------------------------------- -->
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="cadastro.css">
</head>

<body>
    <div class="web">
        <div class="login">
            <div class="conteiner1">
                <div class="center">
                    <h2 class="T">BEM-VINDO DE VOLTA</h2>
                    <p>Acesse sua conta agora</p>
                    <a href="login.html"><button class="btn1">ENTRAR</button></a>
                </div>
            </div>
            <div class="conteiner2">
                <h2 class="TT">CRIAR SUA CONTA</h2>
                <form action="process.php" method="POST" class="entrada">

                    <input type="email" placeholder="e-mail" name="email" class="input">
                    <input type="password" placeholder="senha" name="password" class="input">
                    <input type="password" placeholder="confirmar senha" name="confirmPassword" class="input">
                    <a href="login.html"><input type="submit" placeholder="enviar" class="btn"></a>
                </form>
            </div>
        </div>
    </div>
</body>
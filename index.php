<?php
declare(strict_types=1);
session_start();

$historial = $_SESSION['historial'] ?? [];
$total     = $_SESSION['total'] ?? 0;
$inicial   = $historial[0] ?? 1;

// Qué casillas (1-9) de la cuadrícula 3x3 se pintan en cada cara
$pips = [

    2 => [1, 9],
    3 => [1, 5, 9],
    4 => [1, 3, 7, 9],
    5 => [1, 3, 5, 7, 9],
    6 => [1, 3, 4, 6, 7, 9],
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DadoVirtual</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <main class="mesa">
        <h1>DadoVirtual</h1>

        <div class="escena">
            <div class="dado" id="dado" data-inicial="<?= $inicial ?>" aria-hidden="true">
                <?php for ($cara = 1; $cara <= 6; $cara++): ?>
                    <div class="cara cara-<?= $cara ?>">
                        <?php for ($i = 1; $i <= 9; $i++): ?>
                            <span class="pip<?= in_array($i, $pips[$cara], true) ? ' on' : '' ?>"></span>
                        <?php endfor; ?>
                    </div>
                <?php endfor; ?>
            </div>
        </div>

        <p class="resultado" id="resultado" role="status" aria-live="polite">
            <?= $historial ? 'Ha salido un ' . $inicial : 'Tira el dado' ?>
        </p>

        <button class="boton" id="tirar" type="button">Tirar dado</button>
        <p class="ayuda">También vale la barra espaciadora</p>

        <section class="historial">
            <h2>Últimas tiradas <small id="total">(<?= $total ?> en total)</small></h2>
            <ul id="lista">
                <?php foreach ($historial as $valor): ?>
                    <li><?= $valor ?></li>
                <?php endforeach; ?>
            </ul>
            <p class="vacio" id="vacio" <?= $historial ? 'hidden' : '' ?>>Todavía no has tirado nada.</p>
            <button class="enlace" id="reiniciar" type="button">Borrar historial</button>
        </section>
    </main>

    <script src="js/app.js"></script>
</body>
</html>

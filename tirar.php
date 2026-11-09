<?php
declare(strict_types=1);
session_start();
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Usa POST']);
    exit;
}

$_SESSION['historial'] = $_SESSION['historial'] ?? [];
$_SESSION['total']     = $_SESSION['total'] ?? 0;

$accion = $_POST['accion'] ?? 'tirar';
$valor  = null;

if ($accion === 'reiniciar') {
    $_SESSION['historial'] = [];
    $_SESSION['total']     = 0;
} else {
    $valor = random_int(1, 6); // aleatorio de verdad, hecho en el servidor
    array_unshift($_SESSION['historial'], $valor);
    $_SESSION['historial'] = array_slice($_SESSION['historial'], 0, 10);
    $_SESSION['total']++;
}

echo json_encode([
    'valor'     => $valor,
    'historial' => $_SESSION['historial'],
    'total'     => $_SESSION['total'],
]);

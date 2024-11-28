<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userId'];
$items = $data['items'];

// Generar un número de factura único
$invoiceNumber = uniqid('INV-');

// Insertar la devolución en la base de datos
$stmt = $pdo->prepare("INSERT INTO returns (user_id, invoice_number) VALUES (?, ?)");
$stmt->execute([$userId, $invoiceNumber]);

// Opcional: Insertar los productos devueltos
foreach ($items as $item) {
    $stmt = $pdo->prepare("INSERT INTO return_items (return_id, product_id) VALUES (?, ?)");
    $stmt->execute([$pdo->lastInsertId(), $item['id']]);
}

echo json_encode(["message" => "Devolución registrada", "invoiceNumber" => $invoiceNumber]);
?>

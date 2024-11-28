<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);
$role = 'user'; // Rol por defecto

$stmt = $pdo->prepare("INSERT INTO users (email, password, role) VALUES (?, ?, ?)");
$stmt->execute([$email, $password, $role]);

echo json_encode(["message" => "Usuario registrado exitosamente"]);
?>

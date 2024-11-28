<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    echo json_encode(["message" => "Login exitoso", "role" => $user['role']]);
} else {
    http_response_code(401);
    echo json_encode(["message" => "Credenciales incorrectas"]);
}
?>

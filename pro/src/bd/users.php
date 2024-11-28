<?php
include 'db.php';

$stmt = $pdo->query("SELECT id, email, role FROM users");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($users);
?>

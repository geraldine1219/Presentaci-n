<?php
$host = 'localhost';
$db = 'devoluciones';
$user = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host; dbname=$db", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error en la conexión: " . $e->getMessage());
}
?>

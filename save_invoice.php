<?php
// save_invoice.php
include 'db.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $customer_name = $_POST["customer_name"];
    $invoice_date = $_POST["invoice_date"];
    $items = json_decode($_POST["items"], true);
    
    foreach ($items as $item) {
        $description = $item["description"];
        $quantity = $item["quantity"];
        $unit_price = $item["unit_price"];
        $total = $item["total"];
        
        $sql = "INSERT INTO invoice_items (customer_name, invoice_date, description, quantity, unit_price, total) 
                VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssidd", $customer_name, $invoice_date, $description, $quantity, $unit_price, $total);
        if (!$stmt->execute()) {
            echo "Error: " . $stmt->error;
            exit;
        }
    }
    echo "Invoice saved successfully!";
}
?>

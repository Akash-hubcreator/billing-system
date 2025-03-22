document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("invoiceDate").value = new Date().toISOString().split("T")[0];
    
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();
        if (document.getElementById("username").value === "admin" && document.getElementById("password").value === "Admin@123") {
            document.getElementById("loginContainer").style.display = "none";
            document.getElementById("invoiceContainer").style.display = "block";
        } else {
            alert("Invalid login!");
        }
    });
    
    document.getElementById("addItemBtn").addEventListener("click", function () {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" class="description" required></td>
            <td><input type="number" class="quantity" required></td>
            <td><input type="number" class="unitPrice" required></td>
            <td><input type="text" class="totalItem" disabled></td>
            <td><button type="button" class="removeItem">Remove</button></td>
        `;
        document.getElementById("invoiceItems").appendChild(row);
    });
    
    document.getElementById("invoiceForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let items = [];
        document.querySelectorAll("#invoiceItems tr").forEach(row => {
            let description = row.querySelector(".description").value;
            let quantity = row.querySelector(".quantity").value;
            let unitPrice = row.querySelector(".unitPrice").value;
            let total = quantity * unitPrice;
            items.push({ description, quantity, unit_price: unitPrice, total });
        });
        
        let formData = new FormData();
        formData.append("customer_name", document.getElementById("customerName").value);
        formData.append("invoice_date", document.getElementById("invoiceDate").value);
        formData.append("items", JSON.stringify(items));
        
        fetch("save_invoice.php", {
            method: "POST",
            body: formData
        }).then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error("Error:", error));
    });
});

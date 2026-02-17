// 1️⃣ Login check & logout
if (localStorage.getItem("isSellerLoggedIn") !== "true") {
    window.location.href = "login.html";
}

function logout() {
    localStorage.removeItem("isSellerLoggedIn");
    window.location.href = "login.html";
}

// 2️⃣ Load orders & display
function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let table = document.getElementById("ordersTable");
    table.innerHTML = "";

    let searchTerm = document.getElementById("searchInput")?.value.toLowerCase() || "";
    let filteredOrders = orders.filter(order => 
        order.name.toLowerCase().includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm)
    );

    filteredOrders.forEach(order => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.name}</td>
            <td>${order.order}</td>
            <td>${order.time}</td>
            <td>
                <span class="badge ${order.status === "Pending" ? "bg-warning" : "bg-success"}">
                    ${order.status}
                </span>
            </td>
            <td>
                <button class="btn btn-success btn-sm me-1" onclick="completeOrder(${order.id})">Complete</button>
                <button class="btn btn-danger btn-sm" onclick="deleteOrder(${order.id})">Delete</button>
            </td>
        `;
        table.appendChild(row);
    });

    // Update total orders
    document.getElementById("totalOrders").textContent = filteredOrders.length;
}

// 3️⃣ Complete & Delete functions
function completeOrder(id) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders = orders.map(order => {
        if(order.id === id) order.status = "Completed";
        return order;
    });
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
}

function deleteOrder(id) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders = orders.filter(order => order.id !== id);
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
}

// 4️⃣ Auto-refresh every 5 seconds
setInterval(loadOrders, 5000);

// 5️⃣ Load initially
loadOrders();

// 6️⃣ Search input listener
document.getElementById("searchInput")?.addEventListener("input", loadOrders);




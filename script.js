let form = document.getElementById("orderForm");
let orderList = document.getElementById("orderList");

// Load saved orders from browser
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Display orders when page loads
displayOrders();

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let order = document.getElementById("order").value;

    let newOrder = {
        id: Date.now(),
        name: name,
        order: order,
        time: new Date().toLocaleTimeString(),
        status: "Waiting"
    };

    orders.push(newOrder);

    saveOrders();
    displayOrders();

    form.reset();
});

function displayOrders() {
    orderList.innerHTML = "";

    orders.forEach((o, index) => {
        let estimatedTime = (index + 1) * 5;

        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            <div>
                <strong>#${index + 1}</strong> - ${o.name}<br>
                <small>${o.order}</small><br>
                <small>🕒 ${o.time}</small><br>
                <small>⏳ Est: ${estimatedTime} min</small><br>
                <span class="badge bg-${o.status === "Waiting" ? "warning" : "success"}">
                    ${o.status}
                </span>
            </div>

            <div>
                <button class="btn btn-sm btn-success" onclick="markReady(${o.id})">
                    Ready
                </button>
                <button class="btn btn-sm btn-danger ms-2" onclick="deleteOrder(${o.id})">
                    Delete
                </button>
            </div>
        `;

        orderList.appendChild(li);
    });
}

function markReady(id) {
    orders = orders.map(o => {
        if (o.id === id) {
            o.status = "Ready";
        }
        return o;
    });

    saveOrders();
    displayOrders();
}

function deleteOrder(id) {
    orders = orders.filter(o => o.id !== id);
    saveOrders();
    displayOrders();
}

function saveOrders() {
    localStorage.setItem("orders", JSON.stringify(orders));
}




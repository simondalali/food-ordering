let form = document.getElementById("orderForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let order = document.getElementById("order").value;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let newOrder = {
        id: Date.now(),
        name: name,
        order: order,
        time: new Date().toLocaleTimeString(),
        status: "Waiting"
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    form.reset();
    alert("✅ Order placed!");
});

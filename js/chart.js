function getTableOrdersData() {
  // Fetch dữ liệu từ db.json
  fetch("http://localhost:3000/orders")
    .then((response) => response.json())
    .then((orders) => {
      fetch("http://localhost:3000/foods")
        .then((response) => response.json())
        .then((foods) => {
          const dataBills = {};

          orders.forEach((order) => {
            let totalAmount = 0;

            order.items.forEach((item) => {
              // Tìm thông tin món ăn theo id
              const food = foods.find((f) => f.id === item.id);
              if (food) {
                totalAmount += item.quantity * parseFloat(food.price);
              }
            });

            // Gán tổng tiền cho từng id order
            dataBills[order.id] = (dataBills[order.id] || 0) + totalAmount;
          });

          console.log(dataBills);

          // Tạo nhãn và dữ liệu để vẽ biểu đồ
          const tableLabels = Object.keys(dataBills).map((id) => `Table ${id}`);
          const totalBills = Object.values(dataBills);

          console.log(tableLabels);
          console.log(totalBills);

          // Thêm các canvas vào DOM nếu phần tử tồn tại
          const barChartContainer = document.querySelector(".bar-chart");
          const pieChartContainer = document.querySelector(".pie-chart");
          if (barChartContainer && pieChartContainer) {
            // Vẽ biểu đồ cột (Bar Chart)
            const ctx = document.createElement("canvas");
            barChartContainer.appendChild(ctx);

            new Chart(ctx, {
              type: "bar",
              data: {
                labels: tableLabels,
                datasets: [
                  {
                    label: "REVENUE TOTAL",
                    data: totalBills,
                    backgroundColor: "#c5487a",
                    borderColor: "#c5487a",
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
              },
            });

            // Vẽ biểu đồ tròn (Pie Chart)
            const piece = document.createElement("canvas");
            pieChartContainer.appendChild(piece);

            new Chart(piece, {
              type: "pie", // Use 'pie' for creating a pie chart
              data: {
                labels: tableLabels,
                datasets: [
                  {
                    label: "TOTAL REVENUE",
                    data: totalBills,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(255, 206, 86, 0.6)",
                      "rgba(75, 192, 192, 0.6)",
                      "rgba(153, 102, 255, 0.6)",
                      "rgba(255, 159, 64, 0.6)",
                      "rgba(255, 0, 0, 0.6)",
                      "rgba(0, 255, 0, 0.6)",
                      "rgba(0, 0, 255, 0.6)",
                      "rgba(128, 0, 128, 0.6)",
                      "rgba(0, 128, 128, 0.6)",
                      "rgba(128, 128, 0, 0.6)",
                      "rgba(255, 165, 0, 0.6)",
                      "rgba(0, 255, 255, 0.6)",
                      "rgba(255, 0, 255, 0.6)",
                      "rgba(128, 0, 0, 0.6)",
                      "rgba(0, 128, 0, 0.6)",
                      "rgba(0, 0, 128, 0.6)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(255, 206, 86, 0.6)",
                      "rgba(75, 192, 192, 0.6)",
                      "rgba(153, 102, 255, 0.6)",
                      "rgba(255, 159, 64, 0.6)",
                      "rgba(255, 0, 0, 0.6)",
                      "rgba(0, 255, 0, 0.6)",
                      "rgba(0, 0, 255, 0.6)",
                      "rgba(128, 0, 128, 0.6)",
                      "rgba(0, 128, 128, 0.6)",
                      "rgba(128, 128, 0, 0.6)",
                      "rgba(255, 165, 0, 0.6)",
                      "rgba(0, 255, 255, 0.6)",
                      "rgba(255, 0, 255, 0.6)",
                      "rgba(128, 0, 0, 0.6)",
                      "rgba(0, 128, 0, 0.6)",
                      "rgba(0, 0, 128, 0.6)",
                    ],
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
              },
            });
          }
        });
    })
    .catch((error) => console.error("Lỗi:", error));
}

getTableOrdersData();

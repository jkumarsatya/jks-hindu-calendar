const calendar = document.querySelector(".calendar");

const year = 2026;
const month = 5; // June (0=Jan)

const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();

calendar.innerHTML = "";

// Empty cells before first day
for (let i = 0; i < firstDay; i++) {
  const empty = document.createElement("div");
  empty.className = "day";
  empty.style.visibility = "hidden";
  calendar.appendChild(empty);
}

// Actual dates
for (let i = 1; i <= daysInMonth; i++) {
  const day = document.createElement("div");

  day.className = "day";

  day.innerHTML = `
    <div class="date">${i}</div>
    <div class="tithi">शु. तिथि</div>
    <div class="monthname">आषाढ़</div>
  `;

  calendar.appendChild(day);
}

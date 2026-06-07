const calendar = document.querySelector(".calendar");

const year = 2026;
const month = 5; // June

fetch("festivals.json")
  .then(response => response.json())
  .then(festivals => {

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

    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {

      const fullDate =
        `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;

      const festivalObj =
        festivals.find(f => f.date === fullDate);

      const festivalText =
        festivalObj
          ? `<div class="festival">🪔 ${festivalObj.festival}</div>`
          : "";

      const day = document.createElement("div");

      day.className = "day";

      day.innerHTML = `
        <div class="date">${dayNum}</div>
        <div class="tithi">शु. तिथि</div>
        <div class="monthname">आषाढ़</div>
        ${festivalText}
      `;

      calendar.appendChild(day);
    }
  });

const calendar = document.querySelector(".calendar");

calendar.innerHTML = "";

for (let i = 1; i <= 30; i++) {
  const day = document.createElement("div");
  day.className = "day";

  day.innerHTML = `
    <div class="date">${i}</div>
    <div class="tithi">शु. तिथि</div>
    <div class="monthname">आषाढ़</div>
  `;

  calendar.appendChild(day);
}

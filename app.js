const calendar = document.querySelector(".calendar");
const monthTitle = document.getElementById("monthTitle");

let currentYear = 2026;
let currentMonth = 5; // June

const monthNames = [
  "जनवरी",
  "फ़रवरी",
  "मार्च",
  "अप्रैल",
  "मई",
  "जून",
  "जुलाई",
  "अगस्त",
  "सितंबर",
  "अक्टूबर",
  "नवंबर",
  "दिसंबर"
];

function loadCalendar() {

  fetch("festivals.json")
    .then(response => response.json())
    .then(festivals => {

      monthTitle.textContent =
        `${monthNames[currentMonth]} ${currentYear}`;

      const firstDay =
        new Date(currentYear, currentMonth, 1).getDay();

      const daysInMonth =
        new Date(currentYear, currentMonth + 1, 0).getDate();

      calendar.innerHTML = "";

      for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.className = "day";
        empty.style.visibility = "hidden";
        calendar.appendChild(empty);
      }

      for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {

        const fullDate =
          `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;

        const festivalObj =
          festivals.find(f => f.date === fullDate);
const panchangData = {
  "2026-06-15": {
    tithi: "पूर्णिमा",
    month: "आषाढ़",
    nakshatra: "हस्त",
    festival: "गुरु पूर्णिमा"
  },

  "2026-06-26": {
    tithi: "एकादशी",
    month: "आषाढ़",
    nakshatra: "श्रवण",
    festival: "एकादशी"
  }
};
        const festivalText =
          festivalObj
            ? `<div class="festival">🪔 ${festivalObj.festival}</div>`
            : "";

        const day = document.createElement("div");

        day.className = "day";

const today = new Date();

if (
  dayNum === today.getDate() &&
  currentMonth === today.getMonth() &&
  currentYear === today.getFullYear()
) {
  day.classList.add("today");
}

        day.innerHTML = `
          <div class="date">${dayNum}</div>
          <div class="tithi">शु. तिथि</div>
          <div class="monthname">आषाढ़</div>
          ${festivalText}
        `;

        calendar.appendChild(day);
        day.addEventListener("click", () => {

  const data = panchangData[fullDate];

  if (!data) return;

  document.getElementById("popupDate").textContent =
    fullDate;

  document.getElementById("popupTithi").textContent =
    data.tithi;

  document.getElementById("popupMonth").textContent =
    data.month;

  document.getElementById("popupNakshatra").textContent =
    data.nakshatra;

  document.getElementById("popupFestival").textContent =
    data.festival;

  document.getElementById("popup").style.display =
    "block";
});
      }
    });
}

document.getElementById("prev").addEventListener("click", () => {

  currentMonth--;

  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }

  loadCalendar();
});

document.getElementById("next").addEventListener("click", () => {

  currentMonth++;

  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  loadCalendar();
});

loadCalendar();
document.getElementById("todayBtn")
.addEventListener("click", () => {

  const today = new Date();

  currentYear = today.getFullYear();
  currentMonth = today.getMonth();

  loadCalendar();
});
.today{
  border:2px solid #ff9800;
}
document
.getElementById("closePopup")
.addEventListener("click", () => {

  document.getElementById("popup").style.display =
    "none";
});

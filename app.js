// DEBUG - remove later
document.body.innerHTML = "<pre id='debug' style='font-size:11px;padding:10px'></pre>" + document.body.innerHTML;
const dbg = t => { document.getElementById('debug').textContent += t + "\n"; };

window.onerror = (msg, src, line) => dbg("ERROR: " + msg + " line:" + line);

fetch("panchang.json")
  .then(r => { dbg("panchang status: " + r.status); return r.json(); })
  .then(d => dbg("panchang entries: " + d.length))
  .catch(e => dbg("panchang FAILED: " + e));

fetch("festivals.json")
  .then(r => { dbg("festivals status: " + r.status); return r.json(); })
  .then(d => dbg("festivals entries: " + d.length))
  .catch(e => dbg("festivals FAILED: " + e));
const calendar = document.querySelector(".calendar");
const monthTitle = document.getElementById("monthTitle");

let currentYear = 2026;
let currentMonth = 5;

const monthNames = [
  "जनवरी","फ़रवरी","मार्च","अप्रैल","मई","जून",
  "जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"
];

function loadCalendar() {

  Promise.all([
  fetch("festivals.json").then(r => r.json()),
  fetch("panchang.json").then(r => r.json())
])
.then(([festivals, panchang]) => {

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
const panchangObj =
  panchang.find(p => p.date === fullDate);
        const festivalText =
          festivalObj
            ? `<div class="festival">🪔 ${festivalObj.festival}</div>`
            : "";

        const day = document.createElement("div");

        day.className = "day";
        if (festivalObj) {
  day.classList.add("festival-day");
        }

        day.innerHTML = `
          <div class="date">${dayNum}</div>
          <div class="tithi">
  ${panchangObj ? panchangObj.tithi : ""}
</div>

<div class="monthname">
  ${panchangObj ? panchangObj.month : ""}
</div>

<div class="nakshatra">
  ${panchangObj ? panchangObj.nakshatra : ""}
</div>
          ${festivalText}
        `;

        calendar.appendChild(day);
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

document.getElementById("todayBtn").addEventListener("click", () => {
  const today = new Date();

  currentYear = today.getFullYear();
  currentMonth = today.getMonth();

  loadCalendar();
});

loadCalendar();

// --- GOOGLE APPS SCRIPT WEB APP URL ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzo5fXkwO-LZljrBA8Tv25D--LXMY2powpWCPgaPywkpinCKGd-YqCdJIVqk0Y_qTN57Q/exec";

// --- FINANCES HANDLER ---
const financeForm = document.getElementById('financeForm');
if (financeForm) {
  financeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const invested = parseFloat(document.getElementById('investedInput').value) || 0;
    const val = parseFloat(document.getElementById('valueInput').value) || 0;
    
    localStorage.setItem('ayo_invested', invested);
    localStorage.setItem('ayo_value', val);
    
    loadFinances();
    financeForm.reset();
  });
}

function loadFinances() {
  const invested = parseFloat(localStorage.getItem('ayo_invested')) || 0;
  const val = parseFloat(localStorage.getItem('ayo_value')) || 0;
  const pnl = val - invested;

  const invElem = document.getElementById('totalInvested');
  const valElem = document.getElementById('currentValue');
  const pnlElem = document.getElementById('profitLoss');

  if (invElem) invElem.textContent = invested.toLocaleString();
  if (valElem) valElem.textContent = val.toLocaleString();
  if (pnlElem) {
    pnlElem.textContent = pnl.toLocaleString();
    pnlElem.style.color = pnl >= 0 ? '#4ade80' : '#f87171';
  }
}

// --- SCHOOL HANDLER ---
let courses = JSON.parse(localStorage.getItem('ayo_courses')) || [
  { name: "Workplace Math 11", current: "75%", goal: "85%", teacher: "TBD" },
  { name: "Woodworking", current: "91%", goal: "95%", teacher: "TBD" }
];

const courseForm = document.getElementById('courseForm');
if (courseForm) {
  courseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newCourse = {
      name: document.getElementById('courseName').value,
      current: document.getElementById('currentMark').value,
      goal: document.getElementById('goalMark').value,
      teacher: document.getElementById('teacher').value || "N/A"
    };
    courses.push(newCourse);
    localStorage.setItem('ayo_courses', JSON.stringify(courses));
    renderCourses();
    courseForm.reset();
  });
}

function renderCourses() {
  const tbody = document.getElementById('schoolBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  courses.forEach(c => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${c.name}</strong></td>
        <td>${c.current}</td>
        <td>${c.goal}</td>
        <td>${c.teacher}</td>
      </tr>
    `;
  });
}

// --- SCHOLARSHIPS GOOGLE SHEETS SYNC HANDLER ---
const scholarshipForm = document.getElementById('scholarshipForm');
if (scholarshipForm) {
  scholarshipForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('schName').value;
    const amount = document.getElementById('schAmount').value || "N/A";
    const deadline = document.getElementById('schDeadline').value || "TBD";
    const status = document.getElementById('schStatus').value;

    const rowData = [name, amount, deadline, "No", "No", "Check", status];

    // Send data to Google Sheets
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rowData)
    }).then(() => {
      setTimeout(fetchScholarshipsFromSheet, 1000);
    });
    
    scholarshipForm.reset();
  });
}

function fetchScholarshipsFromSheet() {
  fetch(GOOGLE_SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('scholarshipBody');
      if (!tbody) return;
      tbody.innerHTML = '';
      data.forEach((s, idx) => {
        tbody.innerHTML += `
          <tr>
            <td><strong>${s[0] || ''}</strong></td>
            <td>${s[1] || ''}</td>
            <td>${s[2] || ''}</td>
            <td>${s[3] || 'No'}</td>
            <td>${s[4] || 'No'}</td>
            <td>${s[5] || 'Check'}</td>
            <td><span style="color:#38bdf8">${s[6] || ''}</span></td>
          </tr>
        `;
      });
    })
    .catch(err => console.error("Error fetching sheet data:", err));
}

// Init everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadFinances();
  renderCourses();
  fetchScholarshipsFromSheet();
});

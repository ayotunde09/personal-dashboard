// --- FINANCES HANDLER ---
const financeForm = document.getElementById('financeForm');
financeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const invested = parseFloat(document.getElementById('investedInput').value) || 0;
  const val = parseFloat(document.getElementById('valueInput').value) || 0;
  
  localStorage.setItem('ayo_invested', invested);
  localStorage.setItem('ayo_value', val);
  
  loadFinances();
  financeForm.reset();
});

function loadFinances() {
  const invested = parseFloat(localStorage.getItem('ayo_invested')) || 0;
  const val = parseFloat(localStorage.getItem('ayo_value')) || 0;
  const pnl = val - invested;

  document.getElementById('totalInvested').textContent = invested.toLocaleString();
  document.getElementById('currentValue').textContent = val.toLocaleString();
  
  const pnlElement = document.getElementById('profitLoss');
  pnlElement.textContent = pnl.toLocaleString();
  pnlElement.style.color = pnl >= 0 ? '#4ade80' : '#f87171';
}

// --- SCHOOL HANDLER ---
let courses = JSON.parse(localStorage.getItem('ayo_courses')) || [
  { name: "Workplace Math 11", current: "75%", goal: "85%", teacher: "TBD" },
  { name: "Woodworking", current: "91%", goal: "95%", teacher: "TBD" }
];

const courseForm = document.getElementById('courseForm');
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

function renderCourses() {
  const tbody = document.getElementById('schoolBody');
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

// --- SCHOLARSHIPS HANDLER ---
let scholarships = JSON.parse(localStorage.getItem('ayo_scholarships')) || [
  { name: "BCIT Entrance Award", amount: "Varies", deadline: "2027", pr: "No", citizen: "No", cadets: "No", status: "Planning" },
  { name: "Air Cadet League Aviation Award", amount: "Varies", deadline: "Spring 2027", pr: "No (Verify)", citizen: "No (Verify)", cadets: "Yes", status: "Not started" }
];

const scholarshipForm = document.getElementById('scholarshipForm');
scholarshipForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newSch = {
    name: document.getElementById('schName').value,
    amount: document.getElementById('schAmount').value || "N/A",
    deadline: document.getElementById('schDeadline').value || "TBD",
    pr: "No",
    citizen: "No",
    cadets: "Check",
    status: document.getElementById('schStatus').value
  };
  scholarships.push(newSch);
  localStorage.setItem('ayo_scholarships', JSON.stringify(scholarships));
  renderScholarships();
  scholarshipForm.reset();
});

function renderScholarships() {
  const tbody = document.getElementById('scholarshipBody');
  tbody.innerHTML = '';
  scholarships.forEach(s => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${s.name}</strong></td>
        <td>${s.amount}</td>
        <td>${s.deadline}</td>
        <td>${s.pr}</td>
        <td>${s.citizen}</td>
        <td>${s.cadets}</td>
        <td><span style="color:#38bdf8">${s.status}</span></td>
      </tr>
    `;
  });
}

// Init all on startup
document.addEventListener('DOMContentLoaded', () => {
  loadFinances();
  renderCourses();
  renderScholarships();
});

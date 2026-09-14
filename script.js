// Initial sample data
const scholarships = [
  {
    name: "BCIT Entrance Award",
    amount: "Varies",
    deadline: "2027",
    eligibility: "Open to international/non-PR students entering BCIT programs",
    prReq: "No",
    citizenReq: "No",
    field: "BCIT / AME",
    cadets: "No",
    status: "Planning",
    link: "https://www.bcit.ca/financial-aid/"
  },
  {
    name: "Air Cadet League of Canada Award",
    amount: "Varies",
    deadline: "Spring 2027",
    eligibility: "Active Air Cadet entering aviation/trades",
    prReq: "Check Rules",
    citizenReq: "Check Rules",
    field: "Aviation / Cadets",
    cadets: "Yes",
    status: "Not started",
    link: "#"
  }
];

// Render scholarships to page
function renderScholarships() {
  const tbody = document.getElementById("scholarshipBody");
  tbody.innerHTML = "";

  scholarships.forEach(item => {
    const row = `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td>${item.amount}</td>
        <td>${item.deadline}</td>
        <td>${item.eligibility}</td>
        <td>${item.prReq}</td>
        <td>${item.citizenReq}</td>
        <td>${item.field}</td>
        <td>${item.cadets}</td>
        <td>${item.status}</td>
        <td><a href="${item.link}" target="_blank" style="color:#38bdf8">Link</a></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Load on page startup
document.addEventListener("DOMContentLoaded", renderScholarships);

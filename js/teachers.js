/* ===============================
   KONFIGURASI
================================ */
const DATA_URL = "data/teachers_rows.json";
const ROWS_PER_PAGE = 5;

let teachers = [];
let filteredTeachers = [];
let currentPage = 1;

/* ===============================
   FETCH DATA
================================ */
async function fetchTeachers() {
  const res = await fetch(DATA_URL);
  teachers = await res.json();
  filteredTeachers = teachers;
  renderTable();
}

/* ===============================
   RENDER TABLE
================================ */
function renderTable() {
  const tbody = document.getElementById("teachersTable");
  tbody.innerHTML = "";

  const start = (currentPage - 1) * ROWS_PER_PAGE;
  const end = start + ROWS_PER_PAGE;
  const pageData = filteredTeachers.slice(start, end);

  pageData.forEach((t, index) => {
    const row = document.createElement("tr");
    row.className = "border-t hover:bg-slate-50";

    row.innerHTML = `
      <td class="px-4 py-3">${start + index + 1}</td>
      <td class="px-4 py-3">${t.nip}</td>
      <td class="px-4 py-3 font-medium">${t.name}</td>
      <td class="px-4 py-3">${t.address}</td>
      <td class="px-4 py-3 text-slate-500">
        ${new Date(t.created_at).toLocaleDateString("id-ID")}
      </td>
    `;
    tbody.appendChild(row);
  });

  updatePagination();
}

/* ===============================
   PAGINATION
================================ */
function updatePagination() {
  const totalPages = Math.ceil(filteredTeachers.length / ROWS_PER_PAGE);

  document.getElementById("paginationInfo").textContent =
    `Halaman ${currentPage} dari ${totalPages}`;

  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

document.getElementById("prevBtn").onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
};

document.getElementById("nextBtn").onclick = () => {
  const totalPages = Math.ceil(filteredTeachers.length / ROWS_PER_PAGE);
  if (currentPage < totalPages) {
    currentPage++;
    renderTable();
  }
};

/* ===============================
   SEARCH
================================ */
document.getElementById("searchInput").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();

  filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(keyword) ||
    t.nip.toLowerCase().includes(keyword)
  );

  currentPage = 1;
  renderTable();
});

/* ===============================
   INIT
================================ */
fetchTeachers();

/* =========================================================
   ADMIN – USERS WHO TOOK TESTS
   ========================================================= */

/* ===============================
   SAFETY CHECK
================================ */
if (!window.ADMIN_ENV || !ADMIN_ENV.API_BASE_URL) {
  console.error("❌ ADMIN_ENV.API_BASE_URL is not defined");
}

/* ===============================
   LOAD USERS WHO TOOK TESTS
================================ */
async function loadUsersWhoTookTests() {
  const tableBody = document.getElementById("usersTestsTableBody");

  if (!tableBody) {
    console.error("❌ usersTestsTableBody not found in HTML");
    return;
  }

  tableBody.innerHTML = `
    <tr>
      <td colspan="5">Loading users...</td>
    </tr>
  `;

  try {
    /* 1️⃣ Fetch all users */
    const usersRes = await fetch(`${ADMIN_ENV.API_BASE_URL}/users`);
    if (!usersRes.ok) throw new Error("Failed to fetch users");

    const usersData = await usersRes.json();
    const users = usersData.users || usersData;

    if (!Array.isArray(users) || users.length === 0) {
      tableBody.innerHTML = `
        <tr><td colspan="5">No users found</td></tr>
      `;
      return;
    }

    tableBody.innerHTML = "";

    /* 2️⃣ For each user → fetch diagnoses */
    for (const user of users) {
      const userId = user.id || user.user_id || user.sub;
      if (!userId) continue;

      try {
        const diagRes = await fetch(
          `${ADMIN_ENV.API_BASE_URL}/diagnoses/${userId}`
        );

        if (!diagRes.ok) continue;

        const diagData = await diagRes.json();

        if (
          !diagData ||
          !diagData.diagnosis_count ||
          diagData.diagnosis_count < 1
        ) {
          continue; // user did NOT take tests
        }

        /* 3️⃣ Display each diagnosis */
        diagData.diagnoses.forEach(d => {
          const row = document.createElement("tr");

          const completedDate = d.test_completed_at
            ? new Date(d.test_completed_at).toLocaleString()
            : "-";

          row.innerHTML = `
            <td style="font-size:12px;">${userId}</td>
            <td>${diagData.diagnosis_count}</td>
            <td>${d.test_name || "-"}</td>
            <td style="max-width:260px;">
              <strong>${d.diagnosis_text}</strong>
            </td>
            <td>${completedDate}</td>
          `;

          tableBody.appendChild(row);
        });

      } catch (innerErr) {
        console.warn(`⚠️ Failed diagnoses for user ${userId}`);
      }
    }

    if (tableBody.children.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5">No users have taken tests yet</td>
        </tr>
      `;
    }

  } catch (err) {
    console.error("❌ Error loading users who took tests:", err);
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" style="color:red;">Failed to load data</td>
      </tr>
    `;
  }
}

/* ===============================
   AUTO LOAD
================================ */
document.addEventListener("DOMContentLoaded", loadUsersWhoTookTests);

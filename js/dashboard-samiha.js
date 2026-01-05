/* =========================================================
   USER DASHBOARD – ASK SAMIHA
   - 700 char limit
   - Logged-in users only
   - POST question with user sub
========================================================= */

const DASHBOARD_API =
  "https://jej5dh7680.execute-api.me-central-1.amazonaws.com/questions-for-samiha";

/* ===============================
   GET LOGGED USER SUB
================================ */
async function getDashboardUserSub() {
  try {
    const sessionInfo = await CognitoAuth.getCurrentSession();
    if (
      !sessionInfo ||
      !sessionInfo.session ||
      !sessionInfo.session.isValid()
    ) {
      return null;
    }

    return sessionInfo.session.getIdToken().payload.sub;
  } catch (err) {
    return null;
  }
}

/* ===============================
   CHAR COUNT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("dashboardSamihaQuestion");
  const counter = document.getElementById("dashboardCharCount");

  if (!input || !counter) return;

  input.addEventListener("input", () => {
    counter.textContent = `${input.value.length} / 700`;
  });
});

/* ===============================
   SUBMIT QUESTION
================================ */
async function submitDashboardSamihaQuestion() {
  const input = document.getElementById("dashboardSamihaQuestion");
  const statusEl = document.getElementById("dashboardSamihaStatus");

  const questionText = input.value.trim();
  if (!questionText) {
    statusEl.textContent = "Please write your question first.";
    return;
  }

  const userSub = await getDashboardUserSub();
  if (!userSub) {
    alert("Please login to ask Samiha a question.");
    window.location.href = "login.html";
    return;
  }

  statusEl.textContent = "Sending your question...";

  try {
    const res = await fetch(DASHBOARD_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userSub,
        question: questionText
      })
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || "Failed to send");
    }

    input.value = "";
    document.getElementById("dashboardCharCount").textContent = "0 / 700";
    statusEl.textContent = "✅ Your question has been sent to Samiha.";

  } catch (err) {
    console.error(err);
    statusEl.textContent =
      "❌ Failed to send question. Please try again.";
  }
}

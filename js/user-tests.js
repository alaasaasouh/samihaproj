/* =========================================================
   USER TESTS MODULE
   - Load tests list
   - Load test questions
   - Start session
   - Collect answers
   - Submit results
========================================================= */

/* ===============================
   GLOBAL STATE
================================ */
let CURRENT_TEST_ID = null;
let CURRENT_SESSION_ID = null;
let CURRENT_QUESTIONS = [];

/* ===============================
   SAFETY CHECK
================================ */
if (!window.ADMIN_ENV || !ADMIN_ENV.API_BASE_URL) {
  console.error("ADMIN_ENV.API_BASE_URL is not defined");
}

/* ===============================
   LOAD TESTS LIST
================================ */
async function loadUserTests() {
  const listEl = document.getElementById("testsList");
  const statusEl = document.getElementById("testsStatus");

  if (!listEl || !statusEl) return;

  statusEl.textContent = "Loading tests...";
  listEl.innerHTML = "";

  try {
    const res = await fetch(`${ADMIN_ENV.API_BASE_URL}/tests`);
    if (!res.ok) throw new Error("Failed to load tests");

    const data = await res.json();
    const tests = Array.isArray(data) ? data : data.tests || [];

    if (tests.length === 0) {
      statusEl.textContent = "No tests available.";
      return;
    }

    statusEl.textContent = "";

    tests.forEach(test => {
      const card = document.createElement("div");
      card.className = "test-card";

      card.innerHTML = `
        <h3>${test.title || test.name || "Untitled Test"}</h3>
        <p>${test.description || ""}</p>

        <div class="test-actions">
          <button class="btn-start">Start Test</button>
        </div>
      `;

      card.querySelector(".btn-start")
        .addEventListener("click", () => startTest(test.id));

      listEl.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    statusEl.textContent = "Error loading tests.";
  }
}

/* ===============================
   START TEST
================================ */
async function startTest(testId) {
  try {
    // 1️⃣ Get Cognito session
    const sessionInfo = await CognitoAuth.getCurrentSession();
    if (!sessionInfo || !sessionInfo.session || !sessionInfo.session.isValid()) {
      alert("You must be logged in to start a test.");
      return;
    }

    const userId = sessionInfo.session.getIdToken().payload.sub;

    // 2️⃣ Create backend session
    const sessionRes = await fetch(`${ADMIN_ENV.API_BASE_URL}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        test_id: testId
      })
    });

    if (!sessionRes.ok) {
      const txt = await sessionRes.text();
      console.error("SESSION ERROR:", txt);
      throw new Error("Failed to start session");
    }

    const sessionData = await sessionRes.json();
    console.log("SESSION RESPONSE:", sessionData);

    CURRENT_SESSION_ID =
      sessionData.id ||
      sessionData.session_id ||
      sessionData.session?.id;

    if (!CURRENT_SESSION_ID) {
      throw new Error("Session ID missing from backend response");
    }

    CURRENT_TEST_ID = testId;

    // 3️⃣ Load test questions
    const testRes = await fetch(`${ADMIN_ENV.API_BASE_URL}/tests/${testId}`);
    if (!testRes.ok) throw new Error("Failed to load test content");

    const questions = await testRes.json();
    if (!Array.isArray(questions)) {
      throw new Error("Invalid questions format");
    }

    CURRENT_QUESTIONS = questions;

    // 4️⃣ Render UI
    renderTest(questions);

  } catch (err) {
    console.error(err);
    alert(err.message || "Error starting test");
  }
}

/* ===============================
   RENDER QUESTIONS
================================ */
function renderTest(questions) {
  const section = document.getElementById("tests");
  if (!section) return;

  section.classList.add("active");
  section.innerHTML = `
    <div class="results-header">
      <h2>${questions[0]?.name || "Test"}</h2>
      <p>${questions[0]?.description || ""}</p>
    </div>

    <form id="testForm">
      <div id="questionsContainer"></div>

      <button type="submit" class="btn-start">
        Submit Test
      </button>
    </form>
  `;

  const qContainer = document.getElementById("questionsContainer");

  questions.forEach((q, index) => {
    const block = document.createElement("div");
    block.className = "question-block";

    block.innerHTML = `
      <h4>${index + 1}. ${q.question}</h4>
      ${Object.entries(q.choices).map(([key, text]) => `
        <label style="display:block;margin:6px 0;">
          <input type="radio"
                 name="question_${q.id}"
                 value="${key}"
                 data-text="${text}">
          ${key.toUpperCase()}. ${text}
        </label>
      `).join("")}
    `;

    qContainer.appendChild(block);
  });

  document
    .getElementById("testForm")
    .addEventListener("submit", submitTest);
}

/* ===============================
   SUBMIT TEST
================================ */
async function submitTest(e) {
  e.preventDefault();

  if (!CURRENT_SESSION_ID) {
    alert("Session not found. Please restart the test.");
    return;
  }

  const answers = {};

  CURRENT_QUESTIONS.forEach(q => {
    const selected = document.querySelector(
      `input[name="question_${q.id}"]:checked`
    );

    if (selected) {
      answers[q.id] = {
        index: selected.value,
        text: selected.dataset.text,
        question: q.question
      };
    }
  });

  if (Object.keys(answers).length !== CURRENT_QUESTIONS.length) {
    alert("Please answer all questions before submitting.");
    return;
  }

  try {
    const res = await fetch(
      `${ADMIN_ENV.API_BASE_URL}/sessions/${CURRENT_SESSION_ID}/submit`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
      }
    );

    if (!res.ok) {
      const txt = await res.text();
      console.error("SUBMIT ERROR:", txt);
      throw new Error("Failed to submit test");
    }

    alert("✅ Test submitted successfully!");

  } catch (err) {
    console.error(err);
    alert(err.message || "Error submitting test");
  }
}

/* ===============================
   AUTO LOAD
================================ */
document.addEventListener("DOMContentLoaded", loadUserTests);

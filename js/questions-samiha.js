/* =========================================================
   QUESTIONS FOR SAMIHA – INDEX PAGE LOGIC
   - Login check
   - Open Ask Samiha modal
   - Post question with user sub
========================================================= */

const ASK_MODAL_ID = "askSamihaModal";
const QUESTION_INPUT_ID = "samihaQuestionInput";
const SEND_BTN_ID = "sendSamihaQuestionBtn";
const STATUS_ID = "askSamihaStatus";
const CHAR_COUNT_ID = "samihaCharCount";
const CLOSE_BTN_ID = "closeAskSamihaBtn";

const QUESTIONS_API =
  "https://jej5dh7680.execute-api.me-central-1.amazonaws.com/questions-for-samiha";

/* ===============================
   HELPER: GET LOGGED USER
================================ */
async function getLoggedUserSub() {
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
   OPEN CUSTOMIZED QUESTIONS
   (called instead of handleLink)
================================ */
async function openAskSamiha() {
  const userSub = await getLoggedUserSub();

  if (!userSub) {
    showLoginRequired();
    return;
  }

  openAskModal();
}

/* ===============================
   LOGIN REQUIRED POPUP
================================ */
function showLoginRequired() {
  alert("Please login to ask Samiha a question.");
  window.location.href = "login.html";
}

/* ===============================
   OPEN / CLOSE MODAL
================================ */
function openAskModal() {
  document.getElementById(ASK_MODAL_ID).classList.remove("hidden");
  document.getElementById(QUESTION_INPUT_ID).value = "";
  document.getElementById(STATUS_ID).textContent = "";
  updateCharCount();
}

function closeAskModal() {
  document.getElementById(ASK_MODAL_ID).classList.add("hidden");
}

/* ===============================
   CHAR COUNT
================================ */
function updateCharCount() {
  const input = document.getElementById(QUESTION_INPUT_ID);
  const count = input.value.length;
  document.getElementById(CHAR_COUNT_ID).textContent = `${count} / 700`;
}

/* ===============================
   SEND QUESTION
================================ */
async function sendSamihaQuestion() {
  const statusEl = document.getElementById(STATUS_ID);
  const input = document.getElementById(QUESTION_INPUT_ID);

  const questionText = input.value.trim();
  if (!questionText) {
    statusEl.textContent = "Please write your question.";
    return;
  }

  const userSub = await getLoggedUserSub();
  if (!userSub) {
    showLoginRequired();
    return;
  }

  statusEl.textContent = "Sending your question...";

  try {
    const res = await fetch(QUESTIONS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userSub,
        question: questionText
      })
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || "Failed to send question");
    }

    statusEl.textContent = "✅ Question sent successfully!";
    input.value = "";
    updateCharCount();

  } catch (err) {
    console.error(err);
    statusEl.textContent = "❌ Failed to send question. Please try again.";
  }
}

/* ===============================
   EVENTS
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById(QUESTION_INPUT_ID);
  const sendBtn = document.getElementById(SEND_BTN_ID);
  const closeBtn = document.getElementById(CLOSE_BTN_ID);

  if (input) {
    input.addEventListener("input", updateCharCount);
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", sendSamihaQuestion);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeAskModal);
  }
});

/* ===============================
   HIJACK CUSTOM MODAL LINKS
   (replace handleLink for custom)
================================ */
function handleLink(event, type) {
  event.preventDefault();

  if (type === "custom") {
    openAskSamiha();
    closeExpandedCard();
    return;
  }

  // fallback for other types (existing behavior)
  console.log("Unhandled link:", type);
}

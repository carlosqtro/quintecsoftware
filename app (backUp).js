/* ==========================================================================
   APP.JS - CÓDIGO COMPLETO QUINTEC SOFTWARE
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. VARIABLES Y DATOS GLOBALES (Para los juegos)
   -------------------------------------------------------------------------- */

const quizData = [
  {
    q: "¿Qué propiedad CSS crea una grilla?",
    options: ["display: flex", "display: grid", "grid-template"],
    ans: 1,
  },
  {
    q: "¿Qué etiqueta HTML es semántica?",
    options: ["div", "span", "header"],
    ans: 2,
  },
  {
    q: "¿Qué significa DOM?",
    options: ["Document Object Model", "Data Object Mode", "Digital Ordinance"],
    ans: 0,
  },
];

let currentQ = 0;
let score = 0;

/* --------------------------------------------------------------------------
   2. FUNCIONES GLOBALES (Accesibles desde el HTML via onclick)
   -------------------------------------------------------------------------- */

// --- CONTROL DE MODALES ---
function openModal(modal) {
  const overlay = document.getElementById("modal-overlay");
  // Si pasamos el ID como string o el elemento directo
  const modalEl =
    typeof modal === "string" ? document.getElementById(modal) : modal;

  if (!overlay || !modalEl) return;

  overlay.classList.remove("hidden");
  modalEl.classList.remove("hidden");

  // Pequeño delay para permitir la transición CSS
  setTimeout(() => {
    overlay.classList.add("active");
    modalEl.classList.add("active");
  }, 10);
}

function closeModals() {
  const overlay = document.getElementById("modal-overlay");
  if (!overlay) return;

  overlay.classList.remove("active");
  document
    .querySelectorAll(".game-modal")
    .forEach((m) => m.classList.remove("active"));

  setTimeout(() => {
    overlay.classList.add("hidden");
    document
      .querySelectorAll(".game-modal")
      .forEach((m) => m.classList.add("hidden"));

    // Limpieza de estados al cerrar
    document
      .querySelectorAll(".feedback-msg")
      .forEach((f) => (f.innerHTML = ""));
    document
      .querySelectorAll(".option-btn")
      .forEach((b) => b.classList.remove("correct", "wrong"));
    const logicInput = document.getElementById("logic-input");
    if (logicInput) logicInput.value = "";
  }, 300);
}

// --- JUEGO 1: RETO DE CÓDIGO ---
function checkCodeAnswer(btn, isCorrect) {
  const feedback = document.getElementById("code-feedback");
  if (isCorrect) {
    btn.classList.add("correct");
    feedback.innerHTML =
      '<span style="color: #4ade80">¡Correcto! JS concatena número y string.</span>';
  } else {
    btn.classList.add("wrong");
    feedback.innerHTML =
      '<span style="color: #ff4d4d">Ups, intenta de nuevo.</span>';
  }
}

// --- JUEGO 2: QUIZ TECH ---
function loadQuizQuestion() {
  currentQ = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const qData = quizData[currentQ];
  const qEl = document.getElementById("quiz-question");
  const tEl = document.getElementById("quiz-text");
  const optsDiv = document.getElementById("quiz-options");
  const feed = document.getElementById("quiz-feedback");

  if (qEl) qEl.innerText = `Pregunta ${currentQ + 1}/${quizData.length}`;
  if (tEl) tEl.innerText = qData.q;
  if (feed) feed.innerHTML = "";

  if (optsDiv) {
    optsDiv.innerHTML = "";
    qData.options.forEach((opt, index) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerText = opt;
      btn.onclick = () => checkQuizAnswer(index, qData.ans);
      optsDiv.appendChild(btn);
    });
  }
}

function checkQuizAnswer(selected, correct) {
  if (selected === correct) score++;

  if (currentQ < quizData.length - 1) {
    currentQ++;
    showQuestion();
  } else {
    // Fin del juego
    const optsDiv = document.getElementById("quiz-options");
    const tEl = document.getElementById("quiz-text");
    const qEl = document.getElementById("quiz-question");

    if (optsDiv) {
      optsDiv.innerHTML = `
                <div style="text-align:center">
                    <h3>¡Quiz Terminado!</h3>
                    <p>Tu puntaje: ${score}/${quizData.length}</p>
                    <button class="cta-button small" onclick="closeModals()">Cerrar</button>
                </div>
            `;
    }
    if (tEl) tEl.innerText = "";
    if (qEl) qEl.innerText = "";
  }
}

// --- JUEGO 3: LÓGICA (FIBONACCI) ---
function checkLogic() {
  const input = document.getElementById("logic-input");
  const feedback = document.getElementById("logic-feedback");

  if (!input || !feedback) return;

  // Secuencia: 1, 1, 2, 3, 5, 8... (Fibonacci: 5+8 = 13)
  if (parseInt(input.value) === 13) {
    feedback.innerHTML =
      '<span style="color: #4ade80">¡Genio! Es la secuencia Fibonacci.</span>';
  } else {
    feedback.innerHTML =
      '<span style="color: #ff4d4d">Incorrecto. Pista: Suma los dos anteriores.</span>';
  }
}

// --- ACORDEÓN DE CURSOS (Para página de detalle) ---
function toggleChapter(header) {
  const chapter = header.parentElement;
  if (chapter) chapter.classList.toggle("open");
}

/* --------------------------------------------------------------------------
   3. INICIALIZACIÓN DEL DOM (Se ejecuta al cargar la página)
   -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM cargado. Inicializando Quintec Scripts...");

  // --- A. NAVBAR SCROLL ---
  const navbar = document.getElementById("mainNavbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // --- B. LISTENERS PARA ABRIR MODALES (Si existen los botones) ---
  const btnCode = document.querySelector(".code-challenge .game-btn");
  const btnQuiz = document.querySelector(".quiz-challenge .game-btn");
  const btnLogic = document.querySelector(".logic-challenge .game-btn");

  // Overlay click para cerrar
  const overlay = document.getElementById("modal-overlay");
  if (overlay) overlay.addEventListener("click", closeModals);

  if (btnCode) {
    btnCode.addEventListener("click", () =>
      openModal(document.getElementById("modal-code"))
    );
  }
  if (btnQuiz) {
    btnQuiz.addEventListener("click", () => {
      openModal(document.getElementById("modal-quiz"));
      loadQuizQuestion();
    });
  }
  if (btnLogic) {
    btnLogic.addEventListener("click", () =>
      openModal(document.getElementById("modal-logic"))
    );
  }

  // --- C. SLIDER MOBILE (Auto-scroll inicial) ---
  const productCards = document.querySelector(".product-cards");
  if (window.innerWidth <= 768 && productCards) {
    const firstCard = productCards.querySelector(".product-card");
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const gap = parseInt(window.getComputedStyle(productCards).gap) || 15;
      productCards.scrollLeft =
        cardWidth + gap - productCards.offsetWidth * 0.1;
    }
  }

  // --- D. FORMULARIO DE CONTACTO (SOLUCIÓN REDIRECCIÓN) ---
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    console.log("✅ Formulario de contacto detectado.");

    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault(); // 1. Detiene la recarga de página
      console.log("🚀 Enviando datos a Formspark...");

      const btn = this.querySelector(".submit-btn");
      const originalText = btn.innerHTML;
      const actionUrl = this.getAttribute("action");

      // 2. Estado de carga visual
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
      btn.disabled = true;
      btn.style.opacity = "0.7";

      // 3. Preparar datos como JSON
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      try {
        // 4. Petición AJAX (Fetch)
        const response = await fetch(actionUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("✅ Envío exitoso.");
          btn.innerHTML = '¡Enviado! <i class="fa-solid fa-check"></i>';
          btn.style.background = "#4ade80"; // Verde éxito
          btn.style.color = "#000";
          contactForm.reset();
        } else {
          throw new Error("Error en la respuesta del servidor");
        }
      } catch (error) {
        console.error("❌ Error enviando:", error);
        btn.innerHTML = "Error. Intenta de nuevo.";
        btn.style.background = "#f43f5e"; // Rojo error
      } finally {
        // 5. Restaurar botón después de 3 segundos
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = "";
          btn.style.color = "";
          btn.style.opacity = "1";
          btn.disabled = false;
        }, 3000);
      }
    });
  } else {
    // Log informativo (no es error) para páginas que no tienen formulario
    // console.log("ℹ️ No se encontró formulario en esta página.");
  }
});

// Funcion para el active en el Nav
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section"); // Asume que tienes varias secciones
  const navLinks = document.querySelectorAll("nav .nav-links a");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id"); // Asume que las secciones tienen id
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });

  // Si no hay sección actual, mantener activo "Home"
  if (currentSection === "") {
    document
      .querySelector('nav .nav-links a[href="#home"]')
      .classList.add("active");
  }
});

// Selecciona el ícono de la hamburguesa, el menú de navegación y el body
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const body = document.body;

// Añade un evento para mostrar/ocultar el menú al hacer clic en la hamburguesa
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  body.classList.toggle("menu-open"); // Bloquear/desbloquear scroll en el fondo
});

// Opción adicional para cerrar el menú si se hace clic en un enlace del menú
const menuLinks = document.querySelectorAll(".nav-links a"); // Selecciona todos los enlaces del menú
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active"); // Oculta el menú
    body.classList.remove("menu-open"); // Permite scroll en el fondo nuevamente
  });
});

// Formulario

// Asegúrate de que este código JS está colocado después del HTML o dentro de un evento DOMContentLoaded
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita que el formulario recargue la página

    // Obtén los datos del formulario
    const formData = new FormData(this);

    try {
      // Enviar los datos del formulario al backend en C#
      const response = await fetch("http://localhost:5128/api/Email", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        alert(result); // Mensaje de éxito
      } else {
        alert("Error al enviar el correo.");
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Hubo un error al enviar el correo.");
    }
  });

// Integration OpenIA
// Elementos del chat
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotBody = document.getElementById("chatbot-body");
const chatbotToggle = document.getElementById("chatbot-toggle");

// Alternar el chat al hacer clic
chatbotToggle.addEventListener("click", function () {
  if (
    chatbotBody.style.display === "none" ||
    chatbotBody.style.display === ""
  ) {
    chatbotBody.style.display = "block";
    chatbotToggle.innerHTML = "&#x25BC;"; // Flecha hacia abajo
  } else {
    chatbotBody.style.display = "none";
    chatbotToggle.innerHTML = "&#x25B2;"; // Flecha hacia arriba
  }
});

// Enviar el mensaje al backend
document
  .getElementById("chatbot-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const userInput = document.getElementById("user-input").value;

    if (userInput.trim() !== "") {
      // Agregar el mensaje del usuario al chat
      const userMessage = document.createElement("div");
      userMessage.textContent = "Tú: " + userInput;
      userMessage.classList.add("user-message"); // Asignar clase para el estilo
      document.getElementById("messages").appendChild(userMessage);

      // Llamada al backend
      try {
        const response = await fetch("http://localhost:5128/api/ChatGPT", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: userInput }),
        });

        const result = await response.json();

        // Verifica si el resultado tiene la respuesta esperada
        if (result && result.message) {
          const botMessage = document.createElement("div");
          botMessage.textContent = "ChatGPT: " + result.message;
          botMessage.classList.add("bot-message"); // Asignar clase para el estilo
          document.getElementById("messages").appendChild(botMessage);
        } else {
          const errorMessage = document.createElement("div");
          errorMessage.textContent = "Error: Respuesta no válida.";
          errorMessage.classList.add("bot-message"); // Mostrar mensaje de error como respuesta de bot
          document.getElementById("messages").appendChild(errorMessage);
        }
      } catch (error) {
        console.error("Error al enviar la consulta:", error);
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "Error al conectarse con ChatGPT.";
        errorMessage.classList.add("bot-message");
        document.getElementById("messages").appendChild(errorMessage);
      }
    }

    // Limpiar el input
    document.getElementById("user-input").value = "";
  });

// document
//   .getElementById("chatgptForm")
//   .addEventListener("submit", async function (e) {
//     e.preventDefault(); // Evitar que el formulario recargue la página

//     const question = document.getElementById("question").value;

//     try {
//       const response = await fetch("http://localhost:5128/api/ChatGPT", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ question: question }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Error:", errorData.message);
//         alert("Error al comunicarse con ChatGPT: " + errorData.message);
//         return;
//       }

//       const result = await response.json();
//       document.getElementById("responseText").innerText =
//         result.choices[0].message.content; // Mostrar la respuesta de ChatGPT
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Hubo un error al conectar con el servidor.");
//     }
//   });

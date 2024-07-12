$(document).ready(function () {
  // jQuery document ready function: se ejecuta cuando el DOM está completamente cargado

  // Typing animation function
  (function ($) {
      $.fn.writeText = function (content) {
          var contentArray = content.split(""),
              current = 0,
              elem = this;
          setInterval(function () {
              if (current < contentArray.length) {
                  elem.text(elem.text() + contentArray[current++]);
              }
          }, 80);
      };
  })(jQuery);

  // Input text for typing animation
  $("#holder").writeText("¿El Alcohol perjudica tu rendimiento laboral?");

  // Initialize WOW.js (para animaciones en scroll)
  new WOW().init();

  // Function to handle navigation menu and sidebar animations
  var main = function () {
      // Open sidebar on click
      $(".fa-bars").click(function () {
          $(".nav-screen").animate(
              {
                  right: "0px"
              },
              200
          );

          $("body").animate(
              {
                  right: "285px"
              },
              200
          );
      });

      // Close sidebar on click
      $(".fa-times").click(function () {
          $(".nav-screen").animate(
              {
                  right: "-285px"
              },
              200
          );

          $("body").animate(
              {
                  right: "0px"
              },
              200
          );
      });

      // Close sidebar when a navigation link is clicked
      $(".nav-links a").click(function () {
          $(".nav-screen").animate(
              {
                  right: "-285px"
              },
              500
          );

          $("body").animate(
              {
                  right: "0px"
              },
              500
          );
      });
  };

  // Call the main function when the document is ready
  $(document).ready(main);

  // Initialize fullpage.js for full-page scrolling sections
  $("#fullpage").fullpage({
      scrollBar: true,
      responsiveWidth: 400,
      navigation: true,
      navigationTooltips: ['Inicio', 'Edad', 'Género', 'Frecuencia', 'Cuantas', 'Sentido', 'Medida', 'Falta', 'Bajo', 'Crees', 'Conclusión'],
      anchors: ['inicio', 'edad', 'genero', 'frecuencia', 'cuantas', 'sentido', 'medida', 'falta', 'bajo', 'crees', 'conclusion'],
      menu: "#myMenu",
      fitToSection: false,

      // Callback function after loading each section
      afterLoad: function (anchorLink, index) {
          // Manipulate elements based on section index

          // For first section
          if (index == 1) {
              $(".fa-chevron-down").each(function () {
                  $(this).css("opacity", "1"); // Make down arrows visible
              });
              $(".header-links a").each(function () {
                  $(this).css("color", "white"); // Set header links color to white
              });
              $(".header-links").css("background-color", "transparent"); // Make header background transparent
          } else { // For other sections
              $(".header-links a").each(function () {
                  $(this).css("color", "black"); // Set header links color to black
              });
              $(".header-links").css("background-color", "white"); // Set header background to white
          }

          // For second section
          if (index == 2) {
              // Animate skill bars
              $(".skillbar").each(function () {
                  $(this).find(".skillbar-bar").animate({
                      width: $(this).attr("data-percent")
                  }, 2500);
              });
          }
      }
  });

  // Move to next section when clicking a button with id "moveDown"
  $(document).on("click", "#moveDown", function () {
      $.fn.fullpage.moveSectionDown();
  });

  // Navigate to specific section using fullpage.js API
  $(document).on("click", "#skills", function () {
      $.fn.fullpage.moveTo(2);
  });

  $(document).on("click", "#projects", function () {
      $.fn.fullpage.moveTo(3);
  });

  $(document).on("click", "#contact", function () {
      $.fn.fullpage.moveTo(4);
  });

  // Smooth scrolling for anchor links
  $(function () {
      $("a[href*=#]:not([href=#])").click(function () {
          if (
              location.pathname.replace(/^\//, "") ==
              this.pathname.replace(/^\//, "") &&
              location.hostname == this.hostname
          ) {
              var target = $(this.hash);
              target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
              if (target.length) {
                  $("html,body").animate({
                      scrollTop: target.offset().top
                  }, 700);
                  return false;
              }
          }
      });
  });

  // AJAX form submission
  $(function () {
      var form = $("#ajax-contact"); // Get the form element
      var formMessages = $("#form-messages"); // Get the div to display messages

      $(form).submit(function (e) {
          e.preventDefault(); // Prevent default form submission

          var formData = $(form).serialize(); // Serialize form data

          // Submit form using AJAX
          $.ajax({
              type: "POST",
              url: $(form).attr("action"),
              data: formData
          })
          .done(function (response) {
              // Handle success: show success message, clear form fields
              $(formMessages).removeClass("error").addClass("success").text(response);
              $("#name, #email, #message").val("");
          })
          .fail(function (data) {
              // Handle failure: show error message
              $(formMessages).removeClass("success").addClass("error");
              if (data.responseText !== "") {
                  $(formMessages).text(data.responseText);
              } else {
                  $(formMessages).text("Oops! An error occurred and your message could not be sent.");
              }
          });
      });
  });
});

// Vanilla JavaScript for drawing charts using Chart.js
document.addEventListener('DOMContentLoaded', function () {
  // Define contexts for multiple charts
  const ctx1 = document.getElementById('chart1').getContext('2d');
  const ctx2 = document.getElementById('chart2').getContext('2d');
  // (continuar con ctx3 hasta ctx10)

  // Sample data for charts
  const data = [
      { label: 'Red', data: [12, 19, 3, 5, 2, 3] },
      { label: 'Blue', data: [2, 3, 20, 5, 1, 4] },
      // (continuar con datos para cada gráfico)
  ];

  // Array de contextos para los gráficos
  const charts = [ctx1, ctx2, ctx3, ctx4, ctx5, ctx6, ctx7, ctx8, ctx9, ctx10];

  // Colores para los gráficos
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  // Creación de los gráficos utilizando Chart.js
  charts.forEach((ctx, index) => {
      new Chart(ctx, {
          type: 'pie',
          data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // Etiquetas para las partes del gráfico
              datasets: [{
                  label: data[index].label,
                  data: data[index].data, // Datos para el gráfico
                  backgroundColor: [
                      colors[index],
                      colors[(index + 1) % 10],
                      colors[(index + 2) % 10],
                      colors[(index + 3) % 10],
                      colors[(index + 4) % 10],
                      colors[(index + 5) % 10],
                  ],
              }],
          },
          options: {
              responsive: true, // Gráficos responsivos
              maintainAspectRatio: false, // No mantener relación de aspecto
          },
      });
  });
});

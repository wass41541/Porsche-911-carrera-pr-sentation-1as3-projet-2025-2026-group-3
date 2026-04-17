document.addEventListener("DOMContentLoaded", function () {

  const counters = document.querySelectorAll(".counter");
  const section = document.getElementById("performance");
  let started = false;

  function startCounters() {

    counters.forEach(counter => {

      let target = parseFloat(counter.getAttribute("data-target"));
      let current = 0;
      let step = target / 100;

      let interval = setInterval(function () {

        current += step;

        if (current >= target) {
          current = target;
          clearInterval(interval);
        }

        if (target < 10) {
          counter.innerText = current.toFixed(1);
        } else {
          counter.innerText = Math.floor(current);
        }

      }, 20);

    });

  }

  function startOnce() {
    if (!started) {
      started = true;
      startCounters();
    }
  }

  const link = document.querySelector('a[href="#performance"]');

  if (link) {
    link.addEventListener("click", function () {
      setTimeout(startOnce, 300);
    });
  }


  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startOnce();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(section);
});
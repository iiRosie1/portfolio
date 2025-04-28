// Load navbar and footer into every page
document.addEventListener("DOMContentLoaded", () => {
    fetch("navbar.html")
      .then((res) => res.text())
      .then((data) => {
        document.getElementById("navbar").innerHTML = data;
      });
  
    fetch("footer.html")
      .then((res) => res.text())
      .then((data) => {
        document.getElementById("footer").innerHTML = data;
      });
  });

// Gradient interaction
  document.addEventListener("mousemove", (e) => {
    const hero = document.querySelector(".hero");
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    hero.style.setProperty("--x", `${x}%`);
    hero.style.setProperty("--y", `${y}%`);
  });
  
  //Typing
  class TxtType {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        this.txt = this.isDeleting
            ? fullTxt.substring(0, this.txt.length - 1)
            : fullTxt.substring(0, this.txt.length + 1);

        this.el.querySelector('.wrap').innerHTML = this.txt;

        let delta = 150 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => this.tick(), delta);
    }
  }

  
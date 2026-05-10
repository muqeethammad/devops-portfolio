const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true,
  antialias: true,
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(window.devicePixelRatio);

/* =========================
   OBJECT
========================= */

const geometry =
  new THREE.IcosahedronGeometry(8, 1);

const material =
  new THREE.MeshStandardMaterial({

    color: 0xffffff,

    wireframe: true,

    transparent: true,

    opacity: 0.6,

  });

const shape =
  new THREE.Mesh(geometry, material);

scene.add(shape);

/* =========================
   LIGHT
========================= */

const light =
  new THREE.PointLight(0xffffff, 1.4);

light.position.set(20, 20, 20);

scene.add(light);

/* =========================
   START STATE
========================= */

shape.scale.set(2.2, 2.2, 2.2);

camera.position.z = 10;

let progress = 0;

let targetProgress = 1;

/* =========================
   EASING
========================= */

function easeOutCubic(t) {

  return 1 - Math.pow(1 - t, 3);

}

/* =========================
   ANIMATION LOOP
========================= */

function animate() {

  requestAnimationFrame(animate);

  progress +=
    (targetProgress - progress) * 0.015;

  const eased = easeOutCubic(progress);

  /* SCALE */

  const scale =
    2.2 - eased * 1.2;

  shape.scale.set(scale, scale, scale);

  /* CAMERA */

  camera.position.z =
    10 + eased * 15;

  /* IDLE ROTATION */

  shape.rotation.y += 0.0012;

  shape.rotation.x += 0.0007;

  renderer.render(scene, camera);

}

animate();

/* =========================
   RESIZE
========================= */

window.addEventListener('resize', () => {

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  camera.aspect =
    window.innerWidth /
    window.innerHeight;

  camera.updateProjectionMatrix();

});

/* =========================
   HERO TEXT ANIMATION
========================= */

window.addEventListener('load', () => {

  const h1 =
    document.querySelector('.hero-text h1');

  const h2 =
    document.querySelector('.hero-text h2');

  const p =
    document.querySelector('.hero-text p');

  const btn =
    document.querySelector('.hero-text button');

  setTimeout(() => {

    h1.style.opacity = 1;

    h1.style.transform =
      'translateY(0)';

  }, 200);

  setTimeout(() => {

    h2.style.opacity = 1;

    h2.style.transform =
      'translateY(0)';

  }, 500);

  setTimeout(() => {

    p.style.opacity = 1;

    p.style.transform =
      'translateY(0)';

  }, 800);

  setTimeout(() => {

    btn.style.opacity = 1;

    btn.style.transform =
      'translateY(0)';

  }, 1100);

});

/* =========================
   SCROLL REVEAL
========================= */

const reveals =
  document.querySelectorAll('.reveal');

const observer =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add('active');

        }

      });

    },

    {
      threshold: 0.12
    }

  );

reveals.forEach((reveal) => {

  observer.observe(reveal);

});

/* =========================
   ACTIVE NAVBAR LINKS
========================= */

const sections =
  document.querySelectorAll("section");

const navLinks =
  document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop;

    if (scrollY >= sectionTop - 200) {

      current =
        section.getAttribute("id");

    }

  });

  navLinks.forEach((link) => {

    link.classList.remove("active");

    if (
      link.getAttribute("href")
      === `#${current}`
    ) {

      link.classList.add("active");

    }

  });

});
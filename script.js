const openBtn = document.getElementById("openBtn");
const nextBtn = document.getElementById("nextBtn");

const welcomeSection =
document.getElementById("welcomeSection");

const letterSection =
document.getElementById("letterSection");

const photoSection =
document.getElementById("photoSection");

const music =
document.getElementById("bgMusic");

const musicBtn =
document.getElementById("musicBtn");

/* =========================
   FLOATING HEARTS
========================= */

function createHeart(){

  const heart =
  document.createElement("div");

  heart.classList.add("heart");

  heart.innerHTML =
  Math.random() > 0.5 ? "🤍" : "✨";

  heart.style.left =
  Math.random() * 100 + "vw";

  heart.style.bottom = "-30px";

  heart.style.fontSize =
  Math.random() * 15 + 10 + "px";

  heart.style.animationDuration =
  Math.random() * 8 + 8 + "s";

  document.body.appendChild(heart);

  setTimeout(()=>{
    heart.remove();
  },16000);
}

setInterval(createHeart,700);

/* =========================
   OPEN TRANSITION
========================= */

openBtn.addEventListener("click", async ()=>{

  music.play().catch(()=>{});

  musicBtn.classList.remove("hidden");

  welcomeSection.classList.add(
    "zoom-transition"
  );

  await delay(1500);

  welcomeSection.classList.remove("active");

  letterSection.classList.add("active");

  letterSection.classList.add("fade-in");

  startLetter();
});

/* =========================
   TYPEWRITER
========================= */

async function startLetter(){

  const lines =
  document.querySelectorAll(".line");

  for(const line of lines){

    line.classList.add("visible");

    const text =
    line.dataset.text;

    await typeText(line,text);

    await delay(500);
  }

  await delay(5000);

  nextBtn.classList.remove("hidden");
  nextBtn.classList.add("show-next");
}

function typeText(element,text){

  return new Promise(resolve=>{

    element.innerHTML =
    '<span class="cursor">|</span>';

    let i = 0;

    const interval =
    setInterval(()=>{

      element.innerHTML =
      text.substring(0,i+1) +
      '<span class="cursor">|</span>';

      i++;

      if(i >= text.length){

        clearInterval(interval);

        element.innerHTML = text;

        resolve();
      }

    },70);

  });

}

/* =========================
   NEXT
========================= */

nextBtn.addEventListener("click",async()=>{

  letterSection.classList.add(
    "zoom-transition"
  );

  await delay(1200);

  letterSection.classList.remove("active");

  photoSection.classList.add("active");

  photoSection.classList.add("fade-in");
});

/* =========================
   MUSIC
========================= */

musicBtn.addEventListener("click",()=>{

  if(music.paused){

    music.play();
    musicBtn.innerHTML = "🎵";

  }else{

    music.pause();
    musicBtn.innerHTML = "🔇";
  }

});

/* =========================
   HELPERS
========================= */

function delay(ms){
  return new Promise(resolve=>{
    setTimeout(resolve,ms);
  });
}
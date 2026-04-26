const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('startOverlay');
const song = document.getElementById('mySong');
const photoContainer = document.getElementById('photoContainer');

let width, height, points = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function initHeart() {
    for (let i = 0; i < 100; i++) {
        points.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            R: 2.5,
            f: "hsla(0, 100%, 50%, 0.8)"
        });
    }
}

function speak(text) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'bn-BD';
    window.speechSynthesis.speak(msg);
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);
    points.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > width) p.vx *= -1;
        if(p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = p.f;
        ctx.arc(p.x, p.y, p.R, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animate);
}

startBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    speak("স্বাগতম বস এনাফুল! দেখ তোমার জন্য কি অপেক্ষা করছে।");
    
    setTimeout(() => {
        song.play().catch(() => console.log("Audio play blocked"));
        initHeart();
        animate();
        
        setTimeout(() => {
            photoContainer.classList.add('show');
            speak("আই লাভ ইউ ঋতু");
            document.getElementById('mainMessage').innerText = "আই লাভ ইউ ঋতু";
        }, 3000);
    }, 1000);
});

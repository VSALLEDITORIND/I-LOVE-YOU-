const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('startOverlay');
// ভিডিও রেফারেন্স (index.html এ এই আইডি থাকতে হবে)
const video = document.getElementById('myVideo'); 
const photoContainer = document.getElementById('photoContainer');

let width, height, points = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function initHeart() {
    points = []; // কণাগুলো রিসেট করা
    for (let i = 0; i < 100; i++) {
        points.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            R: 2.5,
            f: "hsla(0, 100%, 50%, 0.8)"
        });
    }
}

// ভয়েস মেসেজ ফাংশন
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
        p.x += p.vx; 
        p.y += p.vy;
        
        // স্ক্রিনের দেওয়ালে ধাক্কা খেয়ে ফিরে আসা
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
    
    // ১. আপনার নাম ধরে ওয়েলকাম জানাবে
    speak("স্বাগতম বস এনাফুল! দেখ তোমার জন্য কি অপেক্ষা করছে।");
    
    setTimeout(() => {
        // ২. ভিডিও প্লে হবে (সাউন্ড সহ)
        if(video) {
            video.play().catch(err => console.log("Video playback error:", err));
        }
        
        // ৩. হার্ট অ্যানিমেশন শুরু
        initHeart();
        animate();
        
        // ৪. নির্দিষ্ট সময় পর ছবি এবং ফাইনাল মেসেজ
        setTimeout(() => {
            if(photoContainer) {
                photoContainer.classList.add('show');
            }
            speak("আই লাভ ইউ ঋতু");
            document.getElementById('mainMessage').innerText = "আই লাভ ইউ ঋতু";
        }, 4000); // ভিডিও শুরু হওয়ার ৪ সেকেন্ড পর ছবি আসবে
    }, 1500); // ওয়েলকাম মেসেজের জন্য ১.৫ সেকেন্ড অপেক্ষা
});

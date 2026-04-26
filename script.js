// আপনার আগের script.js এর ভেতর নিচের অংশগুলো আপডেট করুন

const photoContainer = document.getElementById('photoContainer');
const startBtn = document.getElementById('startBtn');

// ভয়েস মেসেজ ফাংশন (আপনার নাম ধরে ডাকবে)
function speak(text) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'bn-BD'; // বাংলা ভয়েস
    window.speechSynthesis.speak(msg);
}

startBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    
    // ১. আপনার নাম ধরে ওয়েলকাম (এখানে আপনার নাম বসিয়ে নিন)
    speak("স্বাগতম, [আপনার নাম]! দেখ তোমার জন্য কি অপেক্ষা করছে।");

    setTimeout(() => {
        song.play();
        initHeart();
        animate();
        setInterval(createHeartRain, 400);

        // ২. চারপাশ থেকে লাভ এসে মিডল পয়েন্ট তৈরি হওয়া (৫ সেকেন্ড পর)
        setTimeout(() => {
            photoContainer.classList.add('show');
            speak("আই লাভ ইউ ঋতু"); // ভয়েস বলবে আই লাভ ইউ ঋতু
            
            // ৩. টাইপিং মেসেজ
            typeEffect(document.getElementById('mainMessage'), "আই লাভ ইউ ঋতু", 150, () => {
                setTimeout(() => {
                    typeEffect(document.getElementById('subMessage'), "তুমি আমার জীবনের শ্রেষ্ঠ উপহার...", 100);
                }, 1000);
            });
        }, 5000);
        
    }, 2000);
});

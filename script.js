/* ================================
   1. LOADER LOGIC
   ================================ */
function handleLoader() {
    const loaderOverlay = document.getElementById('loader-overlay');
    const loaderText = document.getElementById('loader-text');
    if (loaderOverlay && loaderText) {
        const message = "SWAGAT NAHI KAROGE HAMARA?";
        let i = 0;
        function typeWriter() {
            if (i < message.length) {
                loaderText.innerHTML += message.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    loaderOverlay.classList.add('fade-out');
                    setTimeout(() => { loaderOverlay.style.display = 'none'; }, 1000);
                }, 1000);
            }
        }
        typeWriter();
    }
}

/* ================================
   2. SPARK GENERATOR
   ================================ */
function createSparks() {
    const container = document.getElementById('sparks-container');
    if (!container) return;
    for (let i = 0; i < 50; i++) {
        const spark = document.createElement('div');
        spark.classList.add('spark');
        spark.style.left = Math.random() * 100 + 'vw';
        spark.style.animationDuration = (Math.random() * 3 + 2) + 's';
        spark.style.animationDelay = (Math.random() * 5) + 's';
        const size = Math.random() * 3 + 1 + 'px';
        spark.style.width = size;
        spark.style.height = size;
        container.appendChild(spark);
    }
}

/* ================================
   3. EDITABLE TIMER LOGIC
   ================================ */
function initTimer() {
    const inputsDiv = document.getElementById('timer-inputs');
    if (!inputsDiv) return;

    const hInput = document.getElementById('t-hour');
    const mInput = document.getElementById('t-min');
    const sInput = document.getElementById('t-sec');
    const messageDiv = document.getElementById('timer-message');

    const btnStart = document.getElementById('btn-start');
    const btnPause = document.getElementById('btn-pause');
    const btnReset = document.getElementById('btn-reset');

    let totalTime = 0;
    let timerId = null;
    let isRunning = false;

    function pad(num) {
        return num.toString().padStart(2, '0');
    }

    function calculateTime() {
        let h = parseInt(hInput.value) || 0;
        let m = parseInt(mInput.value) || 0;
        let s = parseInt(sInput.value) || 0;
        return (h * 3600) + (m * 60) + s;
    }

    function updateInputs(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = (seconds % 60);

        hInput.value = pad(h);
        mInput.value = pad(m);
        sInput.value = pad(s);
        
        const allInputs = [hInput, mInput, sInput];
        allInputs.forEach(inp => {
            // Default: White text
            inp.className = "big-input"; 
            
            // Only trigger Red Blink if <= 10 SECONDS
            if (seconds <= 10 && seconds > 0) {
                inp.classList.add('danger');
            } 
        });
    }

    function finishTimer() {
        clearInterval(timerId);
        isRunning = false;
        inputsDiv.style.display = 'none'; 
        messageDiv.classList.remove('hidden'); 
        [hInput, mInput, sInput].forEach(inp => inp.disabled = false);
    }

    function startTimer() {
        if (isRunning) return;
        
        [hInput, mInput, sInput].forEach(inp => inp.disabled = true);
        
        totalTime = calculateTime(); 
        
        if (totalTime <= 0) return;

        isRunning = true;
        timerId = setInterval(() => {
            totalTime--;
            if (totalTime < 0) {
                finishTimer();
            } else {
                updateInputs(totalTime);
            }
        }, 1000);
    }

    function pauseTimer() {
        isRunning = false;
        clearInterval(timerId);
        [hInput, mInput, sInput].forEach(inp => inp.disabled = false);
    }

    function resetTimer() {
        pauseTimer();
        hInput.value = "01";
        mInput.value = "20";
        sInput.value = "00";
        inputsDiv.style.display = 'flex';
        messageDiv.classList.add('hidden');
        [hInput, mInput, sInput].forEach(inp => {
            inp.className = "big-input";
            inp.disabled = false;
        });
    }

    btnStart.addEventListener('click', startTimer);
    btnPause.addEventListener('click', pauseTimer);
    btnReset.addEventListener('click', resetTimer);
    
    [hInput, mInput, sInput].forEach(inp => {
        inp.addEventListener('blur', () => {
            let val = parseInt(inp.value) || 0;
            if (inp !== hInput && val > 59) val = 59;
            inp.value = pad(val);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    handleLoader();
    createSparks();
    initTimer();
});
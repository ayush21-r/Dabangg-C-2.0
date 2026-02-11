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
   3. TIMER LOGIC
   ================================ */
function initTimer() {
    const timerDisplay = document.getElementById('timer');
    if (!timerDisplay) return;

    const btnStart = document.getElementById('btn-start');
    const btnPause = document.getElementById('btn-pause');
    const btnReset = document.getElementById('btn-reset');

    const TOTAL_TIME = 80 * 60; // 80 minutes
    let timeLeft = TOTAL_TIME;
    let timerId = null;
    let isRunning = false;

    function format(time) {
        const h = Math.floor(time / 3600).toString().padStart(2, '0');
        const m = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const s = (time % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }

    function updateDisplay() {
        if (timeLeft <= 0) {
            timerDisplay.textContent = "TIME UP!";
            timerDisplay.classList.add('time-up');
            clearInterval(timerId);
            return;
        }

        timerDisplay.textContent = format(timeLeft);
        timerDisplay.className = "";
        
        if (timeLeft <= 300) timerDisplay.classList.add('danger');
        else if (timeLeft <= 600) timerDisplay.classList.add('warning');
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
        }, 1000);
    }

    function pauseTimer() {
        isRunning = false;
        clearInterval(timerId);
    }

    function resetTimer() {
        pauseTimer();
        timeLeft = TOTAL_TIME;
        updateDisplay();
        timerDisplay.className = "";
    }

    btnStart.addEventListener('click', startTimer);
    btnPause.addEventListener('click', pauseTimer);
    btnReset.addEventListener('click', resetTimer);
}

document.addEventListener('DOMContentLoaded', () => {
    handleLoader();
    createSparks();
    initTimer();
});
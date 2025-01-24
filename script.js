document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000, // Animation duration
        easing: 'ease-in-out', // Easing function
        once: true // Whether animation should only happen once
    });

    const container = document.getElementById('container');

    function moveNoButton() {
        const noButton = document.querySelector('.move-no');
        if (noButton) {
            const randomX = Math.floor(Math.random() * 300) - 150; // Random X position
            const randomY = Math.floor(Math.random() * 300) - 150; // Random Y position
            noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }
    }

    function nextStep(step) {
        if (step === '1') {
            container.innerHTML = `
                <div class="scene animate__animated animate__fadeInLeft" data-aos="fade-left">
                    <div class="img-container">
                        <img src="img/pookie_car.jpeg" alt="Scene 2">
                    </div>
                    <h1>Valentine's day is coming right?</h1>
                    <button onclick="nextStep('2')">Yeah</button>
                </div>
            `;
        } else if (step === '2') {
            container.innerHTML = `
                <div class="scene animate__animated animate__fadeInRight" data-aos="fade-right">
                    <div class="img-container" id="img-container-step2">
                        <img src="img/car_prop.jpeg" alt="Scene 3">
                    </div>
                    <div id="text-container">
                        <h1 id="line1" style="display:none;">Sooo🫥</h1>
                        <h1 id="line2" style="display:none;">Ummm😶</h1>
                        <h1 id="line3" style="display:none;">Ummmmmmmmm😶</h1>
                        <h1 id="line4" style="display:none;">Will you</h1>
                        <h1 id="line5" style="display:none;">YESS YOU!!!</h1>
                        <h1 id="line6" style="display:none;">Be my valentine's day date?<img width="40" height="40" src="https://img.icons8.com/?size=160&id=xxxfxvvUdtuR&format=png" alt="img"/></h1>
                    </div>
                    <button id="yesButton" style="display:none;" onclick="nextStep('yes')">Yes</button>
                    <button id="noButton" style="display:none;" onclick="nextStep('no')">No</button>
                </div>
            `;
            displayLines();
        } else if (step === 'yes') {
            container.innerHTML = `
                <div id="cont" class="scene animate__animated animate__zoomIn" data-aos="zoom-in">
                    <div class="img-container">
                        <img src="img/dog_prop.jpeg" alt="Scene 4">
                    </div>
                    <h1 class="glow">Great! 🥰</h1>
                    <p>Can't wait for Valentine's Day with you!</p>
                    <form id="emailForm">
                        <input type="text" id="usr_name" name="name" placeholder="Tell me your name" required>
                        <input type="submit" value="Send">
                    </form>
                </div>
            `;
            document.getElementById("emailForm").addEventListener("submit", function (e) {
                e.preventDefault();
                const name = document.getElementById("usr_name").value;
                const emailParams = {
                    to_email: "techtrans427@gmail.com",
                    from_name: name,
                };
                if (emailjs) {
                    emailjs.send("service_vems89p", "template_sdpqtjl", emailParams)
                        .then((response) => {
                            alert("Email sent successfully!");
                            console.log("SUCCESS!", response.status, response.text);
                            document.getElementById("emailForm").remove();
                            document.getElementById("cont").innerHTML += `
                                <p>Thank you, ${name}! I'll be waiting for the coming Valentine's Day 💖</p>
                            `;
                        })
                        .catch((error) => {
                            alert("Failed to send email. Please try again.");
                            console.log("FAILED...", error);
                        });
                } else {
                    alert("EmailJS is not initialized properly.");
                }
            });
        } else if (step === 'no') {
            container.innerHTML = `
                <div class="scene animate__animated animate__flipInX" data-aos="flip-left">
                    <div class="img-container">
                        <img src="img/silly_car.jpeg" alt="Scene 5">
                    </div>
                    <h1>You sure about it? 😔</h1>
                    <button onclick="nextStep('pwease1')">Yes</button>
                    <button class="move-no" onclick="moveNoButton()">No</button>
                </div>
            `;
        } else if (step === 'pwease1') {
            container.innerHTML = `
                <div class="scene animate__animated animate__flipInY" data-aos="flip-right">
                    <div class="img-container">
                        <img src="img/sad_bear.gif" alt="Scene 6">
                    </div>
                    <h1>Really? Pwease🥺</h1>
                    <button onclick="nextStep('yes')">Fine, Yes</button>
                    <button onclick="nextStep('reallyNo2')">No</button>
                </div>
            `;
        } else if (step === 'reallyNo1' || step === 'reallyNo2') {
            container.innerHTML = `
                <div class="scene animate__animated animate__fadeInUp" data-aos="fade-up">
                    <div class="img-container">
                        <img src="img/crying_car.gif" alt="Scene 7">
                    </div>
                    <h1>Really!!! 😩</h1>
                    <p>Last chance...</p>
                    <button onclick="nextStep('pwease1')">Ok</button>
                    <button class="move-no" onclick="moveNoButton()">Still No</button>
                </div>
            `;
        } else if (step === 'finalNo') {
            container.innerHTML = `
                <div class="scene animate__animated animate__zoomOut" data-aos="zoom-out">
                    <div class="img-container">
                        <img src="images/scene8.jpg" alt="Scene 8">
                    </div>
                    <h1>😢 Guess it's not meant to be...</h1>
                </div>
            `;
        }
    }
    
    function displayLines() {
        const lines = ['line1', 'line2', 'line3', 'line4', 'line5', 'line6']; // Added 'line6'
        let index = 0;
    
        function showNextLine() {
            if (index < lines.length) {
                document.getElementById(lines[index]).style.display = 'block';
                index++;
                setTimeout(showNextLine, 1000); // Adjust the delay as needed
            } else {
                document.getElementById('yesButton').style.display = 'inline-block';
                document.getElementById('noButton').style.display = 'inline-block';
            }
        }
    
        showNextLine();
    }
    
    window.nextStep = nextStep;
});

(function () {
    if (emailjs) {
        emailjs.init("CPkVhHDhjd2JtjLVi"); // Replace with your EmailJS User ID
    } else {
        console.error("EmailJS library is not loaded.");
    }
})();
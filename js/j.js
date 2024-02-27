
async function fetchdata() {
    try {
        const ff = await fetch("https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple");
        const respons = await ff.json();
        const data = respons;
console.log(data);
        let typee = document.querySelector(".type");
        let total = document.querySelector(".total");
        let q = document.querySelector(".q");
        let answer = document.querySelectorAll("label");
        let next = document.querySelector(".next");
        let previous = document.querySelector(".previous");
        let inp = document.querySelectorAll(".inp");
        let scor=document.querySelector('.score');
        let contener=document.querySelector(".quizcontener");
        let currentq = 0, score = 0;

        function reset(currentq) {
            if (currentq < data.results.length) {
                q.innerHTML = (currentq + 1) + "." + data.results[currentq].question;
                total.innerHTML = " total " + (currentq + 1) + "/" + data.results.length;
                typee.innerHTML = data.results[currentq].category;

                const maxArrayLength = 4;
                const randomArray = [];
                while (randomArray.length < maxArrayLength) {
                    const randomValue = Math.floor(Math.random() * 4);
                    if (!randomArray.includes(randomValue)) {
                        randomArray.push(randomValue);
                    }
                }

                inp[randomArray[0]].value = data.results[currentq].incorrect_answers[0];
                inp[randomArray[1]].value = data.results[currentq].incorrect_answers[1];
                inp[randomArray[2]].value = data.results[currentq].incorrect_answers[2];
                inp[randomArray[3]].value = data.results[currentq].correct_answer;

                answer[randomArray[0]].innerHTML = data.results[currentq].incorrect_answers[0];
                answer[randomArray[1]].innerHTML = data.results[currentq].incorrect_answers[1];
                answer[randomArray[2]].innerHTML = data.results[currentq].incorrect_answers[2];
                answer[randomArray[3]].innerHTML = data.results[currentq].correct_answer;

                next.addEventListener("click", function () {
                    inp.forEach((inpt) => {
                        if (inpt.checked) {
                            if (inpt.value === data.results[currentq].correct_answer) {
                                score++;
                            }
                        }
                    });
                    currentq++;
                    reset(currentq);
                });

                previous.addEventListener('click', function () {
                    inp.forEach((inpt) => {
                        if (inpt.checked) {
                            if (inpt.value === data.results[currentq].correct_answer) {
                                score--;
                            }
                        }
                    });
                    currentq--;
                    reset(currentq);
                });
            } else {
                scor.style.display="block"
                scor.innerHTML=`score is <span> ${score}/${data.results.length}</span>`; 
                contener.style.display="none"
            }
        }
        reset(currentq);
    } catch (error) {
        console.log(error);
    }
}

fetchdata();
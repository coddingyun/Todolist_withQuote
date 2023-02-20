'use strict';

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var itemList = [];
var inputButton = document.querySelector(".input_button");
inputButton.addEventListener("click", addItem);

document.querySelector(".item").addEventListener('keypress',function (e){
    if(e.key === 'Enter'){
        addItem();
    }
})

function addItem() {
    var item = document.querySelector(".item").value;
    if (item != "") {
        itemList.push(item);
        document.querySelector(".item").value = "";
        document.querySelector(".item").focus();
    }

    showList();
}


function showList() {
    var list = "<ul>"
    for (var i = 0; i <itemList.length; i++) {
        list += "<li>" + itemList[i] + "<span class='close' id=" + i + ">" + "\u00D7" + "</span></li>";
    }
    list += "</ul>";
    document.querySelector(".item_list").innerHTML = list;


    var devareButtons = document.querySelectorAll(".close");
    for (var i = 0; i < devareButtons.length; i++) {
        devareButtons[i].addEventListener("click", devareItem);
    }
}

function devareItem() {
    var id = this.getAttribute("id");
    itemList.splice(id, 1);
    showList();
}


var checkList = document.querySelector('.item_list');
checkList.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked');
  }
});

var quoteText = document.querySelector(".quote_text")
var quoteAuthor = document.querySelector(".quote_author")

function getQuote(){
    function randomItem(a){
        return a[Math.floor(Math.random()*a.length)];
    }

    fetch("https://type.fit/api/quotes")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var random = randomItem(data);
            var author = random.author;
            var text = random.text;
            quoteText.innerText = `${text}`;
            quoteAuthor.innerText = `- ${author} -`;
        });
}

getQuote();
document.querySelector(".quote_text").innerHTML = quoteText.innerText;
document.querySelector(".quote_author").innerHTML = quoteAuthor.innerText;


function init(){
    getQuote();
}

let recognition = new SpeechRecognition();
recognition.interimResults = true; // 중간 결과를 반환할지 여부
recognition.lang = 'ko-KR';

recognition.onresult = function(event) {
    console.log(event.results)
    var text = event.results[0][0].transcript;
    console.log(text);
    document.querySelector(".item").value = text;
    document.querySelector(".item").focus();
}

recognition.onspeechend = () => {
    recognition.stop();
}

document.querySelector(".voice_recog").addEventListener('click', function(){
    recognition.start();
});
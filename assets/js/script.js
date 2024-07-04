"use strict";
const checkButton = document.getElementById("check");
const clearButton = document.getElementById("clear");

function win(input,random){
    let confirm;
    if(input == random){
        confirm = "tie";
    }else if(input == "rock" && random == "scissors"){
        confirm = "win";
    } else if(input == "paper" && random == "rock"){
        confirm = "win";
    }else if(input == "scissors" && random == "paper"){
        confirm = "win";
    }else{
        confirm = "loose";
    }
    return confirm;
}

function getGif(category){
    const report = document.getElementById("message");
    const ran = Math.floor(Math.random() * 4998);

    fetch(`http://api.giphy.com/v1/gifs/search?q=${category}&api_key=C6HtXVoe2eDBQEkUyhp7YwmCYlIAhyGz&limit=1&offset=${ran}`)
        .then(response => response.json() )
        .then(content => {console.log(content.data)
            let img = document.createElement('img');
            img.src = content.data[0].images.downsized.url;
            img.setAttribute("style","display:block; height:10rem; width:10rem;margin: 0 auto");
            
 
            report.appendChild(img);

        })
        .catch(err=>{
            console.error(err);
        });
}

function clear(){
    document.getElementById("word").value = "";
    document.getElementById("message").innerHTML = "";
}

function validate(){
    const options = ["rock","paper","scissors"];
    const report = document.getElementById("message");
    const textBox = document.getElementById("word");
    const cleanWord = textBox.value.trim().toLowerCase();
    textBox.value = cleanWord;

    if(options.includes(cleanWord)){

        

        const compOption = Math.floor(Math.random() * 3);

        if(win(cleanWord,options[compOption])== "win"){
            
            report.innerHTML = `Computer chose: ${options[compOption]}. YOU WIN`;
            getGif(cleanWord);
        }else if(win(cleanWord,options[compOption])== "tie"){
            report.innerHTML = `Computer chose: ${options[compOption]}. tie :| `;
            getGif("tie breaker");
        }else{
            getGif("looser");
            report.innerHTML = `Computer chose: ${options[compOption]}. YOU SUCK`;
        }


    }else if(cleanWord === ""){
        report.innerHTML = "Box can not be empty";
    }else{
        report.innerHTML = "That is not a valid Option";
    }
}

checkButton.onclick = function(event){
    event.preventDefault();
    validate()
    return false;
}

clearButton.onclick = function(){
    clear()
    return false;
}

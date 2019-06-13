var settingIcon = document.getElementsByClassName("settings-icon")[0];
var settingOn=0;
var question = document.getElementById("question").innerHTML;
var answerBox= document.getElementsByClassName("answer")[0];
var correct = document.getElementsByClassName("correct")[0];
var wrong = document.getElementsByClassName("wrong")[0];
var score=0;
var score_total=0;
var score_count = document.getElementById("score-count").innerHTML;
var bodyBackgroundColor = "rgb(252, 232, 208)"
optionColors=["rgba(80, 218, 253, .6)","rgba(74, 101, 255, 0.6)","rgba(74, 255, 89, 0.6)","rgba(146, 255, 44, 0.6)","rgba(195, 253, 59, 0.6)","rgba(252, 187, 48, 0.6)","rgba(255, 85, 34, 0.6)"];
optionID=["sHira","sKata","sN5","sN4","sN3","sN2","sN1"];
optionInnerText=["あ","ア","N5","N4","N3","N2","N1"];
currentWordBank=["options->"];
currentAnswerBank=[];

optionValue=[0,0,0,0,0,0,0];
optionsChanged=0;
missedWords=[];
settingIcon.addEventListener("click", showOptions);
answerBox.addEventListener("change",checkAnswer);

var storeRandom


function randomNumber(array){
    return Math.floor(Math.random()*array.length);
}
//Options//

function showOptions(){
    if (settingOn==0){
        settingIcon.style.backgroundColor="rgb(255,196,124)";

        for(i=0; i<7; i++){
            var current = document.createElement('h3');
            current.className="settings-show";
            current.id=optionID[i];
            current.innerText=optionInnerText[i];

            if (optionValue[i]==1 ){
                current.style.backgroundColor = optionColors[i];
            }

            document.getElementsByClassName("settings")[0].appendChild(current);
        }
        settingOn=1;
    }
    else{
        settingIcon.style.backgroundColor="rgb(252, 232, 208)"
        settingOn=0;

        for(i=0; i<7; i++){
            var current = document.getElementById(optionID[i]);
            current.parentNode.removeChild(current);
        }

    }    
};
function applyOptions(){
    var dummyWordBank = []
    var dummyAnswerBank = []
    if (optionValue[0]==1){
        //hira... doesn't exist yet
    }
    if (optionValue[1]==1){
        //kata... doesn't exist yet
    }
    if (optionValue[2]==1){
        for (var i=0; i<(N5wordBank.length); i++){
            dummyWordBank.push(N5wordBank[i])
            dummyAnswerBank.push(N5answerBank[i])
        }
    }
    if (optionValue[3]==1){
        for (var i=0; i<(N4wordBank.length); i++){
            dummyWordBank.push(N4wordBank[i])
            dummyAnswerBank.push(N4answerBank[i])
        }
    }
    if (optionValue[4]==1){
        for (var i=0; i<(N3wordBank.length); i++){
            dummyWordBank.push(N3wordBank[i])
            dummyAnswerBank.push(N3answerBank[i])
        }
    }
    if (optionValue[5]==1){
        for (var i=0; i<(N2wordBank.length); i++){
            dummyWordBank.push(N2wordBank[i])
            dummyAnswerBank.push(N2answerBank[i])
        }
    }
    if (optionValue[6]==1){
        for (var i=0; i<(N1wordBank.length); i++){
            dummyWordBank.push(N1wordBank[i])
            dummyAnswerBank.push(N1answerBank[i])
        }
    }
    currentWordBank=dummyWordBank;
    currentAnswerBank=dummyAnswerBank;
    optionsChanged=0;
    score=0;
    score_total=0;

}
//・Options//

function nightMode(){
    document.documentElement.style.setProperty('--backgroundColor', '#020218b6')
    document.documentElement.style.setProperty('textColor','white');
}
function createToggleEvent(i){
    $(document).on("click","#"+optionID[i],function(){
        if (optionValue[i]!=1){
            $("#"+optionID[i]).css("backgroundColor", optionColors[i]);
            optionValue[i]=1
            optionsChanged=1; //mark objects changed. so then apply options next Q.
        }
        else{

            $("#"+optionID[i]).css("backgroundColor", bodyBackgroundColor);
            optionValue[i]=0;
            optionsChanged=1; //mark objects changed. so then apply options next Q.
        }

        
    })
}
for (i=0; i<7; i++){     
createToggleEvent(i)
}

function newQuestion(){ //Not actually fetching information yet...
    var quizContainer = document.getElementById("quiz-container");
    var newQuestion = document.createElement('p');
    newQuestion.className="hiragana";
    quizContainer.appendChild(newQuestion);
    newQuestion.innerText=currentWordBank[storeRandom];  //change question
    newQuestion.id="question";
    var toRemove = document.getElementById("question");
    toRemove.parentNode.removeChild(toRemove);
}

function checkAnswer(){
    //clean up of previous now transparent result icon
    
    try{ var toRemove = document.getElementById("result");
        toRemove.parentNode.removeChild(toRemove);
        var toRemove = document.getElementById("correction");
        toRemove.parentNode.removeChild(toRemove);
    }
    catch(err){
    }
    //clean up done

    //value of textbox
    var userInput=document.getElementsByClassName("answer")[0].value
    if (currentAnswerBank[storeRandom]==userInput){
        var checkmark = document.createElement('img');
        checkmark.src="images/checked.png"
        document.getElementsByClassName('answer-result')[0].appendChild(checkmark);
        checkmark.className="answer-result correct";
        checkmark.id="result"
        score++;
    }     
    else {
        var checkmark  = document.createElement('img'); //oops not a checkmark
        var correction = document.createElement('p');
        correction.innerHTML=currentAnswerBank[storeRandom];
        checkmark.src="images/wrong.png"
        document.getElementsByClassName('answer-result')[0].appendChild(checkmark);
        document.getElementsByClassName('answer-result')[0].appendChild(correction);
        checkmark.className="answer-result wrong";
        correction.className="answer-result wrong";
        correction.id="correction"
        checkmark.id="result"
    }

    score_total++;
    document.getElementById("score-count").innerHTML= score+"/"+score_total
    document.getElementsByClassName("answer")[0].value="";

    //prep for next question
    if (optionsChanged==1){
        applyOptions();
        console.log(currentWordBank)
    }
    storeRandom=randomNumber(currentWordBank);
    newQuestion();
}
 

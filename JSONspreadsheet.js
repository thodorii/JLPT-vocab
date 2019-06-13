/*The answer banks are way too big for cookies to personally store them
need to later figure out how to make databases to store them on a server so it doesn't take this long to load everything */

var N5wordBank=[]
var N5answerBank=[];

var N4wordBank=[];
var N4answerBank=[];

var N3wordBank=[];
var N3answerBank=[];

var N2wordBank=[];
var N2answerBank=[];

var N1wordBank=[];
var N1answerBank=[];



let update = 1;


function doData(json) {
    if (update==1){
        var dummyWordBank =[]
        var dummyAnswerBank =[]
        var len = json.feed.entry.length;

        for (var i=1; i<len; i++){ //skips label

            if (json.feed.entry[i].gs$cell.col=="1"){
            dummyWordBank.push(json.feed.entry[i].gs$cell.$t);
            }
            if (json.feed.entry[i].gs$cell.col=="2" && json.feed.entry[i].gs$cell.row!="1"){
            dummyAnswerBank.push(json.feed.entry[i].gs$cell.$t);
            }
        }
        if (json.feed.title.$t == "JLPT N5"){
            N5wordBank = dummyWordBank;
            N5answerBank = dummyAnswerBank; 
        }
        if (json.feed.title.$t == "JLPT N4"){
            N4wordBank = dummyWordBank;
            N4answerBank = dummyAnswerBank; 
        }
        if (json.feed.title.$t == "JLPT N3"){
            N3wordBank = dummyWordBank;
            N3answerBank = dummyAnswerBank;
        }
        if (json.feed.title.$t == "JLPT N2"){
            N2wordBank = dummyWordBank;
            N2answerBank = dummyAnswerBank; 
        }
        if (json.feed.title.$t == "JLPT N1"){
            N1wordBank = dummyWordBank;
            N1answerBank = dummyAnswerBank; 
        }

    }
}
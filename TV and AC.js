Status = "";
TV_image = "";
object = [];

function preload(){
TV_image = loadImage("TV.jpeg");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(TV_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    object = results;
}

function draw(){
    image(TV_image,0,0,640,350);
    if(Status != ""){
        for(i = 0; i < object.length;i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill('#FF0000');
            percent = floor(object[i].confidence*100)
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
}
    }
}
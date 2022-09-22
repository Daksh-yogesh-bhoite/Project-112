Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

<script src="https://unpkg.com/ml5@0.4.3/dist/ml5.min.js"></script>

console.log('ml5 version',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/3cImrszgE/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    var utterThis = new SpeachSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = result[0].label;
        speak();
        if(results[0].label == "happy")
        {
            document.getElementById("update_emoji").innerHTML = "&#128522;"; 
        }
        if(results[0].label == "sad")
        {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(results[0].label == "angry")
        {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }       
    }
}

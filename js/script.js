let recognition;
let cylinderLeftEyeInput = document.getElementById('cylinderLeftEye');
let cylinderRightEyeInput = document.getElementById('cylinderRightEye');
let focusLeftEyeInput = document.getElementById('focusLeftEye');
let focusRightEyeInput = document.getElementById('focusRightEye');
let transcriptionStatus = document.getElementById('transcriptionStatus');
let capturedTextInput = document.getElementById('capturedText');

let listentrigger = document.getElementById('listeningtrigger')
let listenStatus = false


listentrigger.addEventListener('click',()=>{
    if(listenStatus){
        listenStatus = false;
        listentrigger.classList.add("w3-black")
        listentrigger.innerText = "Start Listening"
        listentrigger.classList.remove("w3-success");
        stopTranscription();
    }else{
        listenStatus = true;
        startTranscription();
        listentrigger.innerText = "Stop Listening"
        listentrigger.classList.remove("w3-black")
        listentrigger.classList.add("w3-success");
        
    }
})

function startTranscription() {
    recognition = new window.webkitSpeechRecognition || window.SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = function() {
        transcriptionStatus.innerText = 'Transcription Started';
    };

    recognition.onresult = function(event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                transcript += event.results[i][0].transcript;
            }
        }

        if (transcript.trim() !== '') {
            processSpeechInput(transcript);
            capturedTextInput.value = transcript;
        }
    };

    recognition.onspeechend = function() {
        transcriptionStatus.innerText = 'Speech Ended';
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = function() {
        transcriptionStatus.innerText = 'Transcription Ended';
        capturedTextInput.value = ''; // Clear captured text
    };

    recognition.start();
}

function stopTranscription() {
    if (recognition) {
        recognition.stop();
    }
}

// function fetchFieldByLabel(text){
//     return document.querySelector('[voice-label="'+text.trim()+'"]')
// }

function processSpeechInput(transcript) {
    let lowerTranscript = transcript.toLowerCase();

    // handle the case when code hears "eye" as "i" instead
    lowerTranscript = lowerTranscript.replace(" i "," eye ")

    if (lowerTranscript.includes('cylinder left eye')) {
        const value = extractNumericValue(transcript);
        cylinderLeftEyeInput.value = value;
        cylinderLeftEyeInput.classList.add('active');
    } else if (lowerTranscript.includes('cylinder right eye')) {
        const value = extractNumericValue(transcript);
        cylinderRightEyeInput.value = value;
        cylinderRightEyeInput.classList.add('active');
    } else if (lowerTranscript.includes('focus left eye')) {
        const value = extractNumericValue(transcript);
        focusLeftEyeInput.value = value;
        focusLeftEyeInput.classList.add('active');
    } else if (lowerTranscript.includes('focus right eye')) {
        const value = extractNumericValue(transcript);
        focusRightEyeInput.value = value;
        focusRightEyeInput.classList.add('active');
    } else if (lowerTranscript.includes('save')){
        stopTranscription()
        alert("Saving Logic is initiated")
    }



}

function extractNumericValue(text) {
    const matches = text.match(/-?\d+\.?\d*/);
    return matches ? matches[0] : '';
}
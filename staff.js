let isRinging = false;
let soundEnabled = false;

const receptionServerUrl =
    "https://script.google.com/macros/s/AKfycbwA56Izss19zv1thnVKOm3b1nbRmfTJ5-fTM4sMbV2W8EgfstLINaIe3l4B25XNKa8JFg/exec";

const staffMessage = document.getElementById("staffMessage");
const answerButton = document.getElementById("answerButton");
const callSound = document.getElementById("callSound");
const enableSoundButton =
    document.getElementById("enableSoundButton");

async function checkStatus() {

    const response =
        await fetch(receptionServerUrl + "?action=status");

    const status =
        await response.text();

  console.log(status);

if (status == "idle") {

    staffMessage.textContent =
        "現在、呼び出しはありません";

    callSound.pause();
    callSound.currentTime = 0;
    isRinging = false;

}

if (status == "calling") {

    staffMessage.textContent =
        "受付から呼び出しがあります！";

    if (soundEnabled && !isRinging) {

        callSound.currentTime = 0;

        callSound.play()
            .then(() => {
                console.log("呼び出し音を再生しました");
                isRinging = true;
            })
            .catch(error => {
                console.error("呼び出し音を再生できませんでした", error);
            });

    }

}

if (status == "answered") {

    staffMessage.textContent =
        "対応中です";

    callSound.pause();
    callSound.currentTime = 0;
    isRinging = false;

}

}

answerButton.addEventListener("click", function () {

    staffMessage.textContent = "対応中です";

    fetch(receptionServerUrl + "?action=answer");

});

enableSoundButton.addEventListener("click", function () {

    soundEnabled = true;

    callSound.currentTime = 0;

    callSound.play()
        .then(() => {

            console.log("通知音を有効にしました");

            setTimeout(() => {

                callSound.pause();
                callSound.currentTime = 0;

            }, 1000);

        })
        .catch(error => {

            console.error(
                "通知音を有効にできませんでした",
                error
            );

        });

    enableSoundButton.textContent =
        "通知音は有効です";

});

checkStatus();
setInterval(checkStatus, 5000);
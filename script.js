

const callButton = document.getElementById("callStaff");
const message = document.getElementById("message");

const receptionServerUrl =
    "https://script.google.com/macros/s/AKfycbwA56Izss19zv1thnVKOm3b1nbRmfTJ5-fTM4sMbV2W8EgfstLINaIe3l4B25XNKa8JFg/exec";
callButton.addEventListener("click", function () {

    message.textContent = "スタッフを呼び出しています…";


    // インターネット上の受付サーバーへ通知
fetch(receptionServerUrl + "?action=call", {
    mode: "no-cors"
})
.catch(error => {
    console.error(error);
});

});

async function checkStatus() {

    const response =
        await fetch(receptionServerUrl + "?action=status");

    const status =
        await response.text();
if (status == "idle") {
    message.textContent = "";
}
    if (status == "answered") {
        message.textContent = "スタッフが応答しました";
    }

}

checkStatus();
setInterval(checkStatus, 5000);
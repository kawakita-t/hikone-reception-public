const channel = new BroadcastChannel("reception-channel");

const staffMessage = document.getElementById("staffMessage");
const answerButton = document.getElementById("answerButton");

channel.addEventListener("message", function (event) {
    if (event.data === "call") {
        staffMessage.textContent = "受付から呼び出しがあります！";
    }
});

answerButton.addEventListener("click", function () {
    staffMessage.textContent = "対応中です";

    channel.postMessage("answered");
});

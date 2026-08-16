// 受付画面と受信画面をつなぐ通信
const channel = new BroadcastChannel("reception-channel");

// ボタンとメッセージ表示
const callButton = document.getElementById("callStaff");
const message = document.getElementById("message");

// 「スタッフを呼ぶ」が押されたとき
callButton.addEventListener("click", function () {

    // 受付画面の表示
    message.textContent = "スタッフを呼び出しています…";

    // 受信画面へ通知
    channel.postMessage("call");

    // Google Meetを開く
    //window.open(
    //    "Google Meet URL",
    //    "_blank"
    //);

});
channel.addEventListener("message", function (event) {
    if (event.data === "answered") {
        message.textContent = "スタッフが応答しました";
    }
});

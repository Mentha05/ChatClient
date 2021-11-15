import SocketMain from "./socket/SocketMain";
import InternetCtrl from "./socket/InternetCtrl";
import SocketSend_Chat from "./socket/chat/SocketSend_Chat";
import CData_User from "./data/CData_User";
import Message from "./data/Message";

let addMsg = (data: Message) => {
    let div_info = document.createElement('div');

    let div_title = document.createElement('div');
    div_title.innerText = data.name;
    let span_time = document.createElement('span');
    let date = new Date(data.time).toLocaleString();
    span_time.innerText = date;
    let p_msg = document.createElement('p');
    p_msg.setAttribute('style', 'text-align: justify;color:#' + data.color + ';font-size:' + data.fontSize + 'rem');
    p_msg.innerText = data.msg;
    div_info.append(div_title);
    div_info.append(span_time);
    div_info.append(p_msg);
    $("#lv_Msg").append(div_info);
}

SocketMain.Initialization();
InternetCtrl.login_chat_server();
SocketMain.chatWebSocket.addCallBacks(() => {
    console.log("聊天伺服器連線成功");
    let roomID=1;
    SocketSend_Chat.onJoinRoom_Req(roomID, () => {
        let messageList: Message[] = CData_User.messageList;
        messageList.forEach(element => {
            addMsg(element);
        });
        $("#messageScrollBar")[0].scrollTop = $("#messageScrollBar")[0].scrollHeight - $("#messageScrollBar")[0].clientHeight;
    })
});
CData_User.chatEvent.addEventListener('onMsg', (e: CustomEvent) => {
    let message: Message = e.detail;
    console.log("onMsg", message);
    addMsg(message);
    $("#messageScrollBar")[0].scrollTop = $("#messageScrollBar")[0].scrollHeight - $("#messageScrollBar")[0].clientHeight;
    CData_User.addMsg(message);
});
$("#BtnSend").on("click", (e) => {
    e.preventDefault();
    if ($("#TB_Name").val() == "" || $("#TB_Msg").val() == "")
        alert('請輸入名稱及內容')
    else {
        let color = $("[name='rne']:checked")[0]['value'];
        console.log('color', color);
        SocketSend_Chat.onMessage_Req($("#TB_Name").val().toString(), $("#TB_Msg").val().toString(), color, 1);
        $("#TB_Name").val("");
        $("#TB_Msg").val("");
    }
});

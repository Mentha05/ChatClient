import SocketMain from "./SocketMain";

export default class InternetCtrl {
    /**
     * 送出登入聊天封包
     */
    public static login_chat_server() {
        let chatServerUrl = "ws://localhost:10010";
        //  與聊天伺服器建立連線
        SocketMain.chatWebSocket.connectURL(chatServerUrl);

        return this;
    }
}
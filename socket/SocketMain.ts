import ChatWebSocketModel from "./model/ChatWebSocketModel";

export default class SocketMain {
    private static _chatWebSocket: ChatWebSocketModel = null;

    /**
     * 進行初始化
     */
    static Initialization() {
        this.createchatWebSocket();
    }
    /**  
     * 聊天伺服器 WebSocket 物件
     */
    static get chatWebSocket(): ChatWebSocketModel {
        return this._chatWebSocket;
    }
    /**
     * 實作聊天伺服器
     */
    static createchatWebSocket() {
        this._chatWebSocket = new ChatWebSocketModel();
    }
}
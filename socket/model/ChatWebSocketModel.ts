
import WebSocketModel from "./WebSocketModel";
import ChatPacket from "../common/ChatPacket";
import SocketRecieve_Chat from "../chat/SocketRecieve_Chat";

export default class ChatWebSocketModel extends WebSocketModel {
    constructor() {
        super();
        SocketRecieve_Chat.init();
    }
    protected name = "ChatWebSocket";
    protected sendPackageMachining = (pktType, payload) => {
        let chatPacket = new ChatPacket([pktType, payload]);
        //  是否使用壓縮
        let isUseCompree = false;
        //  是否使用金鑰
        let isUseKey = false;
        let packageBytes = chatPacket.genPktData(isUseCompree, isUseKey);
        return packageBytes;
    }
    protected interprePackage = (data) => {
        //  判斷資料類型為字串或位元組
        if (data === String) {
            //console.log("Received data string");
        }
        else if (data instanceof ArrayBuffer) {
            let chatPacket = new ChatPacket(data);
            if (chatPacket.pktType[0] in SocketRecieve_Chat.RecieveFunctionMap)
                SocketRecieve_Chat.RecieveFunctionMap[chatPacket.pktType[0]](chatPacket.payload);

            if (this.waitResp != undefined && this.waitResp != null)
                this.waitResp.call(chatPacket.pktType[0]);
        }
    }

    /**
     * 送出封包
     * @param pktType
     * @param payload
     */
    public sendPackage(pktType: number, payload: string) {
        //連線關閉後將不在發送封包
        if (!this.isConnect) return;
        let bytes = null;
        if (this.sendPackageMachining) {
            bytes = this.sendPackageMachining(pktType, payload);
        }
        if (bytes) {
            this.ws.send(bytes.buffer)
        }
    }
}
import { PktType } from "../define/PktType";
import JoinRoomRespPkt from "./pkt/JoinRoomRespPkt";
import CData_User from "../../data/CData_User";
import MessageNotifyPkt from "./pkt/MessageNotifyPkt";

export default class SocketRecieve_Chat {
    public static RecieveFunctionMap: Array<Function> = [];
    /**
     * 初始化接收封包處理方法 Map
     */
    public static init() {
        this.RecieveFunctionMap[PktType.LOGIN_RESP] = this.onLogin_Resp;
        this.RecieveFunctionMap[PktType.JOINROOM_RESP] = this.onJoinRoom_Resp;
        this.RecieveFunctionMap[PktType.MESSAGE_NOTIFY] = this.onMessage_Notify;
    }
    /**
     * 0x02 登入回覆
     * @param payload 
     */
    private static onLogin_Resp(payload: string) {

    }
    /**
     * 0x04 進入房間回覆
     * @param payload 
     */
    private static onJoinRoom_Resp(payload: string) {
        let jsonObject: JoinRoomRespPkt = JSON.parse(payload);
        console.log(PktType.JOINROOM_RESP.toString(16).toUpperCase().length == 1 ?
            "0x0" + PktType.JOINROOM_RESP.toString(16).toUpperCase() : "0x" + PktType.JOINROOM_RESP.toString(16).toUpperCase(), jsonObject);
        CData_User.joinRet = jsonObject.Ret;
        if (jsonObject.Ret == 0) {
            CData_User.messageList = jsonObject.messageData;
        }
    }
    /**
     * 0x06 聊天訊息通知
     * @param payload 
     */
    private static onMessage_Notify(payload: string) {
        let jsonObject: MessageNotifyPkt = JSON.parse(payload);
        console.log(PktType.MESSAGE_NOTIFY.toString(16).toUpperCase().length == 1 ?
            "0x0" + PktType.MESSAGE_NOTIFY.toString(16).toUpperCase() : "0x" + PktType.MESSAGE_NOTIFY.toString(16).toUpperCase(), jsonObject);

        CData_User.chatEvent.dispatchEvent(new CustomEvent('onMsg', { 'detail': jsonObject.messageData }));
    }
}

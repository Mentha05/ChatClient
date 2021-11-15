import { PktType } from "../define/PktType";
import SocketMain from "../SocketMain";
import JoinRoomReqPkt from "./pkt/JoinRoomReqPkt";
import MessageReqPkt from "./pkt/MessageReqPkt";

export default class SocketSend_Chat {
    private static SN = 1;
    /**
     * 
     * @param deadSN 
     * @param callBack 
     */
    public static onJoinRoom_Req(deadSN: number, callBack) {
        let ReqPkt: JoinRoomReqPkt = new JoinRoomReqPkt();
        ReqPkt.SN = this.SN;
        ReqPkt.TimeStamp = new Date().getTime();
        ReqPkt.roomID = deadSN;
        this.SN++;
        console.log('onJoinRoom_Req',ReqPkt);
        SocketMain.chatWebSocket.waitResp.addWait(PktType.JOINROOM_REQ, PktType.JOINROOM_RESP, callBack);
        SocketMain.chatWebSocket.sendPackage(PktType.JOINROOM_REQ, JSON.stringify(ReqPkt));
    }
    /**
     * 
     * @param strMsg 
     * @param strName 
     * @param strColor 
     * @param nFontSize 
     */
    public static onMessage_Req(strMsg: string, strName: string, strColor: string, nFontSize: number) {
        let ReqPkt: MessageReqPkt = new MessageReqPkt();
        ReqPkt.SN = this.SN;
        ReqPkt.TimeStamp = new Date().getTime();
        ReqPkt.Msg = strMsg;
        ReqPkt.Name = strName;
        ReqPkt.Color = strColor;
        ReqPkt.FontSize = nFontSize;
        this.SN++;
        SocketMain.chatWebSocket.sendPackage(PktType.MESSAGE_REQ, JSON.stringify(ReqPkt));
    }
}
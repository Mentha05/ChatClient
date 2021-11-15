import Message from "../../../data/Message";
import PktModel from "../model/PktModel";
export default class JoinRoomRespPkt extends PktModel {
    public Ret;
    public roomID: number;
    public messageData: Message[];
}

import Message from "./Message";

export default class CData_User {
    private static _clientID = "";
    private static _roomID = -1;
    private static _joinRet = -1;
    private static _messageList: Message[] = [];
    private static _chatEvent: EventTarget = new EventTarget();
    public static get chatEvent() {
        return this._chatEvent;
    }
    public static set clientID(iPlayerID) {
        this._clientID = iPlayerID;
    }
    public static get clientID() {
        return this._clientID;
    }
    public static set roomID(iRoomID) {
        this._roomID = iRoomID;
    }
    public static get roomID() {
        return this._roomID;
    }
    public static set joinRet(iLoginRet) {
        this._joinRet = iLoginRet;
    }
    public static get joinRet() {
        return this._joinRet;
    }
    public static addMsg(msg:Message) {
        this._messageList.push(msg);
    }
    public static set messageList(message: Message[]) {
        this._messageList = message;
    }
    public static get messageList() {
        return this._messageList;
    }
    public static clearData() {
        this._roomID = -1;
        this._joinRet = -1;
        this._messageList = [];
    }
}
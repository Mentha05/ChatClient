export default class WaitRespInfo {
    constructor() {
        this._reqPktType = -1;
        this._respPktType = -1;
        this._callBack = null;
        this._isShowLoading = false;
        this._isCloseLoading = true;
        this._sendTime = 0;
        this._checkCout = 0;
    }
    private _reqPktType: number;
    private _respPktType: number;
    private _callBack: Function;
    private _isShowLoading: boolean;
    private _isCloseLoading: boolean;
    private _sendTime: number;
    private _checkCout: number;
    /**
     * 更新
     * @param nReqPktType 送出的封包命令
     * @param nRespPktType 收到的封包命令
     * @param callBack 
     * @param bIsShowLoading 是否顯示Loading
     * @param bIsCloseLoading 是否關閉Loading
     */
    public update(nReqPktType: number, nRespPktType: number, callBack: Function, bIsShowLoading: boolean, bIsCloseLoading: boolean) {
        this._reqPktType = nReqPktType;
        this._respPktType = nRespPktType;
        this._callBack = callBack;
        this._isShowLoading = bIsShowLoading;
        this._isCloseLoading = bIsCloseLoading;
        this._sendTime = Date.now();
    }
    /**
     * 檢查次數增加
     */
    private addCount() {
        if (this._checkCout == undefined || this._checkCout == null) this._checkCout = 0;
        this._checkCout++;
    }

    /** Map的key */
    get key(): string { return "PktType:" + this.respPktType; }
    /** 送出的封包命令 */
    get reqPktType(): number { return this._reqPktType; }
    /** 收到的封包命令 */
    get respPktType(): number { return this._respPktType; }
    /** 收到封包命令後執行方法 */
    get callBack(): Function { return this._callBack; }
    /** 是否顯示Loading */
    get isShowLoading(): boolean { return this._isShowLoading; }
    /** 是否關閉Loading */
    get isCloseLoading(): boolean { return this._isCloseLoading; }
    /** 送出的時間 */
    get sendTime(): number { return this._sendTime; }
    /** 檢查次數 */
    get checkCout(): number { return this._checkCout; }
}
import WaitRespInfo from "./WaitRespInfo";

export default class SocketWaitResp {
    constructor() {
        this._waitRespInfo = new Map();
    }

    private _waitRespInfo: Map<any, any>;
    private _interval;
    /**
     * 當收封包時呼叫
     * @param respPktType 
     */
    public call(respPktType: number) {
        let key = "PktType:" + respPktType;
        if (this._waitRespInfo.has(key)) {
            let target = this._waitRespInfo.get(key);
            let callBack = target.callBack;
            let isShowLoading = target.isShowLoading;
            let isCloseLoading = target.isCloseLoading;
            if (isShowLoading) {
                //發送loading畫面遮擋事件

            } else {
                if (callBack != undefined && callBack != null) callBack();
            }
            this._waitRespInfo.delete(key);
        }
    }

    /**
     * 檢查封包是否逾時
     */
    public check(): boolean {
        let remove = new Array();

        this._waitRespInfo.forEach((key, value) => {
            value.addCount();

            if (value.checkCout > 10) {
                console.error("Wait TimeOut - ReqPktType: " + value.reqPktType + ", RespPktType: " + value.respPktType);
                remove.push(key);
            }
        });
        for (let i = 0; i < remove.length; i++) {
            this._waitRespInfo.delete(remove[i]);
            console.log("check delete - PktType: " + remove[i]);
        }

        return remove.length > 0 ? false : true;
    }

    /**
     * 添加等待回應封包
     * @param nReqPktType 送出的封包命令
     * @param nRespPktType 收到的封包命令
     * @param callBack 
     * @param bIsShowLoading 是否顯示Loading
     * @param bIsCloseLoading 是否關閉Loading
     */
    public addWait(nReqPktType: number, nRespPktType: number, callBack: Function, bIsShowLoading: boolean = false, bIsCloseLoading: boolean = true) {
        let key = "PktType:" + nRespPktType;
        let target = new WaitRespInfo();
        target.update(nReqPktType, nRespPktType, callBack, bIsShowLoading, bIsCloseLoading);
        if (bIsShowLoading) {
            //發送loading畫面遮擋事件
        }
        this._waitRespInfo.set(key, target);
    }
    /**
     * 設定檢查 Interval
     */
    public setWaitRespInterval(funInterval: Function, sec: number) {
        if (this._interval) clearInterval(this._interval);
        setInterval(funInterval, sec);
    }
}

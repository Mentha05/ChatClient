import * as WebSocket from 'isomorphic-ws';
import SocketWaitResp from "../common/SocketWaitResp";

export default class WebSocketModel {
    constructor() {
        this.ws = null;
        this.name = "default";
        this.isConnect = false;
    }
    /** WebSocket 物件 */
    protected ws: WebSocket;
    /** 名稱 */
    protected name: string;
    public waitResp: SocketWaitResp = new SocketWaitResp();
    /** 是否連線中 */
    protected isConnect: boolean;
    /**
     * 是否發生斷線
     */
    protected isBreakOff: boolean;
    /**
     * 建立Socket連線成功後執行方法
     */
    protected actSocketConnectSuccessEnd: Function;
    /**
     * 建立Socket連線失敗後執行方法
     */
    protected actSocketConnectFailEnd: Function;
    /**
     * 當Socket發生斷線後執行方法
     */
    protected actSocketBreakOff: Function;
    /**
     * 關閉Socket連線後執行方法
     */
    protected actSocketCloseEnd: Function;
    /**
     * Socket連線逾時執行方法
     */
    protected actSocketTimeOut: Function;
    /**
     * 送出的封包進行加工的方法
     */
    protected sendPackageMachining: Function;
    /**
     * 解讀封包的方法
     */
    protected interprePackage: Function;

    /**
     * 進行websocket連線
     * @param host 位置
     * @param port 埠
     */
    protected connect(host: string, port: string, path) {
        var url = (path) ? "ws://" + host + ":" + port + "/" + path : "ws://" + host + ":" + port;
        this.connectURL(url);
    }
    public addCallBacks(onConnect: Function, onClose?: Function, onError?: Function, onTimeOut?: Function): void {
        this.actSocketConnectSuccessEnd = onConnect;
        this.actSocketCloseEnd = onClose;
        this.actSocketConnectFailEnd = onError;
        this.actSocketTimeOut = onTimeOut;
    }
    public connectURL(url) {
        if (this.ws === null) {
            try {
                this.ws = new WebSocket(url);
                this.ws.binaryType = 'arraybuffer';
                this.isBreakOff = false;

                let timeout = setTimeout(() => {
                    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
                        console.log(this.name + ":WebSocket instance wasn't ready...");
                        if (!this.isConnect) {
                            this.isBreakOff = true;
                            if (this.actSocketTimeOut) this.actSocketTimeOut();
                        } else {
                            this.isConnect = false;
                            if (this.actSocketConnectFailEnd) this.actSocketConnectFailEnd();
                        }
                    }
                }, 5000);

                this.ws.onopen = () => {
                    this.isConnect = true;
                    clearTimeout(timeout);
                    if (this.actSocketConnectSuccessEnd) this.actSocketConnectSuccessEnd();
                };
                this.ws.onmessage = (event) => {
                    // if (event == null || event.data == null || event.data.length == 0) {
                    //     console.log("onmessage Error");
                    //     return;
                    // }

                    if (this.interprePackage) this.interprePackage(event.data);
                };
                this.ws.onerror = () => {
                    console.log("Send Text fired an error");
                };
                this.ws.onclose = () => {
                    console.log(this.name + ":WebSocket instance closed.");

                    clearTimeout(timeout);

                    if (this.isConnect && this.actSocketBreakOff) {
                        this.actSocketBreakOff();
                        this.isBreakOff = true;
                    }

                    if (this.actSocketCloseEnd) this.actSocketCloseEnd();
                    this.isConnect = false;
                };
            }
            catch (e) {
                console.error("catch: ", e);
                if (this.actSocketBreakOff) this.actSocketBreakOff();
            }
        }
    }
    /**
     * 關閉連線
     */
    protected close() {
        if (this.ws === null) return;
        this.isConnect = false;
        console.log("關閉連線 !!!");
        //  確認狀態是已連線或連線中才呼叫真的關閉
        if (this.ws.readyState == WebSocket.OPEN || this.ws.readyState == WebSocket.CONNECTING) {
            this.ws.close();
        }
    }
}
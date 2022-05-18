const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
class RtcService {
    constructor() {
        this.iceServers = [
            {
                urls: [
                    "stun:caner.top:3478",
                    "stun:stun.l.google.com:19302",
                    "stun:stun1.l.google.com:19302",
                    "stun:stun2.l.google.com:19302",
                    "stun:stun3.l.google.com:19302",
                ],
            },
            {
                urls: "turn:caner.top:3478",
                username: "admin",
                credential: "123456",
            },
        ];
        this.RTC = null;
    }

    // 初始化RTC
    init() {
        const PeerConnection =
            window.RTCPeerConnection ||
            window.mozRTCPeerConnection ||
            window.webkitRTCPeerConnection;
        this.RTC = new PeerConnection({ iceServers: this.iceServers });
    }

    // ICE监听
    onicecandidate(callBack) {
        this.RTC.onicecandidate = callBack;
    }

    // ICE状态监听
    oniceconnectionstatechange(callBack) {
        this.RTC.oniceconnectionstatechange = callBack;
    }

    // 视频流
    ontrack(callBack) {
        this.RTC.ontrack = callBack;
    }

    // 设置远程description
    setRemoteDescription(data) {
        this.RTC.setRemoteDescription(data);
    }

    // 设置本地de
    setLocalDescription(data) {
        this.RTC.setLocalDescription(data);
    }

    // 添加ICE
    addIceCandidate(candidate) {
        this.RTC.addIceCandidate(candidate);
    }

    // 创建应答
    async createAnswer() {
        return await this.RTC.createAnswer();
    }

    // 创建offer
    async createOffer() {
        return await this.RTC.createOffer();
    }

    // 统计报告
    async getReaport(callBack) {
        if (!this.RTC) return;
        const res = await this.RTC.getStats(null);
        callBack(res);
        await sleep(1000 * 2);
        this.getReaport(callBack);
    }

    // close
    close() {
        if (!this.RTC) return;
        this.RTC.close();
        this.RTC = null;
    }
}
module.exports = new RtcService();

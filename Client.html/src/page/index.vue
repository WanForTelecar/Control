<template>
  <div class="box">
    <div v-if="isLogin">
      <!-- RTC -->
      <video id="v2" autoplay playsinline></video>
      <!-- 摇杆 -->
      <Contrl class="ctrl" ref="Contrl" @callBack="contrlBack" />
      <!-- 电量 -->
      <Battery class="battery" :quantity="Battery" />
      <!-- GPS -->
      <Map :Option="GPS" />
      <!-- 信号 -->
      <Signal class="signal" :signalValue="Signal" :signalText="SignalText" />
      <!-- 音频 -->
      <Record class="audio" @callBack="AudioBack" />
      <!-- loading -->
      <Loading v-if="showLoading" />
    </div>
    <Login v-else :err="error" @loginBack="login" />
  </div>
</template>
<script>
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
import Contrl from "@/components/Contrl";
import Battery from "@/components/Battery";
import Map from "@/components/Map";
import Signal from "@/components/Signal";
import Login from "@/components/Login";
import Loading from "@/components/loading";
import webRTC from "@/utils/RTC";
import Record from "@/components/Record";
const { io } = require("socket.io-client");
export default {
  components: {
    Battery,
    Contrl,
    Map,
    Signal,
    Login,
    Loading,
    Record,
  },
  data() {
    return {
      socket: null,
      HOST: "wss://car.caner.top",
      error: "",
      isLogin: false,
      showLoading: true,
      GPS: {
        position: [104.056608, 30.695942],
        zoom: 18,
      },
      Signal: 3,
      SignalText: 0,
      Battery: 100,
      remoteVideo: null,
    };
  },
  methods: {
    // 初始化
    intSoketRtc(host) {
      // 初始化socket
      this.socket = io(host, {
        autoConnect: false,
        transports: ["websocket"],
      });
      // 监听socket
      this.socket.on("connect", () => {
        this.connect();
      });
      this.socket.on("leaved", () => {
        this.close("车端离开");
      });
      this.socket.on("joined", () => {
        // 请求开始RTC
        this.socket.emit("msg", {
          type: "startRTC",
        });
      });
      this.socket.on("msg", (data) => {
        this.msg(data);
      });
      this.socket.on("connect_error", (err) => {
        console.log("连接失败", err);
        this.close(err);
      });
    },

    // 连接
    async connect() {
      console.log("连接成功", this.socket.auth);
      this.isLogin = true;
      try {
        // 初始化RTC
        webRTC.init();
        await sleep(100);
        // 监听视频流
        this.remoteVideo = document.getElementById("v2");
        webRTC.ontrack((event) => {
          this.remoteVideo.srcObject = event.streams[0];
        });
        // 监听ICE|发送
        webRTC.onicecandidate((event) => {
          if (event.candidate) {
            this.socket.emit("msg", {
              type: "candidate",
              candidate: event.candidate,
            });
          }
        });
        // 监听ICE状态
        webRTC.oniceconnectionstatechange(async () => {
          // 失败
          if (
            webRTC.RTC.iceConnectionState === "failed" ||
            webRTC.RTC.iceConnectionState === "disconnected" ||
            webRTC.RTC.iceConnectionState === "closed"
          ) {
            this.close("ICE通信失败");
          }
          // ICE连接成功|初始化摇杆
          if (webRTC.RTC.iceConnectionState === "connected") {
            await sleep(1000 * 2);
            this.$refs.Contrl.initContrl();
            this.showLoading = false;
          }
        });
        // RTC通信信号
        webRTC.getReaport((data) => {
          this.SignalText = data.size;
        });
      } catch (error) {
        this.socket.disconnect();
        this.isLogin = false
        alert('不支持Webrtc')
      }
    },

    // 通信
    async msg(data) {
      if (data.type === "offer") {
        // 设置本地应答
        webRTC.setRemoteDescription(data.offer);
        // 返回应答
        const answer = await webRTC.createAnswer();
        webRTC.setLocalDescription(answer);
        // 发送anwser
        this.socket.emit("msg", {
          type: "answer",
          answer: answer,
        });
      } else if (data.type === "candidate") {
        // 添加ICE
        webRTC.addIceCandidate(data.candidate);
      } else if (data.type === "power") {
        // 电量
        this.Battery = data.power;
      } else if (data.type === "LTE") {
        // 信号
        this.Signal = data.LTE;
      } else if (data.type === "GPS") {
        // gps
        this.GPS.position = data.GPS;
      }
    },

    // 登录
    login(data) {
      // 设置登录头
      if (this.socket) {
        this.socket.auth = {
          roomID: data.roomID,
          name: data.name,
        };
        this.socket.connect();
      } else {
        this.error = "服务器连接失败";
      }
    },

    // 摇杆
    contrlBack(data) {
      if (!this.socket && !this.socket.connected) return;
      this.socket.emit("msg", {
        type: "conctrl",
        conctrl: data,
      });
    },

    // 音频
    AudioBack(data) {
      if (!this.socket && !this.socket.connected) return;
      console.log("回调", data);
      this.socket.emit("msg", {
        type: "Meadia",
        Meadia: data,
      });
    },

    // 清除
    close(err) {
      if (webRTC) webRTC.close();
      if (this.remoteVideo) this.remoteVideo.srcObject = null;
      if (this.$refs.Contrl) this.$refs.Contrl.clearContrl();
      this.socket.disconnect();
      this.isLogin = false;
      this.showLoading = true;
      this.error = err || "";
    },
  },
  mounted() {
    this.intSoketRtc(this.HOST);
  },
};
</script>
<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.ctrl,
.battery,
.signal {
  position: fixed;
  overflow: hidden;
  z-index: 99;
}
.ctrl {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
.battery {
  top: 5px;
  right: 5px;
}
.signal {
  right: 50px;
  top: 3px;
}
video {
  width: 100vw;
  height: 100vh;
  background: none;
  object-fit: fill;
}
.audio {
  position: fixed;
  top: 3px;
  right: 90px;
  z-index: 99;
}
</style>

<template>
  <div>
    <div id="ctrl-left"></div>
    <div id="ctrl-right"></div>
  </div>
</template>
<script>
import nipplejs from "nipplejs";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  data() {
    return {
      contrlR: null,
      contrlL: null,
      timer: null,
      Option: {
        left: "20%",
        right: "20%",
        bottom: "30%",
        mode: "static",
        lcolor: "red",
        rcolor: "green",
      },
      contrlData: {
          v0: 128,
          v1: 128,
          v2: 128,
          v3: 128,
      },
    };
  },
  methods: {
    //初始化控制器
    initContrl() {
      this.contrlL = nipplejs.create({
        zone: document.getElementById("ctrl-left"),
        mode: this.Option.mode,
        position: {
          left: this.Option.left,
          bottom: this.Option.bottom,
        },
        color: this.Option.lcolor,
      });
      this.contrlR = nipplejs.create({
        zone: document.getElementById("ctrl-right"),
        mode: this.Option.mode,
        position: {
          right: this.Option.right,
          bottom: this.Option.bottom,
        },
        color: this.Option.rcolor,
      });
      this.contrlL.on("move", this.contrlLeft);
      this.contrlR.on("move", this.contrlRight);
      this.contrlL.on("end", this.contrlLeft);
      this.contrlR.on("end", this.contrlRight);
      this.loop();
    },
    // 摇杆左
    contrlLeft(a, b) {
      const obj = b.vector || { x: 0, y: 0 };
      this.contrlData.v2 = this.rotailContrl(obj.x);
      this.contrlData.v3 = this.rotailContrl(obj.y);
    },
    // 摇杆右
    contrlRight(a, b) {
      const obj = b.vector || { x: 0, y: 0 };
      this.contrlData.v0 = this.rotailContrl(obj.x);
      this.contrlData.v1 = this.rotailContrl(obj.y);
    },
    // 转换比例
    rotailContrl(v) {
      return Math.floor(Math.abs(v * 128 - 128));
    },
    // 发送回调
    async loop() {
      await sleep(50);
      this.$emit("callBack", this.contrlData);
      this.timer = requestAnimationFrame(this.loop);
    },
    // 清楚控制器
    clearContrl() {
      if (this.timer) cancelAnimationFrame(this.timer);
      if (this.contrlL) this.contrlL.destroy();
      if (this.contrlR) this.contrlR.destroy();
    },
  },
  destroyed() {
    this.clearContrl();
  },
};
</script>

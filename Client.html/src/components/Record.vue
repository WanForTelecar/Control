<template>
  <div>
    <div v-if="show" @click="audioCapture()">
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
      >
        <path
          d="M801.728 364.8a32 32 0 0 0-32 32v91.392c0 129.28-115.648 234.432-257.728 234.432S254.272 617.408 254.272 488.192V393.216a32 32 0 0 0-64 0v94.976c0 157.888 133.248 286.208 300.672 296.448v99.392H357.632c-16.128 0-29.184 14.336-29.184 32.064 0 17.664 13.056 31.936 29.184 31.936h319.04c16.064 0 29.184-14.272 29.184-31.936 0-17.728-13.12-32.064-29.184-32.064H554.944v-101.376c156.992-19.776 278.784-143.488 278.784-294.464V396.8c0-17.728-14.272-32-32-32z"
          fill="#40d7c1"
        ></path>
        <path
          d="M517.12 678.656a199.104 199.104 0 0 0 198.912-198.848V268.736A199.168 199.168 0 0 0 517.12 69.888a199.04 199.04 0 0 0-198.784 198.848v211.072a199.04 199.04 0 0 0 198.784 198.848z m85.056-126.784a49.856 49.856 0 1 1 0-99.648 49.856 49.856 0 0 1 0 99.648zM382.336 268.736c0-74.368 60.48-134.848 134.784-134.848a135.04 135.04 0 0 1 134.912 134.848v28.48H382.336v-28.48z"
          fill="#40d7c1"
        ></path>
      </svg>
    </div>
    <div class="loading" v-else>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script>
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  data() {
    return {
      chunks: [],
      mediaRecorder: null,
      show: true,
    };
  },
  async mounted() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      // 事件监听
      this.mediaRecorder.ondataavailable = (e) => {
        this.chunks.push(e.data);
      };
      this.mediaRecorder.onstart = () => {
        this.chunks = [];
      };
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: "audio/webm;codecs=opus" });
        this.$emit("callBack", blob);
      };
    } catch (error) {
      this.show = false
      alert("不支持音频输入");
    }
  },
  methods: {
    // 录音
    async audioCapture() {
      this.mediaRecorder.start();
      this.show = false;
      await sleep(1000 * 5);
      this.mediaRecorder.stop();
      this.show = true;
    },
    // blob2AudioBuffer
    blob2audioBuffer(blob) {
      const reader = new FileReader();
      reader.onload = function () {
        console.log(123, this.result);
        const audioCtx = new AudioContext();
        audioCtx.decodeAudioData(this.result, function (audioBuffer) {
          // AudioBuffer
          console.log(audioBuffer);
        });
      };
      reader.readAsArrayBuffer(blob);
    },
  },
};
</script>
<style scoped>
.loading {
  width: 20px;
  height: 15px;
  position: relative;
}
.loading span {
  display: block;
  bottom: 0px;
  width: 4px;
  height: 2px;
  background: #40d7c1;
  position: absolute;
  animation: load 1.1s infinite ease-in-out;
  border-radius: 3px;
}

.loading span:nth-child(2) {
  left: 7px;
  animation-delay: 0.2s;
}
.loading span:nth-child(3) {
  left: 14px;
  animation-delay: 0.4s;
}
@keyframes load {
  0% {
    height: 5px;
    transform: translateY(0px);
    background: #40d7c1;
  }
  25% {
    height: 15px;
    transform: translateY(5px);
    background: #40d7c1;
  }
  50% {
    height: 5px;
    transform: translateY(0px);
    background: #40d7c1;
  }
  100% {
    height: 5px;
    transform: translateY(0px);
    background: #40d7c1;
  }
}
</style>

<template>
  <div class="login">
    <div>
      <div class="logo">Caner 车控</div>
      <input type="text" placeholder="房间" maxlength="20" v-model="roomID" />
      <input type="text" placeholder="昵称" maxlength="20" v-model="name" />
      <div class="err">{{ err || error }}</div>
      <button :disabled="disabled" @click="login">加入</button>
    </div>
  </div>
</template>
<script>
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  props: {
    err: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      name: "",
      roomID: "",
      error: "",
      disabled: false,
    };
  },
  methods: {
    async login() {
      if (this.name && this.roomID) {
        this.$emit("loginBack", { name: this.name, roomID: this.roomID });
        this.disabled = true;
        await sleep(5000);
        this.disabled = false;
      } else {
        this.error = "请输入房间和用户名称";
        this.disabled = false;
      }
    },
  },
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo {
  width: 100px;
  height: 50px;
  margin: 0 auto;
}
input {
  display: block;
  border: 0;
  border-bottom: solid 1px #ccc;
  text-indent: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
  outline: none;
  border-radius: 0;
}
button {
  display: block;
  width: 130px;
  height: 30px;
  background: #2d8cf0;
  border: none;
  color: white;
  font-size: 17px;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 20px;
  line-height: 30px;
}
.err {
  width: 175px;
  margin: 0 auto;
  font-size: 12px;
  color: red;
  text-align: left;
  text-indent: 10px;
}
input:nth-child(3) {
  margin-bottom: 5px;
}
</style>

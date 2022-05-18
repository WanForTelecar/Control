<template>
  <div class="signal-box">
    <ul>
      <li
        :class="
          signalValue == 1
            ? 'signal-red'
            : signalValue == 2
            ? 'signal-yellow'
            : signalValue == 3
            ? 'signal-green'
            : 'signal-default'
        "
      ></li>
      <li
        :class="
          signalValue == 1
            ? 'signal-default'
            : signalValue == 2
            ? 'signal-yellow'
            : signalValue == 3
            ? 'signal-green'
            : 'signal-default'
        "
      ></li>
      <li
        :class="
          signalValue == 1
            ? 'signal-default'
            : signalValue == 2
            ? 'signal-default'
            : signalValue == 3
            ? 'signal-green'
            : 'signal-default'
        "
      ></li>
    </ul>
    <span v-if="signalText !=1" :style="signalText > 200 ? 'color:red':'color:white'">{{signalText}}</span>
  </div>
</template>
 
<script>
export default {
  name: "SignalTower",
  props: ['signalValue','signalText'],
  computed: {},
};
</script>
 
<style scoped>
.signal-box {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
span{
  font-size: 15px;
  color: white;
  margin-left: 3px;
}
ul {
  height: 15px;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: flex-end;
}

li {
  width: 5px;
  height: 6px;
  border-radius: 10px;
  list-style: none;
  margin: 0 0.5px;
}

ul li:nth-child(1) {
  height: 6px;
}

ul li:nth-child(2) {
  height: 9px;
}

ul li:nth-child(3) {
  height: 12px;
}

.signal-default {
  background: rgba(0, 0, 0, 0.5);
}

.signal-red {
  background-color: red;
}

.signal-yellow {
  background-color: #e7d055;
}

.signal-green {
  background-color: #40d7c1;
}
</style>
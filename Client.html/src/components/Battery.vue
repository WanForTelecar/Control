<template>
  <div class="electric-panel" :class="bgClass">
    <div class="panel">
      <div class="remainder" :style="{ width:quantity+ '%' }" />
    </div>
  </div>
</template>

<script>
/**
 * 电池电量Icon
 */
export default {
  name: "ElectricQuantity",
  props:['quantity'],
  computed: {
    bgClass() {
      if (this.quantity >= 40) {
        return "success";
      } else if (this.quantity >= 20) {
        return "warning";
      } else if (this.quantity >= 1) {
        return "danger";
      } else {
        return "danger";
      }
    },
  },
};
</script>

<style scoped>
.electric-panel {
  display: flex;
  justify-content: center;
  align-items: center;
}

.panel {
  box-sizing: border-box;
  width: 32px;
  height: 14px;
  position: relative;
  border: 2px solid #ccc;
  padding: 1px;
  border-radius: 3px;
  margin-right: 5px;
}

.panel::before {
  content: "";
  border-radius: 0 1px 1px 0;
  height: 6px;
  background: #ccc;
  width: 3px;
  position: absolute;
  top: 50%;
  right: -4px;
  transform: translateY(-50%);
}

.panel .remainder {
  border-radius: 1px;
  position: relative;
  height: 100%;
  width: 0%;
  left: 0;
  top: 0;
  background: #fff;
}

.success .panel {
  border-color: #40d7c1;
}
.success .panel:before {
  background: #40d7c1;
}
.success .remainder {
  background: #40d7c1;
}

.warning .panel {
  border-color: #f90;
}
.warning .panel:before {
  background: #f90;
}
.warning .remainder {
  background: #f90;
}

.danger .panel {
  border-color: #ed4014;
}
.danger .panel:before {
  background: #ed4014;
}
.danger .remainder {
  background: #ed4014;
}
</style>
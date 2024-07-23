<template>
  <div class="page">
    <div class="top-view">
      <div>
        <span>青岛澳门路近岸海洋动力灾害数字孪生系统</span>
      </div>
      <div class="top-view-button">
        <div class="top-view-button-left">
          <div class="top-view-button-style" :class="{ 'active': activeButton === '虚拟仿真' }"
            @click="setActiveButton('虚拟仿真')">
            虚拟仿真
            <div class="bottomurl" v-if="activeButton === '虚拟仿真'"></div>
          </div>
          <div style="margin-left: 90px;" class="top-view-button-style" :class="{ 'active': activeButton === '实时感知' }"
            @click="setActiveButton('实时感知')">实时感知
            <div class="bottomurl" v-if="activeButton === '实时感知'"></div>
          </div>
        </div>
        <div class="top-view-button-right">
          <div style="margin-right: 90px;" class="top-view-button-style" :class="{ 'active': activeButton === '模拟预测' }"
            @click="setActiveButton('模拟预测')">模拟预测
            <div class="bottomurl" v-if="activeButton === '模拟预测'"></div>
          </div>
          <div class="top-view-button-style" :class="{ 'active': activeButton === '假设分析' }"
            @click="setActiveButton('假设分析')">假设分析
            <div class="bottomurl" v-if="activeButton === '假设分析'"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeButton === '虚拟仿真'">
      <Virtualsimulation />
    </div>
    <div v-if="activeButton === '实时感知'">
      <Realtimeawareness />
    </div>
    <div v-if="activeButton === '模拟预测'">
      <Rapidpredictions />
    </div>
    <div v-if="activeButton === '假设分析'">
      <Whatifanalysis />
    </div>
  </div>
  <background />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Virtualsimulation from './topButton/Virtualsimulation.vue'
import Realtimeawareness from './topButton/Realtimeawareness.vue'
import Rapidpredictions from './topButton/Rapidpredictions.vue'
import Whatifanalysis from './topButton/Whatifanalysis.vue'
import background from './topButton/background.vue'
import { callUIInteraction } from "../module/webrtcVideo/webrtcVideo.js";

const activeButton = ref('')
const lastActiveButton = ref('')
const setActiveButton = (button) => {
  lastActiveButton.value = activeButton.value
  activeButton.value = button
  console.log(`点击的按钮是：${button}，取消的按钮是：${lastActiveButton.value}`)
}
onMounted(() => {
  setActiveButton('虚拟仿真')
  if (window.performance.navigation.type == 1) {
    console.log("页面被刷新")
    sessionStorage.clear();
  } else {
    console.log("首次被加载")
  }
})
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
}

.page>div {
  pointer-events: auto;
}

.top-view {
  width: 100%;
  height: 80px;
  background-image: url('../assets/img/title.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-view span {
  color: #FFFFFF;
  line-height: 0px;
  text-align: center;
  font-style: normal;
  -moz-text-align-last: justify;
  text-align-last: justify;
  font-size: 28px;
  font-family: YouSheBiaoTiHei;
  font-weight: 600;
  background: linear-gradient(0deg, #12D8FF 0%, #96EFFD 50%, #F9FCFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 3px;
}

.top-view-button-left {
  position: absolute;
  top: 5px;
  left: 145px;
  display: flex;
}

.top-view-button-right {
  position: absolute;
  top: 5px;
  right: 145px;
  display: flex;
}

.top-view-button-style {
  width: 134px;
  height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: PangMenZhengDao;
  font-size: 22px;
  line-height: 44px;
  color: #FFFFFF;
  font-weight: 500;
  cursor: pointer;
  font-style: normal;
  cursor: pointer;
  letter-spacing: 3px;
}

.top-view-button-style.active {
  background: linear-gradient(0deg, #12D8FF 0%, #96EFFD 50%, #F9FCFF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bottomurl {
  position: absolute;
  top: 26px;
  width: 134px;
  height: 50px;
  background-image: url('../assets/img/标题选中样式.png');
  background-repeat: no-repeat;
  background-position: -20% 50%;
}
</style>

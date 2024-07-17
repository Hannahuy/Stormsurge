<template>
  <div class="page">
    <div class="top-view">
      <span>近岸海洋风暴潮防灾减灾数字孪生系统</span>
    </div>
    <div class="top-view-button">
      <div class="top-view-button-left">
        <div class="top-view-button-style" :class="{ 'active': activeButton === '虚拟仿真' }"
          @click="setActiveButton('虚拟仿真')">
          虚拟仿真
        </div>
        <div style="margin-left: 60px;" class="top-view-button-style" :class="{ 'active': activeButton === '实时感知' }"
          @click="setActiveButton('实时感知')">实时感知</div>
      </div>
      <div class="top-view-button-right">
        <div style="margin-right: 60px;" class="top-view-button-style" :class="{ 'active': activeButton === '快速预测' }"
          @click="setActiveButton('快速预测')">快速预测</div>
        <div class="top-view-button-style" :class="{ 'active': activeButton === '假设分析' }"
          @click="setActiveButton('假设分析')">假设分析</div>
      </div>
    </div>
    <div v-if="activeButton === '虚拟仿真'">
      <Virtualsimulation />
    </div>
    <div v-if="activeButton === '实时感知'">
      <Realtimeawareness />
    </div>
    <div v-if="activeButton === '快速预测'">
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

const activeButton = ref('')

const setActiveButton = (button) => {
  activeButton.value = button
}
onMounted(() => {
  setActiveButton('虚拟仿真')
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
  background-image: url('../assets/img/资源 1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-view span {
  width: 612px;
  height: 54px;
  font-weight: 400;
  font-size: 32px;
  font-family: SourceHanSansCN, SourceHanSansCN;
  color: #FFFFFF;
  line-height: 54px;
  text-align: center;
  font-style: normal;
}

.top-view-button-left {
  position: absolute;
  top: 61px;
  left: 222px;
  display: flex;
}

.top-view-button-right {
  position: absolute;
  top: 61px;
  right: 222px;
  display: flex;
}

.top-view-button-style {
  width: 161px;
  height: 58px;
  background-image: url('../assets/img/top_title_back.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: PangMenZhengDao;
  font-size: 22px;
  /* color: #98B6CA; */
  color: #FFFFFF;
  font-style: normal;
  cursor: pointer;
}

.top-view-button-style.active {
  background-image: url('../assets/img/top_title_active_back.png');
  color: #FFFFFF;
}
</style>

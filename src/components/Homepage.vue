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
    <div v-show="!activeButton">
      <div class="hleftbox">
        <div class="hleftbox-1">
          <div class="hleftbox-1-title">
            <span>最近24小时数据</span>
          </div>
          <div class="hleftbox-1-content">
            <div class="hleftbox-1-content-1">
              <img src="../assets/img/风场@3x.png" class="imgsize" alt="">
              <div class="hleftbox-1-content-1-span">
                <span>最大潮位：3.0m</span>
                <span>07-23 11:00</span>
              </div>
            </div>
            <div class="hleftbox-1-content-1">
              <img src="../assets/img/海温@3x.png" class="imgsize" alt="">
              <div class="hleftbox-1-content-1-span">
                <span>最小潮位：0.5m</span>
                <span>07-23 05:00</span>
              </div>
            </div>
            <div class="hleftbox-1-content-1">
              <img src="../assets/img/海浪@3x.png" class="imgsize" alt="">
              <div class="hleftbox-1-content-1-span">
                <span>最大波高：2.0m</span>
                <span>07-23 11:00</span>
              </div>
            </div>
            <div class="hleftbox-1-content-1">
              <img src="../assets/img/流场@3x.png" class="imgsize" alt="">
              <div class="hleftbox-1-content-1-span">
                <span>最小波高：0.2m</span>
                <span>07-23 05:00</span>
              </div>
            </div>
          </div>
        </div>
        <div class="hleftbox-2">
          <div class="hleftbox-1-title">
            <span>最近一个月潮位变化</span>
          </div>
          <div id="hleftbox-1-content-echarts"></div>
        </div>
        <div class="hleftbox-3">
          <div class="hleftbox-1-title">
            <span>最近一个月波高变化</span>
          </div>
          <div id="hleftbox-2-content-echarts"></div>
        </div>
      </div>
      <div class="rightbox">
        <div class="hleftbox-1">
          <div class="hleftbox-1-title">
            <span>小麦岛实时监测数据</span>
          </div>
          <div id="hleftbox-3-content-echarts"></div>
        </div>
        <div class="hleftbox-1">
          <div class="hleftbox-1-title">
            <span>未来24小时潮位预测</span>
          </div>
          <div id="hleftbox-4-content-echarts"></div>
        </div>
        <div class="hleftbox-1">
          <div class="hleftbox-1-title">
            <span>未来24小时波高预测</span>
          </div>
          <div id="hleftbox-5-content-echarts"></div>
        </div>
      </div>
    </div>
  </div>
  <background />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Virtualsimulation from './topButton/Virtualsimulation.vue'
import Realtimeawareness from './topButton/Realtimeawareness.vue'
import Rapidpredictions from './topButton/Rapidpredictions.vue'
import Whatifanalysis from './topButton/Whatifanalysis.vue'
import background from './topButton/background.vue'
import { callUIInteraction } from "../module/webrtcVideo/webrtcVideo.js";
import * as echarts from "echarts";

const activeButton = ref('')
const lastActiveButton = ref('')

const setActiveButton = (button) => {
  if (activeButton.value === button) {
    // 如果当前按钮已经被选中，则取消选中
    lastActiveButton.value = activeButton.value
    activeButton.value = ''
    Tideinit();
    Tideinits();
    Tideinitss();
    Tideinitsss();
    Tideinitssss();
    callUIInteraction({
      FunctionName: `${lastActiveButton.value}`,
      State: false,
    });
  } else {
    // 否则设置为当前按钮
    lastActiveButton.value = activeButton.value
    activeButton.value = button
    callUIInteraction({
      FunctionName: `${button}`,
      State: true,
    });
    callUIInteraction({
      FunctionName: `${lastActiveButton.value}`,
      State: false,
    });
  }
}

let TideEchartsdata = null;
const Tideinit = () => {
  const salinityChartElement = document.getElementById("hleftbox-1-content-echarts");
  if (TideEchartsdata) {
    TideEchartsdata.dispose();
  }
  TideEchartsdata = echarts.init(salinityChartElement);
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#b7cffc",
            fontSize: 14,
          },
        },
      }
    ],
    yAxis: {
      name: '水位 (m)', // 添加单位
      nameTextStyle: {
        color: "#b7cffc",
        fontSize: 14
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#b7cffc",
          fontSize: 14
        }
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: '水位',
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          // 使用渐变色
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#00f2fe' }, // 渐变起始颜色
              { offset: 1, color: '#0088ff' }  // 渐变结束颜色
            ],
            global: false // 缺省为 false
          }
        },
        data: [1.0, 5.2, 2.0, 3.3, 3.9, 3.3, 2.2]
      }
    ],
    grid: { x: 35, y: 30, x2: 15, y2: 25 },
  };
  TideEchartsdata.setOption(options);
};
let TideEchartsdatas = null;
const Tideinits = () => {
  const salinityChartElement = document.getElementById("hleftbox-2-content-echarts");
  if (TideEchartsdatas) {
    TideEchartsdatas.dispose();
  }
  TideEchartsdatas = echarts.init(salinityChartElement);
  const options = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        show: true,
        textStyle: {
          color: "#b7cffc",
          fontSize: 14,
        },
      },
    },
    yAxis: {
      name: '波高 (m)', // 添加单位
      nameTextStyle: {
        color: "#b7cffc",
        fontSize: 14
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#b7cffc",
          fontSize: 14
        }
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        type: 'line',
        showSymbol: false,
        name: '波高',
        data: [1.5, 2.3, 2.2, 2.1, 1.3, 1.4, 2.6],
        lineStyle: {
          width: 5, // 设置线条粗细为5
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#00f2fe' }, // 渐变起始颜色
              { offset: 1, color: '#0088ff' }  // 渐变结束颜色
            ],
            global: false // 缺省为 false
          }
        }
      }
    ],
    grid: { x: 35, y: 30, x2: 15, y2: 25 },
  };
  TideEchartsdatas.setOption(options);
};
let TideEchartsdatass = null;
const Tideinitss = () => {
  const salinityChartElement = document.getElementById("hleftbox-3-content-echarts");
  if (TideEchartsdatass) {
    TideEchartsdatass.dispose();
  }
  TideEchartsdatass = echarts.init(salinityChartElement);
  const options = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        show: true,
        textStyle: {
          color: "#b7cffc",
          fontSize: 14,
        },
      },
    },
    yAxis: {
      name: '波高 (m)', // 添加单位
      nameTextStyle: {
        color: "#b7cffc",
        fontSize: 14
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#b7cffc",
          fontSize: 14
        }
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        type: 'line',
        showSymbol: false,
        name: '波高',
        data: [1.5, 2.3, 2.2, 2.1, 1.3, 1.4, 2.6],
        lineStyle: {
          width: 5, // 设置线条粗细为5
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#00f2fe' }, // 渐变起始颜色
              { offset: 1, color: '#0088ff' }  // 渐变结束颜色
            ],
            global: false // 缺省为 false
          }
        }
      }
    ],
    grid: { x: 35, y: 30, x2: 15, y2: 25 },
  };
  TideEchartsdatass.setOption(options);
};
let TideEchartsdatasss = null;
const Tideinitsss = () => {
  const salinityChartElement = document.getElementById("hleftbox-4-content-echarts");
  if (TideEchartsdatasss) {
    TideEchartsdatasss.dispose();
  }
  TideEchartsdatasss = echarts.init(salinityChartElement);
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#b7cffc",
            fontSize: 14,
          },
        },
      }
    ],
    yAxis: {
      name: '水位 (m)', // 添加单位
      nameTextStyle: {
        color: "#b7cffc",
        fontSize: 14
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#b7cffc",
          fontSize: 14
        }
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: '水位',
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          // 使用渐变色
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#00f2fe' }, // 渐变起始颜色
              { offset: 1, color: '#0088ff' }  // 渐变结束颜色
            ],
            global: false // 缺省为 false
          }
        },
        data: [1.0, 5.2, 2.0, 3.3, 3.9, 3.3, 2.2]
      }
    ],
    grid: { x: 35, y: 30, x2: 15, y2: 25 },
  };
  TideEchartsdatasss.setOption(options);
};
let TideEchartsdatassss = null;
const Tideinitssss = () => {
  const salinityChartElement = document.getElementById("hleftbox-5-content-echarts");
  if (TideEchartsdatassss) {
    TideEchartsdatassss.dispose();
  }
  TideEchartsdatassss = echarts.init(salinityChartElement);
  const options = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        show: true,
        textStyle: {
          color: "#b7cffc",
          fontSize: 14,
        },
      },
    },
    yAxis: {
      name: '波高 (m)', // 添加单位
      nameTextStyle: {
        color: "#b7cffc",
        fontSize: 14
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#b7cffc",
          fontSize: 14
        }
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        type: 'line',
        showSymbol: false,
        name: '波高',
        data: [1.5, 2.3, 2.2, 2.1, 1.3, 1.4, 2.6],
        lineStyle: {
          width: 5, // 设置线条粗细为5
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#00f2fe' }, // 渐变起始颜色
              { offset: 1, color: '#0088ff' }  // 渐变结束颜色
            ],
            global: false // 缺省为 false
          }
        }
      }
    ],
    grid: { x: 35, y: 30, x2: 15, y2: 25 },
  };
  TideEchartsdatassss.setOption(options);
};
onMounted(() => {
  Tideinit();
  Tideinits();
  Tideinitss();
  Tideinitsss();
  Tideinitssss();
  if (window.performance.navigation.type == 1) {
    console.log("页面被刷新")
    sessionStorage.clear();
  } else {
    console.log("首次被加载")
  }
})
onBeforeUnmount(() => {
  if (TideEchartsdata) {
    TideEchartsdata.dispose();
  }
  if (TideEchartsdatas) {
    TideEchartsdatas.dispose();
  }
  if (TideEchartsdatass) {
    TideEchartsdatass.dispose();
  }
  if (TideEchartsdatasss) {
    TideEchartsdatasss.dispose();
  }
  if (TideEchartsdatassss) {
    TideEchartsdatassss.dispose();
  }
});
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  pointer-events: none;
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
  left: 7.8%;
  display: flex;
}

.top-view-button-right {
  position: absolute;
  top: 5px;
  right: 7.8%;
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

.hleftbox {
  position: absolute;
  top: 12%;
  left: 10px;
  width: 420px;
  min-height: 800px;
  padding: 20px;
  box-sizing: border-box;
  background-image: url('../assets/img/kuang-1@3x.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.hleftbox-1 {
  min-height: 250px;
}

.hleftbox-1-title {
  height: 30px;
  background-image: url('../assets/img/标题背景.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #b7cffc;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 30px;
  font-size: 18px;
}

.hleftbox-1-title span {
  font-family: PangMenZhengDao;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 5px;
  background: linear-gradient(0deg, #12D8FF 0%, #96EFFD 50%, #F9FCFF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hleftbox-1-content {
  margin-top: 10px;
  height: 210px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: #b7cffc;
}

.hleftbox-1-content span {
  margin-left: 5px;
  margin-right: 5px;
  font-family: PangMenZhengDao;
  font-size: 16px;
  font-weight: 600;
  /* letter-spacing: 5px; */
  background: linear-gradient(0deg, #12D8FF 0%, #96EFFD 50%, #F9FCFF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hleftbox-1-content-1 {
  width: 190px;
  height: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hleftbox-1-content-1-span {
  display: flex;
  flex-direction: column;
}

.imgsize {
  width: 55px;
  height: 55px;
}

#hleftbox-1-content-echarts,
#hleftbox-2-content-echarts,
#hleftbox-3-content-echarts,
#hleftbox-4-content-echarts,
#hleftbox-5-content-echarts {
  width: 380px;
  margin-top: 10px;
  height: 210px;
}

.hleftbox-2 {
  min-height: 250px;
  margin-top: 10px;
}

.hleftbox-3 {
  margin-top: 10px;
  min-height: 250px;
}

.rightbox {
  position: absolute;
  top: 12%;
  right: 10px;
  width: 420px;
  min-height: 800px;
  padding: 20px;
  box-sizing: border-box;
  background-image: url('../assets/img/kuang-1@3x.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>

<template>
    <!-- <div class="Weather-list">
        <div class="Weather-list-top">
            <div class="Weather-list-top-left">
                <span>{{ currentTime }}</span>
                <span>{{ currentDate }}</span>
            </div>
            <div class="Weather-list-top-right">
                <span>是否实时</span>
                <el-switch style="margin-left: 20px;" v-model="swtichvalue" inline-prompt active-text="ON"
                    inactive-text="OFF" />
            </div>
        </div>
        <div class="Weather-type">
            <div class="Weather-type-title">
                <span>天气类型</span>
            </div>
            <div class="Weather-type-icon">
                <img src="../../assets/img/weather_sunny_icon.png" alt="Sunny"
                    :class="{ 'selected': selectedIcon === 'sunny' }" @click="selectIcon('sunny')" />
                <img src="../../assets/img/heavyrain.png" alt="Heavy Rain"
                    :class="{ 'selected': selectedIcon === 'heavyrain' }" @click="selectIcon('heavyrain')" />
                <img src="../../assets/img/Mediumfog.png" alt="Medium Fog"
                    :class="{ 'selected': selectedIcon === 'fog' }" @click="selectIcon('fog')" />
            </div>
            <div class="Weather-type-icon-detailed">
                <img :src="weatherone" alt="" :class="{ 'selected': selectedIconDetail === 'sunnyDetail' }"
                    @click="selectDetailIcon('sunnyDetail')" />
                <img :src="weathertwo" alt="" :class="{ 'selected': selectedIconDetail === 'heavyrainDetail' }"
                    @click="selectDetailIcon('heavyrainDetail')" />
                <img :src="weatherthree" alt="" :class="{ 'selected': selectedIconDetail === 'fogDetail' }"
                    @click="selectDetailIcon('fogDetail')" />
            </div>
        </div>
        <div class="Weather-wind">
            <div class="leftbox-top-content">
                <span style="margin-right: 20px;">风强度</span>
                <img src="../../assets/img/small_icon.png" alt="" :class="{ 'disabled': swtichvalue }" class="imgbutton"
                    @click="decreaseintensity">
                <el-slider v-model="Windintensity" :disabled="swtichvalue" style="width: 240px;margin-left: 20px;margin-right: 20px;"
                    @change="getWindintensity" />
                <img src="../../assets/img/big_icon.png" :class="{ 'disabled': swtichvalue }" alt="" class="imgbutton"
                    @click="addintensity">
            </div>
            <div class="leftbox-top-content">
                <span style="margin-right: 20px;">风向</span>
                <img src="../../assets/img/small_icon.png" :class="{ 'disabled': swtichvalue }" alt="" class="imgbutton"
                    @click="decreasedirection">
                <el-slider v-model="Winddirection" :min="0" :max="360" :disabled="swtichvalue" style="width: 240px;margin-left: 20px;margin-right: 20px;"
                    @change="getWinddirection" />
                <img src="../../assets/img/big_icon.png" :class="{ 'disabled': swtichvalue }" alt="" class="imgbutton"
                    @click="adddirection">
            </div>
            <div>
                <span>经度：</span>
            </div>
            <div>
                <span>纬度：</span>
            </div>
        </div>
        <div class="Weather-sea">
            <span>海面效果：</span>
            <el-switch style="margin-left: 20px;" v-model="swtichseavalue" inline-prompt active-text="蓝"
                inactive-text="绿" />
        </div>
        <div class="leftbox-middle">
            <div class="leftbox-top-title">
                <span style="color: #B0E0FF;">时间模拟</span>
            </div>
            <div class="leftbox-middle-title">
                <span>1:00h</span>
                <span>6:00h</span>
                <span>12:00h</span>
                <span>18:00h</span>
                <span>24:00h</span>
            </div>
            <div class="leftbox-middle-content">
                <img src="../../assets/img/small_icon.png" :class="{ 'disabled': swtichvalue }" alt="" class="imgbutton"
                    @click="decreasetime">
                <el-slider v-model="timevalue" :disabled="swtichvalue" style="width: 320px;margin-left: 20px;margin-right: 20px;" :min="1"
                    :max="86400" :step="1" @input="updateTimeDisplay" @change="gettimevalue" :show-tooltip="false" />
                <img src="../../assets/img/big_icon.png" :class="{ 'disabled': swtichvalue }" alt="" class="imgbutton"
                    @click="addtime">
            </div>
            <div class="leftbox-middle-bottom">
                <div class="leftbox-middle-bottom-content">
                    <img src="../../assets/img/morning_icon.png" alt="">
                    <span>早晨</span>
                </div>
                <div class="leftbox-middle-bottom-content">
                    <img src="../../assets/img/noon_icon.png" alt="">
                    <span>中午</span>
                </div>
                <div class="leftbox-middle-bottom-content">
                    <img src="../../assets/img/night_icon.png" alt="">
                    <span>傍晚</span>
                </div>
                <div class="leftbox-middle-bottom-content">
                    <img src="../../assets/img/evening_icon.png" alt="">
                    <span>晚上</span>
                </div>
            </div>
        </div>
    </div> -->
</template>

<script setup>
import { ref } from 'vue';

const currentTime = ref('');
const currentDate = ref('');

const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    currentTime.value = `${hours}:${minutes}:${seconds}`;

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    currentDate.value = `${year}/${month}/${day}`;
};

updateTime();
setInterval(updateTime, 1000);

const swtichvalue = ref(false);
const swtichseavalue = ref(true);
const timevalue = ref(0)
const weatherone = ref('/src/assets/img/weather_sunny_icon.png')
const weathertwo = ref('/src/assets/img/sunnycloudy.png')
const weatherthree = ref('/src/assets/img/cloudy.png')
const selectedIcon = ref('sunny');
const selectedIconDetail = ref('sunnyDetail');
const selectIcon = (icon) => {
    selectedIcon.value = icon;
    switch (icon) {
        case 'sunny':
            weatherone.value = '/src/assets/img/weather_sunny_icon.png';
            weathertwo.value = '/src/assets/img/sunnycloudy.png';
            weatherthree.value = '/src/assets/img/cloudy.png';
            selectedIconDetail.value = 'sunnyDetail'

            break;
        case 'heavyrain':
            weatherone.value = '/src/assets/img/lightrain.png';
            weathertwo.value = '/src/assets/img/heavyrain.png';
            weatherthree.value = '/src/assets/img/rainstorm.png';
            selectedIconDetail.value = 'heavyrainDetail'
            break;
        case 'fog':
            weatherone.value = '/src/assets/img/Lightfog.png';
            weathertwo.value = '/src/assets/img/Mediumfog.png';
            weatherthree.value = '/src/assets/img/Fog.png';
            selectedIconDetail.value = 'heavyrainDetail'
            break;
        default:
            break;
    }
};

const selectDetailIcon = (icon) => {
    selectedIconDetail.value = icon;
};

</script>

<style scoped>
.Weather-list {
    position: absolute;
    top: 150px;
    left: 30px;
    width: 460px;
    height: 740px;
    background: rgba(17, 27, 37, 0.4);
    border: 1px solid;
    border-image: linear-gradient(180deg, rgba(39, 148, 255, 1), rgba(39, 166, 255, 0.5)) 1 1;
    padding: 20px 20px 40px 20px;
    box-sizing: border-box;
}

.Weather-list-top {
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
}

.Weather-list-top-left span:first-child {
    color: white;
    font-size: 20px;
}

.Weather-list-top-left span:last-child {
    color: #B0E0FF;
    font-size: 14px;
    margin-left: 10px;
}

.Weather-list-top-right {
    margin-left: 95px;
}

.Weather-list-top-right span {
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 500;
    font-size: 16px;
    color: #B0E0FF;
}

.Weather-list-top-right :deep(.el-switch__core) {
    border-radius: 0;
    border: 1px solid #4AB4FE;
}

.Weather-list-top-right :deep(.el-switch__core .el-switch__action) {
    border-radius: 0;
    background-color: #4AB4FE;
}

.Weather-list-top-right :deep(.el-switch.is-checked .el-switch__core .el-switch__inner) {
    background-color: #083362;
}

.Weather-list-top-right :deep(.el-switch__core .el-switch__inner) {
    border: 1px solid #083362;
    background-color: #083362;
}

.Weather-list-top-right :deep(.el-switch.is-checked .el-switch__core) {
    background-color: #083362;
}

.Weather-list-top-right :deep(.el-switch__core .el-switch__inner .is-text) {
    color: #AFDFFD;
}

.Weather-type {
    margin-top: 20px;
}

.Weather-type-title {
    width: 100%;
    background-image: url('../../assets/img/title_three_back.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.Weather-type-title span {
    margin-left: 38px;
    font-weight: 500;
    font-size: 18px;
    color: #B0E0FF;
}

.Weather-type-icon,
.Weather-type-icon-detailed {
    padding-left: 40px;
    padding-right: 40px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.Weather-type-icon img,
.Weather-type-icon-detailed img {
    cursor: pointer;
}

.selected {
    /* filter: brightness(0) saturate(100%) invert(47%) sepia(58%) saturate(4274%) hue-rotate(191deg) brightness(101%) contrast(101%); */
    filter: invert(0.19) sepia(0.5) saturate(5.4) hue-rotate(0deg) brightness(0.96);
}

.Weather-wind {
    font-weight: 400;
    font-size: 16px;
    color: #B0E0FF;
}

.Weather-sea {
    color: #B0E0FF;
}







.leftbox-top-content {
    /* width: 100%; */
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #E6E6E6;
    font-size: 14px;
    margin-top: 20px;
}
.leftbox-middle {
    width: 460px;
    height: 228px;
    background-image: url('../../assets/image/框-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
}

.leftbox-middle-title {
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 20px;
    font-size: 14px;
    /* padding: 0 10px 0 30px; */
}

.leftbox-middle-content {
    /* width: 100%; */
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #E6E6E6;
    font-size: 14px;
    margin-top: 5px;
}

.leftbox-middle-bottom {
    /* width: 100%; */
    color: white;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 5px;
}

.leftbox-middle-bottom-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
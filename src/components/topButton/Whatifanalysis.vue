<template>
    <div class="left-menu">
        <div class="leftbox-top-content">
            <div class="leftbox-top-title">
                <span>减灾措施情景库</span>
            </div>
            <div class="oneBox">
                <el-checkbox-group v-model="checkListone" class="checkboxone"
                    @change="handleCheckChange('checkListone')">
                    <el-checkbox label="无减灾设施" value="无减灾设施" />
                    <el-checkbox label="加防潮堤" value="加防潮堤" />
                    <el-checkbox label="加防汛沙袋" value="加防汛沙袋" />
                </el-checkbox-group>
            </div>
        </div>
        <div class="leftbox-top-content">
            <div class="leftbox-top-title">
                <span>水位浪高情景库</span>
            </div>
            <div class="twoBox">
                <div style="margin-top: 20px;">
                    <span class="twoBox-title">预设水位</span>
                    <el-checkbox-group v-model="checkListtwo" class="checkboxtwo"
                        @change="handleCheckChange('checkListtwo')">
                        <el-checkbox label="0米" value="0m" />
                        <el-checkbox label="1米" value="1m" />
                        <el-checkbox label="2米" value="2m" />
                        <el-checkbox label="3米" value="3m" />
                        <el-checkbox label="4米" value="4m" />
                    </el-checkbox-group>
                </div>
                <div style="margin-top: 10px;">
                    <span class="twoBox-title">预设浪高</span>
                    <el-checkbox-group v-model="checkListthree" class="checkboxthree"
                        @change="handleCheckChange('checkListthree')">
                        <el-checkbox label="1米" value="1m" />
                        <el-checkbox label="2米" value="2m" />
                        <el-checkbox label="3米" value="3m" />
                        <el-checkbox label="4米" value="4m" />
                    </el-checkbox-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { callUIInteraction, addResponseEventListener, } from "../../module/webrtcVideo/webrtcVideo.js";

const checkListone = ref([]);
const checkListtwo = ref([]);
const checkListthree = ref([]);

const handleCheckChange = (listName) => {
    const list = eval(listName);
    // 映射列表名称到描述
    const descriptions = {
        checkListone: '减灾措施情景库',
        checkListtwo: '水位浪高情景库预设水位',
        checkListthree: '水位浪高情景库预设浪高'
    };
    // 检查数组长度并打印当前选中的值
    if (list.value.length > 0) {
        callUIInteraction({
            FunctionName: `${descriptions[listName]}` + list.value[list.value.length - 1],
            State: true
        });
    } else {
        callUIInteraction({
            FunctionName: `${descriptions[listName]}`,
            State: false
        });
    }
    // 如果选中多个，保留最后一个
    if (list.value.length > 1) {
        list.value = [list.value[list.value.length - 1]];
    }
};

onMounted(() => {

});
</script>

<style scoped>
.left-menu {
    position: absolute;
    top: 12%;
    left: 20px;
    width: 440px;
    height: 510px;
    padding: 20px;
    box-sizing: border-box;
    background-image: url('../../assets/img/框.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.leftbox-top-content {
    width: 100%;
    height: 200px;
}

.leftbox-top-title {
    margin-top: 10px;
    height: 45px;
    background-image: url('../../assets/img/标题背景.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    line-height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.leftbox-top-title span {
    /* margin-left: 40px; */
    font-weight: 600;
    color: #B7CFFC;
    font-size: 20px;
    letter-spacing: 5px;
}

.oneBox {
    width: 300px;
    height: 250px;
}

.checkboxone {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 140px;
}

.oneBox:deep(.el-checkbox) {
    height: 45px;
}

.oneBox:deep(.el-checkbox__inner) {
    width: 18px;
    height: 18px;
}

.oneBox:deep(.el-checkbox__label) {
    color: #D4E1FF;
    font-size: 18px;
}

.oneBox:deep(.el-checkbox__inner:after) {
    height: 11px;
    left: 5px;
    top: 0px;
    width: 6px;
}

.twoBox {
    height: 180px;
}

.twoBox-title {
    font-size: 20px;
    color: #D4E1FF;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
}

.checkboxtwo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.checkboxthree {
    display: flex;
    align-items: center;
    padding-left: 12px;
    margin-top: 10px;
}

.twoBox:deep(.el-checkbox) {
    height: 45px;
}

.twoBox:deep(.el-checkbox__inner) {
    width: 18px;
    height: 18px;
}

.twoBox:deep(.el-checkbox__label) {
    color: #D4E1FF;
    font-size: 16px;
}

.twoBox:deep(.el-checkbox__inner:after) {
    height: 11px;
    left: 5px;
    top: 0px;
    width: 6px;
}

.threeBox {
    position: absolute;
    top: 260px;
    left: 250px;
    width: 300px;
    height: 520px;
    background-image: url('../../assets/img/dialog4_back.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.threeBox-title {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 75px;
    line-height: 110px;
    font-size: 24px;
    color: #D4E1FF;
}

.buttonitem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.buttons {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 0;
    width: 80%;
    height: 40px;
    background-color: rgba(25, 104, 153, 0.5);
    border: 0;
    font-size: 18px;
}

.fourBox {
    position: absolute;
    top: 550px;
    left: 250px;
    width: 200px;
    height: 180px;
    background-image: url('../../assets/img/dialog4_back.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.checkboxfour {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 50px;
}

.fourBox-title {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 70px;
    line-height: 80px;
    font-size: 24px;
    color: #D4E1FF;
}

.fourBox:deep(.el-checkbox) {
    height: 45px;
}

.fourBox:deep(.el-checkbox__inner) {
    width: 18px;
    height: 18px;
}

.fourBox:deep(.el-checkbox__label) {
    color: #D4E1FF;
    font-size: 18px;
}

.fourBox:deep(.el-checkbox__inner:after) {
    height: 11px;
    left: 5px;
    top: 0px;
    width: 6px;
}
</style>
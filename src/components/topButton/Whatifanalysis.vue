<template>
    <div class="left-menu">
        <div class="leftbox-top-content">
            <div class="leftbox-top-title">
                <span>减灾措施情景库</span>
            </div>
            <div class="oneBox">
                <el-checkbox-group v-model="checkListone" class="checkboxone" @change="handleCheckChange('checkListone')">
                    <el-checkbox label="无减灾设施" value="无减灾设施" />
                    <el-checkbox label="加防潮堤" value="加防潮堤" />
                    <el-checkbox label="加防汛沙袋" value="加防汛沙袋" />
                </el-checkbox-group>
            </div>
        </div>
        <div class="leftbox-top-content">
            <div class="leftbox-top-title">
                <span>水位情景库</span>
            </div>
            <div class="twoBox">
                <el-checkbox-group v-model="checkListtwo" class="checkboxtwo" @change="handleCheckChange('checkListtwo')">
                    <div class="checkbox-column">
                        <el-checkbox label="0米" value="0m" />
                        <el-checkbox label="1米" value="1m" />
                        <el-checkbox label="2米" value="2m" />
                    </div>
                    <div class="checkbox-column">
                        <el-checkbox label="3米" value="3m" />
                        <el-checkbox label="4米" value="4m" />
                        <el-checkbox label="5米" value="5m" />
                    </div>
                </el-checkbox-group>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { callUIInteraction } from "../../module/webrtcVideo/webrtcVideo.js";

const checkListone = ref([]);
const checkListtwo = ref(['0m']);
let lastSelected = ref('0m'); // 用于跟踪上一个选中的选项

const descriptions = {
    checkListone: '减灾措施情景库',
    checkListtwo: '水位情景库',
};

onMounted(() => {
    callUIInteraction({
        FunctionName: `${descriptions['checkListtwo']}`,
        State: '0'
    });
});

watch(checkListone, (newValue, oldValue) => {
    const added = newValue.filter(item => !oldValue.includes(item));
    const removed = oldValue.filter(item => !newValue.includes(item));

    if (removed.length) {
        callUIInteraction({
            FunctionName: `${descriptions['checkListone']}${removed}`,
            State: false
        });
    }

    if (added.length) {
        setTimeout(() => {
            callUIInteraction({
                FunctionName: `${descriptions['checkListone']}${added[added.length - 1]}`,
                State: true
            });
        }, 0);
    }
});

watch(checkListtwo, (newValue, oldValue) => {
    const added = newValue.filter(item => !oldValue.includes(item));
    if (added.length) {
        const numericValue = parseInt(added[added.length - 1]);
        callUIInteraction({
            FunctionName: `${descriptions['checkListtwo']}`,
            State: numericValue
        });
        console.log(numericValue);
    }
});

const handleCheckChange = (listName) => {
    const list = listName === 'checkListone' ? checkListone : checkListtwo;

    // 如果是 checkListtwo，确保只能选择一个
    if (listName === 'checkListtwo') {
        if (list.value.length > 1) {
            list.value = [list.value[list.value.length - 1]]; // 保留最后一个选项
        }

        // 如果当前选项被取消，恢复到上一个选项
        if (list.value.length === 0) {
            list.value = [lastSelected.value]; // 恢复到上一个选项
        } else {
            lastSelected.value = list.value[0]; // 更新上一个选项
        }
    } else {
        // 如果选中多个，保留最后一个
        if (list.value.length > 1) {
            list.value = [list.value[list.value.length - 1]];
        }
    }
};
</script>


<style scoped>
.left-menu {
    position: absolute;
    top: 12%;
    left: 20px;
    width: 440px;
    height: 455px;
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

.checkboxtwo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.checkbox-column {
    display: flex;
    flex-direction: column;
    margin: 0 10px;
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
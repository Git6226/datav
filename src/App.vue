<template>
  <div class="bg-[url('assets/images/bg.png')] bg-cover
   bg-center h-screen text-white p-5 flex overflow-hidden" v-if="data">
    <!-- 左-->
    <div class="flex-1 mr-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!--      横向柱状图-->
      <HorizontalBar class="h-1/3 box-border pb-4" :data="data.regionData" />
      <!--      雷达图-->
      <RadarBar class="h-1/3 box-border pb-4" :data="data.riskData"/>
      <!--      关系图-->
      <Relation class="h-1/3 " :data="data.relationData"/>

    </div>
    <!-- 中-->
    <div class="w-1/2 mr-5 flex flex-col">
      <!--      数据总览-->
      <TotalData class="bg-opacity-50 bg-slate-800 p-3" :data="data.totalData"/>
      <!--      地图可视化-->
      <MapChart class="bg-opacity-50 bg-slate-800 p-3 mt-4 flex flex-1" :data="data.mapData"/>
    </div>
    <!-- 右-->
    <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col" :data="data.regionData">
      <!--      竖向柱状图-->
      <VerticalBar class="h-1/3 box-border pb-4" :data="data.serverData"/>
      <!--      环形图-->
      <RingBar class="h-1/3 box-border pb-4"  :data="data.abnormalData"/>
      <!--      文档云图-->
      <WordCloud class="h-1/3 " :data="data.wordCloudData"/>

    </div>
  </div>

</template>
<script setup>
import HorizontalBar from "./components/HorizontalBar.vue";
import MapChart from "./components/MapChart.vue";
import RadarBar from "./components/RadarBar.vue";
import Relation from "./components/Relation.vue";
import RingBar from "./components/RingBar.vue";
import TotalData from "./components/TotalData.vue";
import VerticalBar from "./components/VerticalBar.vue";
import WordCloud from "./components/WordCloud.vue";

import {ref} from "vue";
import {getVisualizations} from "@/api/visualization.js";

const data =ref(null)
const loadData = async () => {
  data.value=await getVisualizations();
}
loadData()
setInterval(()=>{
  loadData()
},3000)

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

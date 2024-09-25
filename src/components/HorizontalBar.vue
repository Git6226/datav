<!--横向柱状图-->
<template>
  <div>
    <div>大区数据信息</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>
<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
})

//初始化
let mChart = null
const target = ref(null)
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})
//option配置等一下
const renderChart = () => {
  const options = {
    xAxis: {
      show: false,
      type: "value",
      max: function (value) {
        return parseInt(value.max * 2)
      }
    },
    yAxis: {
      type: "category",
      data: props.data.regions.map(item => item.name),
      inverse: true,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: '#9eb1c8'
      }

    },
    //图标绘制的位置
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      containLabel: true,
    },
    series: [{
      type: "bar",
      data: props.data.regions.map(item => ({
        name: item.name,
        value: item.value
      })),
      showBackground: true,
      backgroundColor: "rgba(180, 180, 180, 0.2)",
      itemStyle: {
        color: "#479AD3",
        barBorderRadius: 5,
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowBlur: 5
      },
      barWidth: 12,
      label: {
        show: true,
        position: "right",
        textStyle: {
          color: "#fff",
        }
      }
    }]

  }
  mChart.setOption(options)
}

watch(()=>props.data,(a,b)=>{
  renderChart()
})

</script>


<style scoped>

</style>
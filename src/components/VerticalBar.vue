<!--竖向柱状图-->
<template>
  <div>
    <div>服务资源占用比</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>
<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
let mChart = null
const target = ref(null)

onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})

const renderChart = () => {
  const options = {
    xAxis: {
      type: "category",
      data: props.data.servers.map(item => item.name),
      axisLabel: {
        color: '#9EB1C8'
      }
    },
    yAxis: {
      type: "value",
      show:false,
      max: function (value) {
        return parseInt(value.max * 2)
      }
    },
    //图标绘制的位置
    grid: {
      top: 16,
      right: 0,
      bottom: 26,
      left: -26,
      containLabel: true,
    },
    series: [{
      type: "bar",
      data: props.data.servers.map(item => ({
        name: item.name,
        value: item.value
      })),

      itemStyle: {
        color: "#479AD3",
        barBorderRadius: 5,
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowBlur: 5
      },
      barWidth: 12,
      label: {
        show: true,
        position: "top",
        textStyle: {
          color: "#fff",
        },
        formatter: function (value, index) {
        }
      },

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
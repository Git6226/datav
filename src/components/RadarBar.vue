<!--雷达图-->
<template>
  <div>
    <div>云端报警风险</div>
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
    radar: {
      name: {
        textStyle: {
          color: '#05D5FF',
          fontsize: 14
        }
      },
      shape: 'polygon',
      center: ['50%', '50%'],
      radius: '80%',
      startAngle: 120,
      axisLine: {
        lineStyle: {
          color: 'rgba(5,213,255.8)',
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(5,213,255.8)',
        }
      },
      indicator: props.data.risks.map((item) => ({
        name: item.name,
        max: 100
      }))
    },
    polar: {
      center: ['50%', '50%'],
      radius: '0%',
    },
    angleAxis: {
      min: 0,
      interval: 5,
      clockwise: false
    },
    radiusAxis: {
      min: 0,
      interval: 20,
      splitLine: {
        show: true,
      }
    },
    series: {
      type: 'radar',
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: {
        normal: {
          color: '#05D5FF'
        }
      },
      areaStyle: {
        normal: {
          color: '#05D5FF',
          opacity: 0.5
        }
      },
      lineStyle: {
        width: 2,
        color: '#05D5FF',
      },
        label: {
        normal: {
          show: true,
          color: '#fff'

        }
      },
      data: [{
        value: props.data.risks.map(item =>
            item.value
        )
      }]
    }
  }

  mChart.setOption(options)
}

watch(() => props.data, (a, b) => {
  console.log(props.data.risks)
  renderChart()
})
</script>


<style scoped>

</style>
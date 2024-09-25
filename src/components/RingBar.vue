<!--环形图-->
<template>
  <div>
    <div>大区异常数据</div>
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
const getSeriesData = () => {
  const series = []
  //上层
  props.data.abnormals.map((item, index) =>{ series.push({
    name: item.name,
    type: 'pie',
    clockwise: false,
    hoverAnimation: false,
    radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
    center: ['55%', '55%'],
    label: {
      show: false,

    },
    data: [{
      value: item.value,
      name: item.name,
    }, {
      value: 1000,
      itemStyle: {
        color: 'rgba(0,0,0,0)',
        borderWidth: 0
      },
      tooltip: {
        show: false
      },
      hoverAnimation: false,


    }]
  })

        series.push({
          name: item.name,
          type: 'pie',
          z: 1,
          clockwise: false,
          hoverAnimation: false,
          radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
          center: ['55%', '55%'],
          label: {
            show: false,

          },
          data: [{
            value: 7.5,
            itemStyle: {
              color: 'rgba(3,31,62)',
              borderWidth: 0
            }, tooltip: {
              show: false,
            },
            hoverAnimation: false,
          }, {
            value: 2.5,
            itemStyle: {
              color: 'rgba(3,31,62)',
              borderWidth: 0
            },
            tooltip: {
              show: false
            },
            hoverAnimation: false,


          }, {
            value: 2.5,
            itemStyle: {
              color: 'rgba(3,31,62)',
              borderWidth: 0
            },
            tooltip: {
              show: false
            },
            hoverAnimation: false,


          }]
        })
  }

  )
//底层

return series
}
const renderChart = () => {
  const options = {
    //图例配置
    legend: {
      show: true,
      icon: 'circle',
      top: '14%',
      left: '60%',
      data: props.data.abnormals.map(item => item.name),
      width: -5,
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 6,
      textStyle: {
        color: '#fff',
        rich: {
          title: {
            fontsize: 12,
            lineHeight: 5,
            color: 'rgba(255,255,255,0.8)',
          }
        }
      }
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLine:{
          show:false
        }
      }
    ],
    xAxis: [{show: false}],
    series: getSeriesData()
  }
  mChart.setOption(options)
}
watch(() => props.data, (a, b) => {
  renderChart()
})

</script>


<style scoped>

</style>
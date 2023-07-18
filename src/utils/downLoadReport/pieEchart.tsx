import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

class PieEchart {
  public myChart:any;
  initFun(params:any) {
    echarts.use([
      TitleComponent,
      TooltipComponent,
      LegendComponent,
      PieChart,
      CanvasRenderer,
      LabelLayout
    ]);
          
    const chartDom = document.getElementById('pieEchartBox');
    this.myChart = echarts.init(chartDom);
          
    const option = {
      title: {
        text: params.titleText,
        subtext: '',
        left: 'center',
        textStyle: {
          fontSize: 22,
          fontWeight: 'normal',
          color: '#595959'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      color: ['#7DC471', '#F98485', '#D8D8D8'],
      textStyle: {
        fontFamily: 'Microsoft YaHei',
        fontSize: '22',
        fontStyle: 'normal',
        fontWeight: 'bolder' },

      legend: {
        orient: 'horizontal',
        bottom: '0',
        itemWidth: 14,
        itemHeight: 14,
        textStyle: {
          fontSize: 16,
          fontWeight: 'normal',
          color: '#595959'
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '70%',
          data: params.data,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 5
          },
          labelLine: {
            show: false
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            formatter: '{c}'
          }
        }
      ],
      animation: false
    };
          
    option && this.myChart.setOption(option);
  }
  pieChartUrl() {
    const img = new Image();
    img.src = this.myChart.getDataURL({
      pixelRatio: 1,
      backgroundColor: '#fff'
    });
    return img.src;
  }

}
const instance = new PieEchart();
export { PieEchart };
export default instance;

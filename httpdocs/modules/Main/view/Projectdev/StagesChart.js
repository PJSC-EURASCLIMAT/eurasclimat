Ext.define('EC.Main.view.Projectdev.StagesChart', {
    extend: 'Ext.chart.Chart',
    title:'График выполнения проекта',
    border: true,
    itemId: 'stagesChart',
    frame:true,
    padding:5,
    alias: 'widget.ProjectdevStagesChart',
    store: 'EC.Main.store.Projectdev.StagesChart',
    layout: 'fit',
    legend: {
      position: 'bottom'
    },
    axes: [
      {
          type: 'Category',
          position: 'left',
          fields: ['finish_display'],
          title: 'Этапность',
          grid:true
      }, 
      {
        title: 'Даты',
        type: 'time',
        position: 'bottom',
        fields: ['date_plan_end', 'date_fact_end'],
        dateFormat: 'd.m.y',
        grid: true,
        label: {
          rotate: {
              degrees: 305
          }
        }
      }],
    series: [{
        type: 'line',
        title:'Плановый график и сроки выполения этапов',
        xField: 'date_plan_end',
        yField: 'name',
        style: {
          stroke: '#20A020',
          'stroke-width': 2,
          opacity: 1
        }
      },{
          type: 'line',
          title:'Фактический график и сроки выполения этапов',
          xField: 'date_fact_end',
          yField: 'name',
          style: {
            stroke: '#F8F808',
            'stroke-width': 2,
            opacity: 1
        }
      }, {
        type: 'line',
        title:'Финиш плановый',
        xField: 'date_plan_finish',
        yField: 'finish_display',
        showMarkers : false,
        style: {
          stroke: '#20A020',
          'stroke-width': 2,
          opacity: 1
        }
      }, {
        type: 'line',
        title:'Финиш фактический',
        xField: 'date_fact_finish',
        yField: 'finish_display',
        showMarkers : false,
        style: {
          stroke: '#F8F808',
          'stroke-width': 2,
          opacity: 1
        }
      }  
    ]
});
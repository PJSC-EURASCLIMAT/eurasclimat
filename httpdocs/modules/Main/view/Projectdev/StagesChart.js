Ext.define('EC.Main.view.Projectdev.StagesChart', {
    extend: 'Ext.chart.Chart',
    
    title:'График выполнения проекта',
    
    border: false,
    
    itemId: 'stagesChart',
    
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
        highlight:true,
        title:'Плановый график и сроки выполения этапов',
        xField: 'date_plan_end',
        yField: 'name',
        tips: {
            trackMouse: true,
            width: 200,
            height: 28,
            renderer: function(storeItem, item) {
              this.setTitle(storeItem.get('name'));
            }
        },
        style: {
          stroke: '#20A020',
          'stroke-width': 2,
          opacity: 1
        }
      },{
          type: 'line',
          highlight:true,
          title:'Фактический график и сроки выполения этапов',
          xField: 'date_fact_end',
          yField: 'name',
          style: {
            stroke: '#F8F808',
            'stroke-width': 2,
            opacity: 1
         },
         tips: {
            trackMouse: true,
            width: 200,
            height: 28,
            renderer: function(storeItem, item) {
              this.setTitle(storeItem.get('name'));
            }
        }
      }, {
        type: 'line',
        highlight:true,
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
        highlight:true,
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
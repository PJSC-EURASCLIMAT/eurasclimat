Ext.define('Project.view.execution.StageChart', {
    
    extend: 'Ext.chart.Chart',
    
    alias: 'widget.project-stage-chart',
    
    title: 'График выполнения проекта',
    
    itemId: 'stagesChart',

    store: {
        type: 'project-stage-chart-store',
        id: 'projectStageChartStore'
    },
    
    layout: 'fit',
    
    legend: {
        position: 'bottom',
        calcPosition: function() {
            var me = this,
                x, y,
                legendWidth = me.width,
                legendHeight = me.height,
                padding = me.padding,
                chart = me.chart,
                chartBBox = chart.chartBBox,
                insets = chart.insetPadding,
                chartWidth = chartBBox.width - (insets * 2),
                chartHeight = chartBBox.height - (insets * 2),
                chartX = chartBBox.x + insets,
                chartY = chartBBox.y + insets,
                surface = chart.surface,
                mfloor = Math.floor;

            // Find the position based on the dimensions
            switch(me.position) {
                case "left":
                    x = insets;
                    y = mfloor(chartY + chartHeight / 2 - legendHeight / 2);
                    break;
                case "right":
                    x = mfloor(surface.width - legendWidth) - insets;
                    y = mfloor(chartY + chartHeight / 2 - legendHeight / 2);
                    break;
                case "top":
                    x = mfloor(chartX + chartWidth / 2 - legendWidth / 2);
                    y = insets;
                    break;
                case "bottom":
                    x = 10;//;mfloor(chartX + chartWidth / 2 - legendWidth / 2);
                    y = mfloor(surface.height - legendHeight) - insets;
                    break;
                default:
                    x = mfloor(me.origX) + insets;
                    y = mfloor(me.origY) + insets;
            }

            return { x: x, y: y };
    }
    },
    
    axes: [{
        type: 'Category',
        position: 'left',
        fields: ['finish_display'],
        title: 'Этапность',
        grid: true
    }, {
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
        highlight: true,
        title: 'Плановый график и сроки выполения этапов',
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
    }, {
        type: 'line',
        highlight: true,
        title: 'Фактический график и сроки выполения этапов',
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
        highlight: true,
        title: 'Финиш плановый',
        xField: 'date_plan_finish',
        yField: 'finish_display',
        showMarkers: false,
        style: {
            stroke: '#20A020',
            'stroke-width': 2,
            opacity: 1
        }
    }, {
        type: 'line',
        highlight: true,
        title: 'Финиш фактический',
        xField: 'date_fact_finish',
        yField: 'finish_display',
        showMarkers: false,
        style: {
            stroke: '#F8F808',
            'stroke-width': 2,
            opacity: 1
        }
    }]
});
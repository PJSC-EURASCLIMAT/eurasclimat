Ext.define('EC.Catalog.view.Chart', {

    extend: 'Ext.chart.Chart',
    
    animate: false,
    
    store: Ext.create('Ext.data.JsonStore', {
        fields: [
            'name', 'data1', 'data2', 'data3', 'data4', 
            'data5', 'data6', 'data7', 'data9', 'data9'
        ]
    }),
    
    insetPadding: 5,
    
    axes: [{
        type: 'Numeric',
        minimum: 0,
        position: 'bottom',
        fields: ['data1'],
        title: false,
        grid: true,
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0'),
            font: '10px Arial'
        }
    }, {
        type: 'Category',
        position: 'left',
        fields: ['name'],
        title: false,
        label: {
            font: '11px Arial',
            renderer: function(name) {
                return name.substr(0, 3) + ' 07';
            }
        }
    }],
    
    series: [{
        type: 'line',
        axis: 'left',
        yField: 'name',
        xField: 'data1',
        tips: {
            trackMouse: true,
            width: 80,
            height: 40,
            renderer: function(storeItem, item) {
                this.setTitle(storeItem.get('name'));
                this.update(storeItem.get('data1'));
            }
        },
        style: {
            fill: '#38B8BF',
            stroke: '#38B8BF',
            'stroke-width': 3
        },
        markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0,
            fill: '#38B8BF',
            stroke: '#38B8BF'
        }
    }]
});
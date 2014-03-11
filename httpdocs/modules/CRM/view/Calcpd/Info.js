Ext.define('EC.CRM.view.Calcpd.Info', {
    
    extend: 'Ext.window.Window',
    
    requires: [
        'Ext.ux.grid.feature.MultiGrouping'
    ],
    
    layout: 'fit',
    
    autoShow: true,

    bodyPadding: 5,
    
    modal: true,
    
    maximizable: true,
    
    width: 1000,
    
    height: 600,
    
    title: 'Информация по ценам на ПИР',
    
    items: [{
        xtype: 'grid',
        store: 'EC.CRM.store.Calcpd.Info',
        layout: 'fit',
        enableColumnHide: false,
        enableColumnMove: false,
        features: [{
            ftype: 'multigrouping',
            enableGroupingMenu: false,
            hideGroupedHeader: true,
            startCollapsed: false
        }],
        columns: [{
            header: 'Тип объекта',
            dataIndex: 'obj_type'
        }, {
            header: 'Тип помещения',
            dataIndex: 'obj_class'
        }, {
            header: 'Наименование работы',
            dataIndex: 'serv',
            flex: 1,
            hideable: false,
            sortable: false
        }, {
            text: 'Цена за м.кв. в зависисимости от квадратуры помещения',
            columns: [{
                xtype: 'numbercolumn',
                text: '< 500 м.кв.',
                hideable: false,
                sortable: false,
                align: 'right',
                width: 100,
                dataIndex: 'price1',
                renderer: xlib.formatCurrency
            }, {
                xtype: 'numbercolumn',
                text: '500 - 1000 м.кв.',
                hideable: false,
                sortable: false,
                align: 'right',
                width: 100,
                dataIndex: 'price2',
                renderer: xlib.formatCurrency
            }, {
                xtype: 'numbercolumn',
                text: '1000 - 5000 м.кв.',
                hideable: false,
                sortable: false,
                align: 'right',
                width: 100,
                dataIndex: 'price3',
                renderer: xlib.formatCurrency
            }, {
                xtype: 'numbercolumn',
                text: '5000 - 10000 м.кв.',
                hideable: false,
                sortable: false,
                align: 'right',
                width: 100,
                dataIndex: 'price4',
                renderer: xlib.formatCurrency
            }, {
                xtype: 'numbercolumn',
                text: '> 10000 м.кв.',
                hideable: false,
                sortable: false,
                align: 'right',
                width: 100,
                dataIndex: 'price5',
                renderer: xlib.formatCurrency
            }]
        }]
    }]
});
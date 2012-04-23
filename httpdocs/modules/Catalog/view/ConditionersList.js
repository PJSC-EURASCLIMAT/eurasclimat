Ext.define('EC.Catalog.view.ConditionersList', {

    extend: 'Ext.grid.Panel',
    
    requires: ['xlib.RowExpander'],
   
    alias: ['widget.ConditionersList'],
    
    store: 'EC.Catalog.store.Conditioners',
    
    layout: 'fit',
    
    border: false,
    
    forceFit: true,
    
    dockedItems: [{
        title: 'Фильтр продукции',
        xtype: 'panel',
        bodyCls: 'x-tab-bar',
        layout: 'column',
        collapsible: true,
        border: false,
        dock: 'top',
        //height: 120,
        defaults: {
            padding: 10,
            bodyCls: 'x-tab-bar',
            border: false,
            width: 170
        },
        items: [{
            items: [{ 
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Страна',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [{name: 'Страна'}] })
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Марка',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [{name: 'Марка'}] })
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Наличие',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [{name: 'Наличие'}] })
            }]
        }, {
            items: [{ 
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Тип продукции',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [{name: 'Тип продукции'}] })
            }, {
                xtype: 'combo', displayField: 'name', valueField: 'name', emptyText: 'Тип исполнения',
                store: Ext.create('Ext.data.Store', { fields: ['name'], data: [{name: 'Тип исполнения'}] })
            }]
        }],
        listeners: {
            collapse: function(panel) {
                panel.ownerCt.ownerCt.doLayout();
            },
            expand: function(panel) {
                panel.ownerCt.ownerCt.doLayout();
            } 
        }
    }],
    
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : [
            '<div style="padding: 10px;"><table><tr>',
            '<td>',
            '<p><b>Охлаждение:</b> {cooling}</p>',
            '<p><b>Обогрев:</b> {heating}</p><br>',
            '<p><b>Площадь м²:</b> {square}</p>',
            '</td><td>',
            '<p><b>Охлаждение:</b> {cooling1}</p>',
            '<p><b>Обогрев:</b> {heating1}</p><br>',
            '<p><b>Площадь м³:</b> {volume}</p>',
            '</td>',
            '</tr></table></div>'
        ]
    }],
    
    initComponent: function() {

        this.columns = [{
            header: 'Группа оборудования', 
            dataIndex: 'group'
        }, {
            header: 'Наименование',
            dataIndex: 'name'
        }, {
            header: 'Марка',
            dataIndex: 'mark'
        }, {
            header: 'Маркировка',
            dataIndex: 'marking'
        }, {
            header: 'Тип продукции',
            dataIndex: 'product_type'
        }, {
            header: 'Тип исполнения',
            dataIndex: 'implementation_type'
        }, {
            header: 'Охлаждение',
            hidden: true,
            dataIndex: 'cooling'
        }, {
            header: 'Обогрев',
            hidden: true,
            dataIndex: 'heating'
        }, {
            header: 'Площадь м²',
            hidden: true,
            dataIndex: 'square'
        }, {
            header: 'Площадь м³',
            hidden: true,
            dataIndex: 'volume'
        }, {
            header: 'Охлаждение',
            hidden: true,
            dataIndex: 'cooling1'
        }, {
            header: 'Обогрев',
            hidden: true,
            dataIndex: 'heating1'
        }, {
            header: 'Лет',
            hidden: true,
            dataIndex: 'years'
        }, {
            header: 'Склад',
            hidden: true,
            dataIndex: 'storage'
        }, {
            header: 'Резерв',
            hidden: true,
            dataIndex: 'reserve'
        }, {
            header: 'Заказ',
            hidden: true,
            dataIndex: 'order'
        }, {
            header: 'Ед. изм.',
            hidden: true,
            dataIndex: 'measure'
        }, {
            header: 'Цена',
            dataIndex: 'price'
        }, {
            header: 'Действия',
            xtype:'actioncolumn',
            width:50,
            items: [{
                icon: '/images/icons/fam/plugin.gif',
                //iconCls: 'option', // 'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                tooltip: 'Редактировать',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    alert("Редактирование " + rec.get('marking'));
                }
            }, {
                icon: '/images/icons/fam/delete.gif',
                //iconCls: 'remove', // 'extjs/examples/restful/images/delete.png',
                tooltip: 'Удалить',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    alert("Удаление " + rec.get('marking'));
                }
            }]
        }];

        this.callParent(arguments);
    }
    
});
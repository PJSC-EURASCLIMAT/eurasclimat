Ext.define('EC.Catalog.view.Conditioners.List', {

    extend: 'Ext.grid.Panel',
    
    requires: ['xlib.RowExpander'],
   
    alias: ['widget.ConditionersList'],
    
    store: 'EC.Catalog.store.Conditioners',
    
    layout: 'fit',
    
    border: false,

    cls: 'x-border-top',
    
    forceFit: true,
    
    title: 'Результаты выборки',
    
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: [
            '<div style="padding: 10px;"><table width="100%" border="0">',
            '<tr valign="top">',
            '<td rowspan="3" width="320"><img src="http://placehold.it/300x220"/></td>',
            '<td colspan="3" height="40"><h1><p>{name} {mark} {marking}</p></h1></td>',
            '</tr><tr valign="top"><td>',
            '<p>Группа оборудования: <b>{group}</b></p>',
            '<p>Тип продукции: <b>{product_type}</b></p>',
            '<p>Тип исполнения: <b>{implementation_type}</b></p>',
            '<p>Назначение продукции: <b>{purpose}</b></p>',
            '<p>Состояние продукции: <b>{condition}</b></p>',
            '<p>Страна изготовления: <b>{country}</b></p>',
            '<p>Единица измерения: <b>{measure}</b></p>',
            '</td><td>',
            '<p><b>Производительность</b></p>',
            '<p>Охлаждение: <b>{output_cooling} кВт</b></p>',
            '<p>Обогрев: <b>{output_heating} кВт</b></p>',
            '<br/>',
            '<p><b>Потребление</b></p>',
            '<p>Охлаждение: <b>{input_cooling} кВт</b></p>',
            '<p>Обогрев: <b>{input_heating} кВт</b></p>',
            '</td><td>',
            '<p>Площадь: <b>{square} м²</b></p>',
            '<p>Объём: <b>{volume} м³</b></p>',
            '<p>Гарантия: <b>{years} лет</b></p>',
            '<br/>',
            '<p>Склад: <b>{storage}</b></p>',
            '<p>Резерв: <b>{reserve}</b></p>',
            '<p>Заказ: <b>{order}</b></p>',
            '</td></tr>',
            '<tr valign="top">',
            '<td colspan="3" height="40"><p>Цена: <b>{price} руб.</b></p></td>',
            '</tr></table></div>'
        ]
    }],
    
    tools: [{
        type: 'plus',
        tooltip: 'Добавить',
        action: 'additem'
    }, {
        type: 'refresh',
        tooltip: 'Обновить',
        action: 'refresh'
    }],
    
    initComponent: function() {

        this.columns = [{
            header: 'Группа оборудования',
            //flex: 1,
            dataIndex: 'group_id'
        }, {
            header: 'Наименование',
            dataIndex: 'name_id'
        }, {
            header: 'Марка',
            dataIndex: 'mark_id'
        }, {
            header: 'Маркировка',
            dataIndex: 'marking'
        }, {
            header: 'Тип продукции',
            dataIndex: 'product_type_id'
        }, {
            header: 'Тип исполнения',
            dataIndex: 'implementation_type_id'
        }, {
            header: 'Страна',
            hidden: true,
            dataIndex: 'country'
        }, {
            header: 'Состояние продукции',
            hidden: true,
            dataIndex: 'condition'
        }, {
            header: 'Назначение продукции',
            hidden: true,
            dataIndex: 'purpose'
        }, {
            header: 'Охлаждение',
            hidden: true,
            dataIndex: 'input_cooling'
        }, {
            header: 'Обогрев',
            hidden: true,
            dataIndex: 'input_heating'
        }, {
            header: 'Площадь м²',
            hidden: true,
            dataIndex: 'square'
        }, {
            header: 'Объём м³',
            hidden: true,
            dataIndex: 'volume'
        }, {
            header: 'Охлаждение',
            hidden: true,
            dataIndex: 'output_cooling'
        }, {
            header: 'Обогрев',
            hidden: true,
            dataIndex: 'output_heating'
        }, {
            header: 'Гарантия',
            hidden: true,
            dataIndex: 'warranty'
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
            xtype:'actioncolumn',
            width: 40,
            items: [{
                icon: '/images/icons/fam/plugin.gif',
                tooltip: 'Редактировать',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            }, {
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('deleteitem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            }]
        }];

        this.callParent(arguments);
    }
});
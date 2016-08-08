Ext.define('EC.CRM.view.Projects.Configurator.SpecialServicesList', {

    extend: 'Ext.grid.Panel',

    title: 'Специальные услуги',
    
    alias: 'widget.ConfiguratorSpecialServicesList',
    
    layout: 'fit',
    
    permissions: acl.isUpdate('projects'),
    
    initComponent: function() {
        
        var actions = [];
        
        if (this.permissions) {
            
            actions.push({
                icon: '/images/icons/edit.png',
                tooltip: 'Редактировать',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            });
            
            actions.push({
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('deleteitem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            });
        }
        
        this.store = 'EC.CRM.store.Projects.Configurator.SpecialServices';
        
        this.columns = [{
            header: 'Артикул',
            dataIndex: 'code',
            width: 90
        }, {
            header: 'Наименование',
            dataIndex: 'name',
            flex: 1
        }, {
            header: 'Ед. изм.',
            dataIndex: 'measure',
            width: 60
        }, {
            header: 'Сроки',
            dataIndex: 'term',
            width: 60
        }, {
            header: 'Цена',
            dataIndex: 'price',
            width: 60,
            renderer: xlib.formatCurrency
        }, {
            header: 'Кол-во',
            dataIndex: 'number',
            width: 60
        }, {
            header: 'Сумма',
            width: 100,
            dataIndex: 'summ',
            renderer: xlib.formatCurrency
        }, {
            header: 'Материалы',
            width: 100,
            dataIndex: 'expendables_summ',
            renderer: xlib.formatCurrency
        }, {
            header: 'Всего',
            width: 100,
            dataIndex: 'total_summ',
            renderer: xlib.formatCurrency
        }, {
            xtype:'actioncolumn',
            width: parseInt(actions.length) * 20,
            items: actions
        }];
        
        this.tbar = [{
            xtype: 'button',
            text: 'Добавить',
            iconCls: 'add',
            hidden: !this.permissions,
            action: 'additem'
        }, {
        	xtype: 'button',
            text: 'Скачать список в Excel',
            iconCls: 'excel',
            action: 'excel'
        }, '->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            action: 'refresh'
        }]
        
        this.callParent(arguments);
    },
    
    constructor: function() {
        
        this.plugins = [{
            ptype: 'rowexpander',
            rowBodyTpl: Ext.create('Ext.XTemplate', 
                '<table width="100%" cellpadding="3">',
                '<tr><td  style="border-bottom: 1px solid grey;" colspan="5" align="center">',
                '<b>Инструменты и материалы:</b></td></tr>',
                '<tr><td><b>Наименование</b></td>',
                '<td><b>Ед. изм.</b>',
                '<td><b>Количество</b>',
                '</td><td><b>Цена</b></td>',
                '</td><td><b>Сумма</b></td></tr>',
                '<tpl for="expendables">',
                '<tr><td>{name}</td>',
                '<td>{measure}</td>',
                '<td>{number:this.formatNumber}</td>',
                '<td>{price:this.formatCurrency}</td>',
                '<td>{summ:this.formatCurrency}</td>',
                '</tr></tpl>',
                '</table><br/>', {
                    formatNumber: function(v) { return Ext.util.Format.currency(v, ' ', 3); },
                    formatCurrency: function(v) { return xlib.formatCurrency(v); }
                })
        }];
       
        this.callParent(arguments);
    }
});
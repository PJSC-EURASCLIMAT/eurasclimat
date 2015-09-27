Ext.define('EC.CRM.view.Projects.Configurator.EquipmentList', {

    extend: 'Ext.grid.Panel',

    title: 'Оборудование',
    
    alias: 'widget.ConfiguratorEquipmentList',
    
    layout: 'fit',
    
    permissions: acl.isUpdate('projects'),
    
    initComponent: function() {
        
        var actions = [];
        
        if (this.permissions) {
            
            actions.push({
                icon: '/images/icons/edit.png',
                tooltip: 'Редактировать документ',
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
        
        this.store = Ext.create('EC.CRM.store.Projects.Configurator.Equipment');
        
        this.columns = [{
            header: 'Артикул',
            dataIndex: 'code',
            width: 90
        }, {
            header: 'Марка',
            dataIndex: 'mark',
            width: 60
        }, {
            header: 'Маркировка',
            dataIndex: 'marking',
            flex: 1
        }, {
            header: 'Цена',
            dataIndex: 'price',
            width: 100,
            renderer: xlib.formatCurrency
        }, {
            header: 'Кол-во',
            dataIndex: 'number',
            width: 60
        }, {
            header: 'Сумма',
            width: 150,
            dataIndex: 'eq_summ',
            renderer: xlib.formatCurrency
        }, {
            header: 'Услуги',
            width: 100,
            dataIndex: 'services_summ',
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
        }];
        
        this.callParent(arguments);
    },
    
    constructor: function() {
        
        this.plugins = [{
            ptype: 'rowexpander',
            rowBodyTpl: Ext.create('Ext.XTemplate', 
                '<table width="100%" cellpadding="3">',
                '<tr><td  style="border-bottom: 1px solid grey;" colspan="3" align="center">',
                '<b>Сопутствующие услуги:</b></td></tr>',
                '<tr><td><b>Наименование</b></td><td><b>Сроки</b></td><td><b>Цена</b></td></tr>',
                '<tpl for="services">',
                '<tr><td>{name}</td><td>{term}</td><td>{price:this.formatChange}</td></tr></tpl>',
                '</table><br/>', {formatChange: function(v) { return xlib.formatCurrency(v);}})
        }];
       
        this.callParent(arguments);
    }
});
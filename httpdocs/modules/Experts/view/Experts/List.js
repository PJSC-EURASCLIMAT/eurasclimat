Ext.define('EC.Experts.view.Experts.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.ExpertsList',

    uses: ['xlib.CheckColumn'],

    layout: 'fit',

    store: 'EC.Experts.store.Experts',
    
    permissions: acl.isUpdate('experts'),

    simple: false,

    initComponent: function() {
        
        var actions = [];

        if (this.permissions === true && this.simple === false) {

            actions.push({
                icon: '/images/icons/fam/plugin.gif',
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
        
        this.columns = [{
            header: 'Имя',
            xtype: 'templatecolumn',
            tpl: '<a href="#/experts/{id}/show">{name}</a>',
            flex: .5
        }, {
            header: 'Статус',
            dataIndex: 'status',
            flex: .5
        }, {
            header: 'Тип инженерного оборудования',
            dataIndex: 'equipment',
            flex: .5
        }, {
            header: 'Город',
            dataIndex: 'city',
            flex: .5
        }, {
            header: 'Страна',
            dataIndex: 'country',
            flex: .5
        }, {
            xtype: 'checkcolumn',
            header: 'Активен',
            dataIndex: 'active',
            stopSelection : false,
            listeners: {
                checkchange: function( grid, rowIndex, checked, eOpts ) {
                    this.up('panel').fireEvent('activechange', rowIndex, checked);
                }
            },
            width: 70
        }, {
            xtype:'actioncolumn',
            width: parseInt(actions.length) * 20,
            items: actions
        }];

        this.tbar = [{
            xtype: 'button',
            text: 'Создать',
            iconCls: 'add',
            hidden: !this.permissions,
            action: 'additem'
        }, {
            xtype: 'button',
            text: 'Настойки',
            menu: [
                {
//                    xtype: 'button',
                    text: 'Типы инж. оборудования',
                    icon: '/images/icons/fam/plugin.gif',
                    iconCls: 'x-btn',
                    hidden: !this.permissions,
                    scope: this,
                    handler: function() {
                        this.fireEvent('openref','equipment');
                    }
                },{
//                    xtype: 'button',
                    text: 'Опыт',
                    icon: '/images/icons/fam/plugin.gif',
                    iconCls: 'x-btn',
                    hidden: !this.permissions,
                    disabled: true,
                    scope: this,
                    handler: function() {
                        this.fireEvent('openref','experience');
                    }
                },{
//                    xtype: 'button',
                    text: 'Типы деятельности',
                    icon: '/images/icons/fam/plugin.gif',
                    iconCls: 'x-btn',
                    hidden: !this.permissions,
                    scope: this,
                    handler: function() {
                        this.fireEvent('openref','job_types');
                    }
                },{
//                    xtype: 'button',
                    text: 'Рейтинг',
                    icon: '/images/icons/fam/plugin.gif',
                    iconCls: 'x-btn',
                    hidden: !this.permissions,
                    scope: this,
                    handler: function() {
                        this.fireEvent('openref','rating');
                    }
                },{
//                    xtype: 'button',
                    text: 'Статусы',
                    icon: '/images/icons/fam/plugin.gif',
                    iconCls: 'x-btn',
                    hidden: !this.permissions,
                    scope: this,
                    handler: function() {
                        this.fireEvent('openref','statuses');
                    }
                }

            ]
        }, '->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            action: 'refresh'
        }]


        this.callParent(arguments);

        this.getStore().getProxy().extraParams = {activeOnly: true};
    }
});
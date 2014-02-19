Ext.define('EC.Experts.view.Experts.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.ExpertsList',

    uses: ['xlib.CheckColumn'],

    layout: 'fit',

    permissions: acl.isUpdate('experts'),

    activeOnly: false,
    
    pageSize: 25,

    isPortlet: false,

    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: Ext.create('Ext.XTemplate',
            '<table width="100%" style="padding:10px" border="0">',
                '<tr valign="top">',
                    '<td width="100">',
                        '<tpl if="have_avatar == 1">',
                            '<img src="images/users/{account_id}.jpg?{[this.dc()]}" width="100" style="float: left;margin-right: 15px">',
                        '<tpl else>',
                            '<img src="http://placehold.it/100x100" style="float: left;margin-right: 15px"/>',
                        '</tpl>',
                    '</td>',
                    '<td>',
                        'Email: {login}<br/>',
                        'г. {city}, {country}<br/>',
                        'Тип инженерных систем: {equipment}<br/>',
                        'Статус: {status}<br/>',
                    '</td>',
                '</tr>',
            '</table>',
            {
                dc: function() {
                    return new Date().getTime();
                }
                ,ellip: function (value) {
                    return Ext.String.ellipsis(value, 100);
                }
            }
        )
    }],

    initComponent: function() {

        var actions = [];

        this.columns = [{
            header: 'ФИО',
            xtype: 'templatecolumn',
            tpl: '<a href="#/profile/{account_id}/show">{name}</a>',
            flex: .5
        }, {
            header: 'Статус',
            dataIndex: 'status',
            flex: .5
        }, {
            header: 'Инж. оборудование',
            dataIndex: 'equipment',
            flex: .5
        }];

        if (this.permissions === true && this.activeOnly === false && !this.isPortlet) {

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


            this.columns.push({
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
            });


            this.tbar = [{
                xtype: 'button',
                text: 'Создать',
                iconCls: 'add',
                hidden: !this.permissions,
                action: 'additem'
            }, {
                xtype: 'button',
                text: 'Настройки',
                menu: [{
                    text: 'Типы инж. оборудования',
                    icon: '/images/icons/fam/plugin.gif',
                    iconCls: 'x-btn',
                    hidden: !this.permissions,
                    scope: this,
                    handler: function() {
                        this.fireEvent('openref','equipment');
                    }
                }, {
                    text: 'Типы деятельности',
                    icon: '/images/icons/fam/plugin.gif',
                    iconCls: 'x-btn',
                    hidden: !this.permissions,
                    scope: this,
                    handler: function() {
                        this.fireEvent('openref','job_types');
                    }
                }, {
                    text: 'Рейтинг',
                    icon: '/images/icons/fam/plugin.gif',
                    iconCls: 'x-btn',
                    hidden: !this.permissions,
                    scope: this,
                    handler: function() {
                        this.fireEvent('openref','rating');
                    }
                }, {
                    text: 'Статусы',
                    icon: '/images/icons/fam/plugin.gif',
                    iconCls: 'x-btn',
                    hidden: !this.permissions,
                    scope: this,
                    handler: function() {
                        this.fireEvent('openref','statuses');
                    }
                }]
            }];

        }

        this.bbar = Ext.create('Ext.PagingToolbar', {
            pageSize: 25,
            store: this.store,
            displayInfo: true,
            plugins: Ext.create('xlib.ProgressBarPager', {})
        });
        
        this.callParent(arguments);
    }
});
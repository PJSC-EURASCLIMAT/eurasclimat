Ext.define('EC.Experts.view.Experts.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.ExpertsList',

    uses: ['xlib.CheckColumn'],

    layout: 'fit',

    permissions: acl.isUpdate('experts'),

    activeOnly: false,

    requires: ['xlib.EmptyCombo'],

    initComponent: function() {

        var actions = [];
        this.tbar = [];

        this.columns = [{
            header: 'Имя',
            xtype: 'templatecolumn',
            tpl: Ext.create('Ext.XTemplate',
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
                'ФИО: {name}<br/><br/>',
                'Email: {login}<br/><br/>',
                'г. {city}, {country}<br/><br/>',
                '</td>',
                '</tr>',

                '<tr valign="top">',
                '<td colspan="2">',
                '<p><b>Специализация</b><p>',
                '<p>Тип инженерного оборудования: {equipment}</p>',
                '<p>Статус: {status}</p>',
                '<p>Описание: {[this.ellip(values.desc)]}</p>',
                '</td>',
                '</tr>',
                {
                    dc: function() {
                        return new Date().getTime();
                    }
                    ,ellip: function (value) {
                        return Ext.String.ellipsis(value, 100);
                    }
                }
            ),
            flex: .5
        }];

        if (this.permissions === true && this.activeOnly === false) {

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
            }];

        }

        this.tbar.push({
            emptyText: 'Инж. оборудование',
            xtype: 'EmptyCombo',
            name: 'equip_id',
            displayField: 'name',
            emptyFieldText: '- Все инж. оборудование -',
            flex: 1,
            valueField: 'id',
            store: 'EC.Experts.store.Equipment'
        },
        {
            emptyText: 'Статус',
            xtype: 'EmptyCombo',
            name: 'status_id',
            emptyFieldText: '- Все статусы -',
            displayField: 'name',
            flex: 1,
            valueField: 'id',
            store: 'EC.Experts.store.Statuses'
        });

        this.tbar.push( '->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            action: 'refresh'
        });

        this.callParent(arguments);
    }
});
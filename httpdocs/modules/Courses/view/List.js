Ext.define('EC.Courses.view.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.courses-list',

    requires: [
        'xlib.grid.FiltersFeature',
        'Ext.ux.PagingToolbarResizer',
        'Ext.ux.ProgressBarPager'
    ],

    layout: 'fit',

    store: 'EC.Courses.store.Courses',

    permissions: acl.isUpdate('courses'),

    features: [{
        ftype: 'filters',
        encode: true,
        filters: [{
            type: 'numeric',
            dataIndex: 'closed'
        }],
        showMenu: false
    }],

    isPortlet: false,

    viewConfig: {
        getRowClass: function(record) {
            return record.get('closed') === 1 ? 'red-row' : '';
        }
    },



    initComponent: function() {

        var actions = [];

        this.listeners = {
            afterrender: function() {
                this.filters.createFilters();
            },
            scope: this
        };

        this.columns = [{
            header: 'Группа',
            itemId: 'groupColumn',
            dataIndex: 'group_name',
            hidden: this.isPortlet,
            width: 250
        }, {
            header: '№ оферты',
            dataIndex: 'offer_num',
            width: 100
        }, {
            header: 'Название',
            dataIndex: 'name',
            flex: 1
//        }, {
//            header: 'Описание',
//            dataIndex: 'description',
//            hidden: this.isPortlet,
//            flex: 1
        }, {
            header: 'Цена',
            dataIndex: 'price',
            width: 80,
            align: 'right',
            renderer: xlib.formatCurrency
        }];

        this.tbar = ['->', 'Отображать: ', {
            xtype: 'combo',
            valueField: 'id',
            displayField: 'name',
            editable: false,
            value: 0,
            store: Ext.create('Ext.data.Store', {
                fields: ['id', 'name'],
                data : [
                    {"id": 0, "name": "Актуальные курсы"},
                    {"id": 1, "name": "Архивные курсы"},
                    {"id": 2, "name": "Все курсы"}
                ]
            }),
            listeners: {
                select: function( combo, records, eOpts ) {
                    var f = this.filters.getFilter('closed');
                    if ( records[0].data.id === 2 ) {
                        f.setActive(false);
                        return;
                    }
                    f.setValue({eq: records[0].data.id});
                    f.setActive(true);
                },
                scope: this
            }
        },{
            xtype: 'container',
            layout: 'hbox',
            margin: 5,
            items: [{
                xtype: 'container',
                width: 15,
                height: 15,
                margin: '0 5 0 0',
                style: { background: '#FFD8D2', border: "1px solid white" }
            },{
                xtype: 'label',
                text: ' - архивные курсы'
            }]
        }];

        if (this.permissions === true && !this.isPortlet) {

            actions.push({
                icon: '/images/icons/fam/plugin.gif',
                tooltip: 'Редактировать',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            });

            this.columns.push({
                xtype:'actioncolumn',
                width: parseInt(actions.length) * 22,
                items: actions
            });

            this.tbar.unshift({
                xtype: 'button',
                text: 'Добавить курс',
                iconCls: 'add',
                action: 'additem'
            });

        }

        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: !this.isPortlet,
            plugins: this.isPortlet ? [] : [
                {ptype: 'pagingtoolbarresizer'},
                {ptype: 'progressbarpager'}
            ]
        });
        
        this.callParent(arguments);
    }
});
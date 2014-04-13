Ext.define('EC.Courses.view.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.courses-list',

    uses: ['xlib.CheckColumn'],

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
            return record.get('closed') === 0 ? 'green-row' : 'red-row';
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
            flex: 1
        },{
            header: '№ оферты',
            dataIndex: 'offer_num',
            width: 70
        },{
            header: 'Название',
            dataIndex: 'name',
            flex: 1
        },{
            header: 'Описание',
            dataIndex: 'description',
            flex: 1
        },{
            header: 'Цена',
            dataIndex: 'price',
            width: 70
        }];

        this.tbar = ['->',{
            xtype: 'combo',
            valueField: 'id',
            displayField: 'name',
            value: 2,
            store: Ext.create('Ext.data.Store', {
                fields: ['id', 'name'],
                data : [
                    {"id": 2, "name":"Все курсы"},
                    {"id": 1, "name":"Закрытые"},
                    {"id": 0, "name":"Открытые"}
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
                text: ' - закрытые курсы'
            },{
                xtype: 'container',
                width: 15,
                height: 15,
                margin: '0 5 0 15',
                style: { background: '#A4F0B0', border: "1px solid white" }
            },{
                xtype: 'label',
                text: ' - открытые курсы'
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
//            plugins: this.isPortlet ? [] : Ext.create('xlib.ProgressBarPager', {})
        });
        
        this.callParent(arguments);
    }
});
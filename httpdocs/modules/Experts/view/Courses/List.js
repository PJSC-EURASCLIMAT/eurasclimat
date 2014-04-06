Ext.define('EC.Experts.view.Courses.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.ExpertsCoursesList',

    uses: ['xlib.CheckColumn'],

    layout: 'fit',

    store: 'EC.Experts.store.Courses',

    permissions: acl.isUpdate('courses'),

    isPortlet: false,

    initComponent: function() {

        var actions = [];

        //TODO добавить колонки
        //TODO добавить СRUD
        //TODO добавить фильтрацию по type_id завернуть через plugin

        this.columns = [{
            header: 'Название',
            dataIndex: 'name',
            flex: 1
        },{
            header: 'Описание',
            dataIndex: 'description',
            flex: 1
        },{
            header: 'Категория',
            dataIndex: 'type_name',
            flex: 1
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
                xtype:'actioncolumn',
                width: parseInt(actions.length) * 20,
                items: actions
            });

            this.tbar = [{
                xtype: 'button',
                text: 'Создать',
                iconCls: 'add',
                action: 'additem'
            }];

        }

        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: !this.isPortlet,
            plugins: this.isPortlet ? [] : Ext.create('xlib.ProgressBarPager', {})
        });
        
        this.callParent(arguments);
    }
});
Ext.define('EC.Main.controller.News', {
    
    extend: 'Ext.app.Controller',

    stores: [
        'EC.Main.store.News.News',
        'EC.Main.store.News.Categories'
    ],
    
    models: ['EC.Main.model.News.News'],
    
    views: [
        'EC.Main.view.News.List',
        'EC.Main.view.News.Edit',
        'EC.Main.view.News.PortletList'
    ],

    addURL: '/json/default/news/add',

    updateURL: '/json/default/news/update',

    deleteURL: '/json/default/news/delete',

    catListURL: '/json/default/news/get-categories',

    addCatURL: '/json/default/news/add-category',

    updateCatURL: '/json/default/news/update-category',

    deleteCatURL: '/json/default/news/delete-category',

    permissions: acl.isUpdate('news'),

    run: function(container) {
        
        var viewName = ('portlet' == container.getXType()) 
            ? 'EC.Main.view.News.PortletList' : 'EC.Main.view.News.List';
            
        this.grid = container.add(this.getView(viewName).create({
            listeners: {
//                itemclick: this.openCard,
                afterrender: function(g) {
                    // To enable filters let initialize grid to create filters
                    g.getView().getFeature('filter_feature').createFilters();
                },
                scope: this
            }
        }));

        this.grid.on ('add', this.showAddWin, this);
        this.grid.on ('edit', this.showEditWin, this);
        this.grid.on ('editCategories', this.editCategories, this);

        this.grid.down('toolbar NewsCategoriesCombo').on('change', this.onFilter, this.grid);
        this.grid.down('toolbar NewsActualityCombo').on('change', this.onActualityFilter, this.grid);
    },

    editCategories: function() {
        this.catList = Ext.create('xlib.Reference.List',{
            border: false,
            store: 'EC.Main.store.News.Categories',
            getListURL: this.catListURL,
            addURL: this.addCatURL,
            updateURL: this.updateCatURL,
            deleteURL: this.deleteCatURL,
            permissions: this.permissions
        });

        this.catWin = Ext.create('Ext.window.Window',{
            title: 'Категории новостей',
            modal: true,
            width: 400,
            height: 300,
            layout: 'fit',
            items: [this.catList]
        });

        this.catWin.on('close', function() {
            this.catWin = null;
            this.catList = null;
            this.grid.store.load();
            this.grid.down('NewsCategoriesCombo').getStore().load();
        }, this);


        this.catWin.show();

    },

    showAddWin: function() {
        this.editWin = Ext.create('EC.Main.view.News.Edit');

        var form = this.editWin.down('form');
        var saveBtn = form.down('#saveBtn');
        var curUserId = xlib.Acl.Storage.getIdentity().id;

        form.down('[name=account_id]').setValue(curUserId);

        saveBtn.on('click', this.add, this)
    },

    showEditWin: function(record) {
        this.editWin = Ext.create('EC.Main.view.News.Edit');
        var form = this.editWin.down('form');
        var delBtn = form.down('#delBtn');
        var saveBtn = form.down('#saveBtn');

        form.loadRecord(record);

        delBtn.show();

        delBtn.on('click', this.delete, this);
        saveBtn.on('click', this.update, this)
    },

    add: function() {
        this.editWin.down('form').getForm().submit({
            url: this.addURL,
            scope: this,
            success: function(response, opts) {
                this.grid.getStore().load();
                this.editWin.close();
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Добавление не выполнено!');
            }
        });
        console.log('add new');
    },

    update: function() {
        this.editWin.down('form').getForm().submit({
            url: this.updateURL,
            scope: this,
            success: function(response, opts) {
                this.grid.getStore().load();
                this.editWin.close();
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Ошибка', 'Обновление не выполнено!');
            }
        });
        console.log('update new');
    },

    delete: function(id) {
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            if ('yes' === b) {
                this.editWin.down('form').getForm().submit({
                    url: this.deleteURL,
                    scope: this,
                    success: function(response, opts) {
                        this.grid.getStore().load();
                        this.editWin.close();
                    },
                    failure: function(response, opts) {
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    }
                });
            }
        }, this);
    },

    onFilter: function(combo, newValue, oldValue, eOpts) {

        var filter = this.getView().getFeature('filter_feature').getFilter(combo.fieldName),
            value = combo.getFilter();
        
        if (value === '') {
            filter.setActive(false);
        } else {
            filter.setActive(true);
            filter.setValue(value);
        }
    },
    
    onActualityFilter: function(combo, newValue, oldValue, eOpts) {
        this.getStore().getProxy().extraParams = {actuality: combo.getValue()};
        this.getStore().guaranteeRange(0, 10);
    }
});
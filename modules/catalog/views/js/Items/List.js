Ext.ns('Catalog.Items');

Catalog.Items.List = Ext.extend(Ext.grid.GridPanel, {

    listURL:    link('catalog', 'items', 'get-list'),
    
    deleteURL:  link('catalog', 'items', 'delete'),
    
    loadMask: true,

    permissions: acl.isUpdate('catalog'),

    defaultSortable: true,
    
    initComponent: function() {
        
        this.autoExpandColumn = Ext.id();
        
        this.ds = new Ext.data.JsonStore({
            url: this.listURL,
            remoteSort: true,
            autoLoad: true,
            root: 'data',
            sortInfo: {
                field: 'id',
                direction: 'ASC'
            },
            totalProperty: 'totalCount',
            fields: [
                'id',
                'sku',
                'title_name',
                'mark_name',
                'model',
                'product_type_name',
                'construction_type_name',
                'territoriality_name',
                'condition_name',
                'purpose_name',
                'availability_name',
                'system_type_name',
                'served_square',
                'served_capacity',
                'cooling_power',
                'heating_power',
                'drying_intensity',
                'air_flow_rate',
                'power_consumption_in_cooling_mode',
                'power_consumption_in_heating_mode',
                'cooling_energy_efficiency',
                'heating_energy_efficiency',
                'power_supply',
                'refrigerant',
                'interblock_communications_length',
                'differential_interconnects_heights',
                'drainage_pump',
                'winter_set',
                'noise_level',
                'manufacturer_warranty',
                'stock',
                'reserve',
                'order',
                'measure',
                'price'
            ]
        });
        
        this.sm = new Ext.grid.RowSelectionModel();
        
        var actions = new xlib.grid.Actions({
            autoWidth: true,
            items: [{
                text: 'Редактировать',
                iconCls: 'edit',
                hidden: !acl.isUpdate('catalog'),
                handler: this.onUpdate,
                scope: this
            }, {
                text: 'Удалить',
                iconCls: 'delete',
                hidden: !acl.isUpdate('catalog'),
                handler: this.onDelete,
                scope: this
            }],
            scope: this
        });
        
        this.colModel = new Ext.grid.ColumnModel({
            defaultSortable: true,
            columns: [{
                header: 'Артикул',
                dataIndex: 'sku',
                width: 60
            }, {
                header: 'Наименование',
                dataIndex: 'title_name',
                width: 200
            }, {
                header: 'Марка',
                dataIndex: 'mark_name',
                width: 100
            }, {
                header: 'Модель',
                dataIndex: 'model',
                minWidth: 200,
                id: this.autoExpandColumn
            }, {
                header: 'Тип продукции',
                dataIndex: 'product_type_name',
                width: 200
            }, {
                header: 'Тип исполнения',
                dataIndex: 'construction_type_name',
                width: 100
            }, {
                header: 'Территориальность производства',
                dataIndex: 'territoriality_name',
                hidden: true,
                width: 100
            }, {
                header: 'Состояние продукции',
                dataIndex: 'condition_name',
                hidden: true,
                width: 100
            }, {
                header: 'Назначение продукции',
                dataIndex: 'purpose_name',
                hidden: true,
                width: 100
            }, {
                header: 'Наличие продукции',
                dataIndex: 'availability_name',
                hidden: true,
                width: 100
            }, {
                header: 'Тип системы',
                dataIndex: 'system_type_name',
                hidden: true,
                width: 100
            }, {
                header: 'Площадь обслуживаемого помещения (кв.м)',
                dataIndex: 'served_square',
                hidden: true,
                width: 100
            }, {
                header: 'Объем обслуживаемого помещения (куб.м)',
                dataIndex: 'served_capacity',
                hidden: true,
                width: 100
            }, {
                header: 'Мощность охлаждения (кВт)',
                dataIndex: 'cooling_power',
                hidden: true,
                width: 100
            }, {
                header: 'Мощность обогрева (кВт)',
                dataIndex: 'heating_power',
                hidden: true,
                width: 100
            }, {
                header: 'Интенсивность осушки воздуха (л/ч)',
                dataIndex: 'drying_intensity',
                hidden: true,
                width: 100
            }, {
                header: 'Расход воздуха (куб.м/ч)',
                dataIndex: 'air_flow_rate',
                hidden: true,
                width: 100
            }, {
                header: 'Мощность потребления в режиме охлаждения (кВт)',
                dataIndex: 'power_consumption_in_cooling_mode',
                hidden: true,
                width: 100
            }, {
                header: 'Мощность потребления в режиме обогрева (кВт)',
                dataIndex: 'power_consumption_in_heating_mode',
                hidden: true,
                width: 100
            }, {
                header: 'Энергоэффективность охлаждения (EER)',
                dataIndex: 'cooling_energy_efficiency',
                hidden: true,
                width: 100
            }, {
                header: 'Энергоэффективность обогрева (EER)',
                dataIndex: 'heating_energy_efficiency',
                hidden: true,
                width: 100
            }, {
                header: 'Электропитание (В.Гц.Ф.)',
                dataIndex: 'power_supply',
                hidden: true,
                width: 100
            }, {
                header: 'Хладагент-теплоноситель',
                dataIndex: 'refrigerant',
                hidden: true,
                width: 100
            }, {
                header: 'Длина межблочных коммуникаций (м/п)',
                dataIndex: 'interblock_communications_length',
                hidden: true,
                width: 100
            }, {
                header: 'Перепад межблочных высот (м/п)',
                dataIndex: 'differential_interconnects_heights',
                hidden: true,
                width: 100
            }, {
                header: 'Наличие дренажной помпы',
                dataIndex: 'drainage_pump',
                hidden: true,
                width: 100
            }, {
                header: 'Наличие зимнего комплекта',
                dataIndex: 'winter_set',
                hidden: true,
                width: 100
            }, {
                header: 'Уровень шума (дБА)',
                dataIndex: 'noise_level',
                hidden: true,
                width: 100
            }, {
                header: 'Период гарантии производителя',
                dataIndex: 'manufacturer_warranty',
                hidden: true,
                width: 100
            }, {
                header: 'Склад',
                dataIndex: 'stock',
                hidden: true,
                width: 100
            }, {
                header: 'Резерв',
                dataIndex: 'reserve',
                hidden: true,
                width: 100
            }, {
                header: 'Заказ',
                dataIndex: 'order',
                hidden: true,
                width: 100
            }, {
                header: 'Eд. изм.',
                dataIndex: 'measure',
                width: 100
            }, {
                header: 'Цена',
                dataIndex: 'price',
                width: 80,
                renderer: function(value) {
                    var summ = Ext.util.Format.number(value, '0,000.00');
                    return summ.replace(/,/g, ' ');
                }
            }]
        });
        
        this.filtersPlugin = new Ext.grid.GridFilters({
            filters: [
                {type: 'string',  dataIndex: 'marking'}
            ]
        });
        
        this.plugins = [actions, this.filtersPlugin];

        this.addBtn = new Ext.Toolbar.Button({
            text: 'Добавить запись в каталог',
            iconCls: 'add',
            hidden: !this.permissions,
            tooltip: 'Добавить',
            handler: this.onAdd,
            scope: this
        });
        
        this.tbar = new Ext.Toolbar({
            items: [
                this.addBtn, 
                '->', 
                'Поиск: ',
                this.filtersPlugin.getSearchField({width: 400}), 
                ' '
            ]
        });
        
        this.bbar = new xlib.PagingToolbar({
            plugins: [this.filtersPlugin],
            store: this.ds
        });
        
        Catalog.Items.List.superclass.initComponent.apply(this, arguments);
        
        if (this.permissions) {
            this.on('rowdblclick', this.onUpdate, this);
        }
    },
    
    onAdd: function(b, e) {
        
        var formPanel = new Catalog.Items.Form();
        
        formPanel.getForm().on('saved', function() {
            this.getStore().reload();
        }, this);
    },
    
    onUpdate: function(g, rowIndex) {
        
        var record = g.getStore().getAt(rowIndex);
        var id = parseInt(record.get('id'));

        var formPanel = new Catalog.Items.Form({
            itemId: id
        });
        
        formPanel.getForm().on('saved', function() {
            this.getStore().reload();
        }, this);
    },
    
    onDelete: function(g, rowIndex) {
        
        var record = g.getStore().getAt(rowIndex);
        var id = parseInt(record.get('id'));
        
        xlib.Msg.confirm('Вы уверены?', function() {
            
            Ext.Ajax.request({
                url: this.deleteURL,
                params: {
                    id: id
                },
                callback: function(options, success, response) {
                    var res = xlib.decode(response.responseText);
                    if (true == success && res && true == res.success) {
                        g.getStore().reload();
                        return;
                    }
                    xlib.Msg.error('Ошибка при удалении.');
                },
                scope: this
            });
            
        }, this);
    }
});
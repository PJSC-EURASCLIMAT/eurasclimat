Ext.ns('Catalog.Items');

Catalog.Items.Form = Ext.extend(xlib.form.FormPanel, {

    itemId: null,
    
    itemURL:    link('catalog', 'items', 'get'),
    
    addURL:     link('catalog', 'items', 'add'),
    
    updateURL:  link('catalog', 'items', 'update'),
    
    loadMask: true,

    markFieldsDirty: false,
    
    permissions: acl.isUpdate('catalog'),
    
    initComponent: function() {
        
        this.items = [{
            layout: 'column',
            columns: 2,
            border: false,
            defaults: {
                border: false,
                layout: 'form',
                columnWidth: .5
            },
            items: [{
                labelWidth: 210,
                defaults: {
                    anchor: '-30',
                    allowBlank: true
                },
                items:[{
                    xtype: 'textfield',
                    fieldLabel: 'Артикул',
                    name: 'sku'
                }, {
                    xtype: 'Catalog.Settings.ComboBox',
                    fieldLabel: 'Наименование',
                    name: 'title_id',
                    hiddenName: 'title_id',
                    entity: 'titles',
                    allowBlank: false
                }, {
                    xtype: 'Catalog.Settings.ComboBox',
                    fieldLabel: 'Марка',
                    name: 'mark_id',
                    hiddenName: 'mark_id',
                    entity: 'marks'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Модель',
                    name: 'model'
                }, {
                    xtype: 'Catalog.Settings.ComboBox',
                    fieldLabel: 'Тип продукции',
                    name: 'product_type_id',
                    hiddenName: 'product_type_id',
                    entity: 'product_types'
                }, {
                    xtype: 'Catalog.Settings.ComboBox',
                    fieldLabel: 'Тип исполнения',
                    name: 'construction_type_id',
                    hiddenName: 'construction_type_id',
                    entity: 'construction_types'
                }, {
                    xtype: 'Catalog.Settings.ComboBox',
                    fieldLabel: 'Территориальность производства',
                    name: 'territoriality_id',
                    hiddenName: 'territoriality_id',
                    entity: 'territorialities'
                }, {
                    xtype: 'Catalog.Settings.ComboBox',
                    fieldLabel: 'Состояние продукции',
                    name: 'condition_id',
                    hiddenName: 'condition_id',
                    entity: 'conditions'
                }, {
                    xtype: 'Catalog.Settings.ComboBox',
                    fieldLabel: 'Назначение продукции',
                    name: 'purpose_id',
                    hiddenName: 'purpose_id',
                    entity: 'purposes'
                }, {
                    xtype: 'Catalog.Settings.ComboBox',
                    fieldLabel: 'Наличие продукции',
                    name: 'availability_id',
                    hiddenName: 'availability_id',
                    entity: 'availabilities'
                }, {
                    xtype: 'Catalog.Settings.ComboBox',
                    fieldLabel: 'Тип системы',
                    name: 'system_type_id',
                    hiddenName: 'system_type_id',
                    entity: 'system_types'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Период гарантии производителя',
                    name: 'manufacturer_warranty'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Склад',
                    name: 'stock'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Резерв',
                    name: 'reserve'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Заказ',
                    name: 'order'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Eд. изм.',
                    name: 'measure'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Цена',
                    name: 'price'
                }]
            }, {
                labelWidth: 320,
                defaults: {
                    anchor: '-5',
                    allowBlank: true
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Площадь обслуживаемого помещения (кв.м)',
                    name: 'served_square'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Объем обслуживаемого помещения (куб.м)',
                    name: 'served_capacity'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Мощность охлаждения (кВт)',
                    name: 'cooling_power'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Мощность обогрева (кВт)',
                    name: 'heating_power'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Интенсивность осушки воздуха (л/ч)',
                    name: 'drying_intensity'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Расход воздуха (куб.м/ч)',
                    name: 'air_flow_rate'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Мощность потребления в режиме охлаждения (кВт)',
                    name: 'power_consumption_in_cooling_mode'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Мощность потребления в режиме обогрева (кВт)',
                    name: 'power_consumption_in_heating_mode'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Энергоэффективность охлаждения (EER)',
                    name: 'cooling_energy_efficiency'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Энергоэффективность обогрева (EER)',
                    name: 'heating_energy_efficiency'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Электропитание (В.Гц.Ф.)',
                    name: 'power_supply'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Хладагент-теплоноситель',
                    name: 'refrigerant'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Длина межблочных коммуникаций (м/п)',
                    name: 'interblock_communications_length'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Перепад межблочных высот (м/п)',
                    name: 'differential_interconnects_heights'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Наличие дренажной помпы',
                    name: 'drainage_pump'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Наличие зимнего комплекта',
                    name: 'winter_set'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Уровень шума (дБА)',
                    name: 'noise_level'
                }]
            }]
        }];
        
        Catalog.Items.Form.superclass.initComponent.apply(this, arguments);
        
        var w = this.getWindow(this.itemId).show();
        
        if (this.itemId) {
            this.getForm().load({
                url: this.itemURL,
                params: {
                    id: this.itemId
                }
            });
        }
    },
    
    // Private functions 
    
    getWindow: function(id) {
        
       var w = new Ext.Window({
            title: !id ? 'Новая запись' : 'Запись № ' + id,
            resizable: false,
            hidden: false,
            width: 900,
            //height: 400,
            modal: true,
            items: [this],
            buttons: [{
                text: 'Сохранить',
                hidden: !this.permissions,
                handler: function() {
                    
                    if (!this.getForm().isValid()) {
                        return;
                    }
                    
                    this.getForm().submit({
                        params: !this.itemId ? {} : {
                            id: this.itemId
                        },
                        url: !this.itemId ? this.addURL : this.updateURL,
                        success: function(form, options) {
                            var o = options.result;
                            if (true == o.success) {
                                form.fireEvent('saved');
                                w.close();
                                return;
                            }
                            xlib.Msg.error('Не удалось сохранить.')
                        },
                        failure: function() {
                            xlib.Msg.error('Не удалось сохранить.')
                        }
                    });
                },
                scope: this
            }, {
                text: 'Отмена',
                handler: function() {
                    w.close();
                }
            }]
        });
        
        return w;
    }
});

Ext.reg('Catalog.Items.Form', Catalog.Items.Form);
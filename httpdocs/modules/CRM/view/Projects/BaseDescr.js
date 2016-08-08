Ext.define('EC.CRM.view.Projects.BaseDescr', {
    
    extend: 'Ext.form.Panel',
    
    uses: [
        'EC.CRM.view.Projects.ObjectCombo'
    ],
    
    autoScroll: true,
    
    trackResetOnLoad: true,
    
    border: false,
    
    bodyPadding: 5,
    
    fieldDefaults: {
        labelAlign: 'left',
        border: false,
        allowBlank: true,
        anchor: '100%',
        labelWidth: 150
    },
    
    url: null,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'hidden',
            name: 'id'
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Инициатор',
            name: 'creator_name'
        }, {
            xtype: 'projectsGroupsCombo',
            fieldLabel: 'Группа',
            name: 'group_id'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Наименование проекта',
            name: 'name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Название заказчика',
            name: 'customer_name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Адрес объекта',
            name: 'address'
        }, {
            xtype: 'ProjectsObjectCombo'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Площадь объекта (м.кв.)',
            name: 'area'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Описание',
            name: 'description',
            height: 190
        }, {
            xtype: 'radiogroup',
            fieldLabel: 'Этап проекта',
            layout: 'vbox',
            defaults: {name: 'stage'},
            items: [{
                boxLabel: 'Формирование (подготовка)',
                inputValue: 'preparation'
            }, {
                boxLabel: 'Формирование (согласование)',
                inputValue: 'coordination'
            }, {
                boxLabel: 'Исполнение (выполнение)',
                inputValue: 'execution'
            }, {
                boxLabel: 'Исполнение (внедрение)',
                inputValue: 'implementation'
            }]
        }];

        this.bbar = ['->', {
            text: 'Сохранить',
            formBind: true,
            action: 'save'
        }, {
            text: 'Отменить изменения',
            scope: this,
            handler: function() {
                this.getForm().reset();
            }
        }];
        
        this.callParent(arguments);
    }
});
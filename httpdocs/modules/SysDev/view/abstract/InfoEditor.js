Ext.define('EC.SysDev.view.abstract.InfoEditor', {
    
    extend: 'Ext.form.Panel',
    
    //alias: 'widget.project-info-editor',

    trackResetOnLoad: true, // позволяет следить за изменениями в полях формы через событие dirtychange

    border: false,
    autoScroll: true,
    
    tbar: [
        '->',
        {
            text: 'Отменить',
            itemId: 'cancel-button'
        }, {
            text: 'Сохранить',
            itemId: 'save-button',
            disabled: true
        }
    ],
    
    defaults: {
        labelWidth: 150,
        maxWidth: 450,
        padding: '10 10 0 10',
        anchor: '100%',
        listeners: {
            change: function(field, newVal, oldVal) {
                field.up('form').fireEvent("formChanged");
            }
        }
    },

    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            fieldLabel: 'Наименование проекта',
            xtype: 'textfield',
            allowBlank: false,
            name: 'name'
        }, {
            fieldLabel: 'Описание проекта',
            xtype: 'htmleditor',
            name: 'description',
            maxWidth: null
        }, {
            fieldLabel: 'Инициатор проекта',
            xtype: 'combobox',
            name: 'account_id',
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            store: {
                type: 'project-account-store',
                autoLoad: true,
                sorters: [{property:'name', direction: 'ASC'}],
                sortOnLoad: true
            }
        }, {
            fieldLabel: 'Бюджет',
            xtype: 'numberfield',
            name: 'budget',
            minValue: 0,
            step: 1000
        }, {
            fieldLabel: 'Планируемые сроки проекта',
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
                {
                    xtype: 'datefield',
                    name: 'date_plan_begin',
                    format: 'Y-m-d H:i:s',
                    flex: 1
                }, {
                    xtype: 'splitter'
                }, {
                    xtype: 'datefield',
                    name: 'date_plan_end',
                    format: 'Y-m-d H:i:s',
                    flex: 1
                }
            ]
        }, {
            fieldLabel: 'Дата фактического выполнения',
            xtype: 'datefield',
            name: 'date_fact_end',
            format: 'Y-m-d H:i:s'
        }
    ]
    
});
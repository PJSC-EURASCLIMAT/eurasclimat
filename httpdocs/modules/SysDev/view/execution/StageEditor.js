Ext.define('EC.SysDev.view.execution.StageEditor', {
    
    extend: 'Ext.form.Panel',
    
    alias: 'widget.project-execution-stage-editor',
    
    trackResetOnLoad: true, // позволяет следить за изменениями в полях формы через событие dirtychange

    border: false,
    autoScroll: true,
    
    tbar: ['->',{
        text: 'Сохранить',
        itemId: 'save-button',
        disabled: true
    }, {
        text: 'Сохранить',
        itemId: 'add-button',
        hidden: true
    }, {
        text: 'Отменить',
        itemId: 'cancel-button'
    }],
    
    defaults: {
        labelWidth: 150,
        maxWidth: 450,
        padding: '10 10 0 10',
        anchor: '100%'
    },
    
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'project_id'
        },
        {
            fieldLabel: '№',
            xtype: 'numberfield',
            name: 'index',
            minValue: 1,
            step: 1
        }, {
            fieldLabel: 'Автор',
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
            fieldLabel: 'Наименование',
            xtype: 'textfield',
            name: 'name'
        }, {
            fieldLabel: 'Планируемые сроки',
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
                    format: 'Y-m-d H:i:s',
                    name: 'date_plan_end',
                    flex: 1
                }
            ]
        }, {
            fieldLabel: 'Фактические сроки',
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [
                {
                    xtype: 'datefield',
                    name: 'date_fact_begin',
                    format: 'Y-m-d H:i:s',
                    flex: 1
                }, {
                    xtype: 'splitter'
                }, {
                    
                    xtype: 'datefield',
                    format: 'Y-m-d H:i:s',
                    name: 'date_fact_end',
                    flex: 1
                }
            ]
        }, {
            fieldLabel: 'Дата создания',
            xtype: 'datefield',
            name: 'date_create',
            format: 'Y-m-d H:i:s',
            flex: 1
        }
    ]
    
});
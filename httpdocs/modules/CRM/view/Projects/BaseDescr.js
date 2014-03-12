Ext.define('EC.CRM.view.Projects.BaseDescr', {
    
    extend: 'Ext.form.Panel',
    
    uses: [
        'EC.CRM.view.Projects.StageCombo',
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
            xtype: 'AccountsCombo',
            fieldLabel: 'Заказчик',
            name: 'customer_id'
        }, {
            xtype: 'AccountsCombo',
            fieldLabel: 'Руководитель проекта',
            name: 'manager_id'
        }, {
            xtype: 'ProjectsStageCombo'
        }, {
            xtype: 'ProjectsObjectCombo'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Площадь(м.кв.)',
            name: 'area'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Адрес объекта',
            name: 'address'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Описание',
            name: 'description',
            height: 250
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
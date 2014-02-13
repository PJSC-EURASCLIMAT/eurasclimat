Ext.define('EC.PA.view.ExpertForm', {

    extend: 'Ext.form.Panel',

    title: 'Специализация',

    alias: 'widget.profile-expert-edit-form',

    border: false,

    bodyPadding: 5,

    editExpertURL: null,

    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 120,
        border: false,
        allowBlank: false,
        anchor: '100%'
    },

    autoScroll: true,

    trackResetOnLoad: true,

    addExpertJobTypesURL: null,

    deleteExpertJobTypesURL: null,

    getExpertJobTypesURL: null,

    initComponent: function() {

        this.items = [{
            xtype: 'hidden',
            name: 'from_current',
            allowBlank: true,
            value: this.fromCurrent
        },{
            fieldLabel: 'Инж. оборудование',
            xtype: 'combobox',
            name: 'equip_id',
            displayField: 'name',
            valueField: 'id',
            store: 'EC.Experts.store.Equipment'
        }, {
            fieldLabel: 'Статус',
            xtype: 'combobox',
            name: 'status_id',
            displayField: 'name',
            valueField: 'id',
            store: 'EC.Experts.store.Statuses'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Описание',
            allowBlank: true,
            name: 'desc'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Стаж профильной работы',
            allowBlank: true,
            name: 'work_years'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Стаж профильного обучения',
            allowBlank: true,
            name: 'study_years'
        }];

        this.bbar = [{
            text: 'Сохранить',
            formBind: true,
            scope: this,
            action: 'save'
        } ,'->', {
            text: 'Cбросить',
            formBind: true,
            scope: this,
            handler: function() {
                this.getForm().reset();
            }
        }];

        this.callParent(arguments);
        if(!Ext.isEmpty(this.data)) {
            this.getForm().setValues(this.data);
        }
    }

});
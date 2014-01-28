Ext.define('EC.Experts.view.Experts.InfoForm', {

    extend: 'Ext.form.Panel',

    title: 'Специализация',

    alias: 'widget.experts-info-edit-form',

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

    trackResetOnLoad: true,

    requires: ['xlib.AccountsCombo'],

    initComponent: function() {

        this.items = [

            {
                xtype: 'hidden',
                name:'from_current',
                allowBlank: true,
                value: this.fromCurrent
            },
            {
                xtype: 'hidden',
                allowBlank: true,
                name: 'id'
            },
            {
                xtype: 'AccountsCombo',
                hidden: this.fromCurrent,
                allowBlank: true,
                name: 'account_id'
            },
            {
                fieldLabel: 'Инж. оборудование',
                xtype: 'combobox',
                name: 'equip_id',
                displayField: 'name',
                valueField: 'id',
                store: 'EC.Experts.store.Equipment'
            },
            {
                fieldLabel: 'Статус',
                xtype: 'combobox',
                name: 'status_id',
                displayField: 'name',
                valueField: 'id',
                store: 'EC.Experts.store.Statuses'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Рейтинг',
                name: 'rating'
            },
            {
                xtype: 'textarea',
                fieldLabel: 'Опыт',
                name: 'experience'
            },
            {
                xtype: 'textarea',
                fieldLabel: 'Описание',
                name: 'desc'
            }

        ];

        this.bbar = [
            {
                text: 'Сохранить',
                formBind: true,
                scope: this,
                action: 'save'
            }
            ,'->',
            {
                text: 'Cбросить',
                formBind: true,
                scope: this,
                handler: function() {
                    this.getForm().reset();
                }
            }
        ];

        this.callParent(arguments);
        if(!Ext.isEmpty(this.data)) {
            this.getForm().setValues(this.data);
        }
    },




});
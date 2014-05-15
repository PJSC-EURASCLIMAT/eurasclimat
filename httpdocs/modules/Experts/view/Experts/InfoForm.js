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

    autoScroll: true,

    trackResetOnLoad: true,

    requires: ['xlib.AccountsCombo'],

    addExpertJobTypesURL: null,

    deleteExpertJobTypesURL: null,

    getExpertJobTypesURL: null,

    initComponent: function() {

        this.items = [{
            xtype: 'hidden',
            name: 'from_current',
            allowBlank: true,
            value: this.fromCurrent
        }, {
            xtype: 'hidden',
            allowBlank: true,
            name: 'id'
        }, {
            xtype: 'AccountsCombo',
            hidden: this.fromCurrent,
            name: 'account_id'
        }, {
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
            xtype: 'numberfield',
            fieldLabel: 'Рейтинг',
            hidden: this.fromCurrent,
            allowBlank: true,
            name: 'rating'
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
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Количество сертификатов',
            allowBlank: true,
            name: 'sert_count'
        }];

        if (!Ext.isEmpty(this.data)) {

            this.getExpertJobTypesURL += '?expert_id=' + this.data.id;

            this.jobTypesStore = Ext.create('Ext.data.Store', {
                autoLoad: true,
                fields: ['id','name','checked'],
                proxy: {
                    type: 'ajax',
                    url: this.getExpertJobTypesURL,
                    reader: {
                        type: 'json',
                        root: 'data',
                        successProperty: 'success'
                    }
                }
            });

            this.items.push({
                xtype: 'grid',
                allowBlank: true,
                title: 'Типы деятельности',
                store: this.jobTypesStore,
                hideHeaders: true,
                height: 200,
                columns: [
                { dataIndex: 'name', flex: 1 },
                {
                    xtype: 'checkcolumn',
                    align: 'center',
                    dataIndex: 'checked',
                    listeners: {
                        checkchange: this.onCheckChange.bind(this)
                    },
                    width: 40
                }
            ]});
        }

        this.bbar = ['->',{
            text: 'Сохранить',
            formBind: true,
            scope: this,
            action: 'save'
        } , {
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
    },

    onCheckChange: function(checkColumn, recordIndex, checked, record, dataIndex) {

        var urls = {
            1: this.addExpertJobTypesURL,
            0: this.deleteExpertJobTypesURL
        };
        
        var phrases = {
            1: "Не удалось доваить тип деятельности!",
            0: "Не удалось доваить тип деятельности!"
        };

        var failure = function() {
            record.reject();
            Ext.Msg.alert('Ошибка', phrases[checked]);
        };

        Ext.Ajax.request({
            params: {
                expert_id: this.data.id,
                job_type_id: record.get('id')
            },
            url: urls[checked],
            success: function(response, opts) {
                var resp = Ext.decode(response.responseText, true);
                if (!resp || !resp.success) {
                    failure();
                    return;
                }
                record.commit();
            },
            failure: failure,
            scope: this
        });
    }
});
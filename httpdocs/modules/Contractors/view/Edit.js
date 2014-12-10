Ext.define('EC.Contractors.view.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Редактор поставщика',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 700,

    initComponent: function() {

        this.items = [{
            xtype: 'form',
            bodyPadding: 10,
            fieldDefaults: {
                margin: '5 0',
                labelWidth: 150,
                anchor: '100%',
                allowBlank: true
            },
            defaultType: 'textfield',
            items: [{
                xtype: 'hiddenfield',
                margin: 0,
                name: 'id'
            }, {
                fieldLabel: 'Наименование',
                allowBlank: false,
                name: 'name'
            }, {
                fieldLabel: 'Полное наименование',
                name: 'full_name'
            }, {
                fieldLabel: 'Юридический адрес',
                name: 'legal_address'
            }, {
                fieldLabel: 'Почтовый адрес',
                name: 'postal_address'
            }, {
                fieldLabel: 'Форма организации',
                name: 'form_organization'
            }, {
                fieldLabel: 'ОГРН',
                name: 'ogrn'
            }, {
                fieldLabel: 'ОКВЭД',
                name: 'okved'
            }, {
                fieldLabel: 'ОКАТО',
                name: 'okato'
            }, {
                fieldLabel: 'ОКПО',
                name: 'okpo'
            }, {
                fieldLabel: 'ИНН/КПП',
                name: 'inn_kpp'
            }, {
                fieldLabel: 'Р/счет',
                name: 'bank_account'
            }, {
                fieldLabel: 'Банк',
                name: 'bank'
            }, {
                fieldLabel: 'БИК',
                name: 'bik'
            }, {
                fieldLabel: 'Кор.счет',
                name: 'corr_account'
            }, {
                fieldLabel: 'Ген.директор',
                name: 'general_director'
            }, {
                fieldLabel: 'Главный бухгалтер',
                name: 'chief_accountant'
            }, {
                fieldLabel: 'Телефон (секретарь)',
                name: 'phone'
            }, {
            	fieldLabel: 'Сайт',
            	name: 'site'
            }, {
            	fieldLabel: 'Товар',
            	name: 'goods'
            }, {
            	fieldLabel: 'Адрес',
            	name: 'address'
            }, {
            	xtype: 'textarea',
            	fieldLabel: 'Условия доставки',
            	name: 'shipment'
            }, {
            	fieldLabel: 'Скидка %',
            	name: 'discount'
            }, {
            	xtype: 'textarea',
            	fieldLabel: 'Примечание',
            	name: 'note'
            }],

            buttons: ['->', {
                text: 'Сохранить',
                formBind: true,
                handler: function() {
                    var form = this.up('form');
                    this.up('form').fireEvent('save', form.getValues());
                }
            }, {
                text: 'Отмена',
                handler: function() {
                    this.up('window').close();
                }
            }]
        }];

        this.callParent();
    }
});
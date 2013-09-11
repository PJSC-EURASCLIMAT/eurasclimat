Ext.define('EC.Main.view.OrderPortlet', {

    extend: 'Ext.panel.Panel',

    autoScroll: true,

//    layout: 'fit',

//    bbar: ['->', {
//        text: 'Подробнее',
//        pressed: true,
//        action: 'filter'
//    }],

    permissions: acl.isUpdate('crm', 'orders'),

    items: [
        {
            xtype: 'form',
            itemId: 'orderForm',
            bodyPadding: '5 5 0 5',
            width: '100%',
//            maxWidth: 350,
            border: false,
            layout: 'anchor',

            defaults: {
                anchor: '100%',
                listeners: {
                    change: function(field, newVal, oldVal) {
                        this.up('form').fireEvent('someFieldIsChanged');
                    }
                }
            },

            defaultType: 'textfield',

            items: [{
                fieldLabel: 'Категория услуг',
                xtype: 'combo',
                name: 'category',
                hiddenName: 'category',
                valueField: 'id',
                editable: false,
//                allowBlank: false,
                displayField: 'name',
                store: {
                    fields: ['id', 'name'],
                    data: [
                        {id: '1', name: 'Кондиционирование'},
                        {id: '2', name: 'Вентиляция'},
                        {id: '3', name: 'Отопление'},
                        {id: '4', name: 'Водоснабжение'},
                        {id: '5', name: 'Канализация'},
                        {id: '6', name: 'Пожарная сигнализация'},
                        {id: '7', name: 'Охранная сигнализация'},
                        {id: '8', name: 'Интернет коммуникации'},
                        {id: '9', name: 'Телефонизация'},
                        {id: '10', name: 'Радиофикация'},
                        {id: '11', name: 'Телевизионные системы и коммуникации'},
                        {id: '12', name: 'Электрика'},
                        {id: '13', name: 'Автоматизация'},
                        {id: '14', name: 'Диспетчеризация'},
                        {id: '15', name: 'Системы чистых помещений'},
                        {id: '0', name: 'Другое'}
                    ]
                },
                value: ''
            },{
                fieldLabel: 'Объект',
                xtype: 'combo',
                name: 'object',
                hiddenName: 'object',
                valueField: 'id',
                editable: false,
//                allowBlank: false,
                displayField: 'name',
                store: {
                    fields: ['id', 'name'],
                    data: [
                        {id: '1', name: 'Квартира'},
                        {id: '2', name: 'Коттедж'},
                        {id: '3', name: 'Складское помещение'},
                        {id: '4', name: 'Административное помещение'},
                        {id: '5', name: 'Промышленное помещение'},
                        {id: '6', name: 'Техническое помещение'},
                        {id: '7', name: 'Торговое помещение'},
                        {id: '8', name: 'Общественное питание'},
                        {id: '9', name: 'Медицинские учреждения'},
                        {id: '10', name: 'Помещение свободного назначения'},
                        {id: '0', name: 'Другое'}
                    ]
                },
                value: ''
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Площадь помещения (м.кв.)',
                name: 'area',
                labelWidth: 180,
                minValue: 0,
                allowBlank: false
            },{
                xtype: 'textarea',
                fieldLabel: 'Контакты',
                labelAlign: 'top',
                name: 'contacts'
            },{
                xtype: 'textarea',
                fieldLabel: 'Дополнительные сведения',
                labelAlign: 'top',
                name: 'info'
            }],


            // Reset and Submit buttons
            buttons: [{
                text: 'Отправить',
                formBind: true, //only enabled once the form is valid
                hidden: !this.permissions,
                itemId: 'sendBtn'
            },'->']
        }
    ]

});
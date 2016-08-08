Ext.define('xlib.AccountsRef', {
    extend: 'xlib.RefField',

    alias: ['widget.accounts-ref'],

    valueField: 'id',

    displayField: 'name',

    word: ['', 'аккаунт', 'аккаунта', 'аккаунтов' ],

    multiSelect: true,

    fieldLabel: 'Аккаунт',

    windowTitle: 'Аккаунты',

//    value: null,

    gridConfig: {
        features: [{
            ftype:'grouping',
            groupHeaderTpl: '{name}'
        }],
        columns: [
            {
                text: 'name',
                dataIndex: 'name',
                flex: 1
            }
        ]
    },
    storeConfig:{
        pageSize: 13,
        fields: [{name: 'id', type: 'number'}, 'name', 'group'],
        groupers: [{property: 'group', direction: 'DESC'}],
        sorters: [{property: 'name', direction: 'ASC'}],
        proxy: {
            type: 'ajax',
            api: {
                read:   '/json/pa/info/get-contacts'
            },
            reader: {
                type: 'json',
                root: 'data',
                successProperty: 'success'
            }
        }
    },

    getSubmitValue: function() {
        return this.getValue().toString();
    }


});
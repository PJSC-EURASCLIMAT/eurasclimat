Ext.define('EC.Services.view.TreeGrid', {

    extend: 'xlib.Tree',
    
    alias: ['widget.ServicesTreeGrid'],

    controllerURL: '/json/crm/services/',

    fields: [
        'id',
        'service_id',
        'text',
        'parent_id',
        'profession_id',
        'eng_sys_type_id',
        'norm_hours',
        'min_rank',
        'profession_name',
        'eng_sys_type_name'
    ],
    
    layout: 'fit',
    
    rootVisible: false,
    
    hideHeaders: false,
    
    useArrows: true,
    
    scroll: 'vertical',

    permissions: acl.isUpdate('services'),

    addText: "Добавить услугу",

    columns: [{
        text: 'Профессия',
        flex: 1,
        dataIndex: 'profession_name'
    },{
        text: 'Тип. инж. сис.',
        flex: 1,
        dataIndex: 'eng_sys_type_name'
    },{
        text: 'НЧ',
        width: 50,
        dataIndex: 'norm_hours'
    },{
        text: 'Разряд',
        width: 50,
        dataIndex: 'min_rank'
    }],

    initComponent: function() {
        this.tbar =  [{
            icon: '/images/icons/folder.gif',
            itemId: 'add-chapter',
            scope: this,
            text: 'Добавить раздел',
            handler: function() {
                this.create(false);
            }

        }];

        this.callParent();
    },

    create: function( isLeaf ) {
        var selectedRecords = this.selModel.getSelection(),
            node;

        if ( Ext.isArray( selectedRecords ) ) {
            node = selectedRecords[0];
        } else if ( Ext.isObject( selectedRecords ) ) {
            node = selectedRecords;
        }

        if ( !Ext.isEmpty(node) && node.data.leaf ) return;

        this.superclass.create.call(this, isLeaf);

    }

});
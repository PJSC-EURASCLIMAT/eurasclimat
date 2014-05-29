Ext.define('EC.Services.view.TreeGrid', {

    extend: 'xlib.Tree',

    alias: ['widget.ServicesChaptersTree'],

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

    tbar: [{
        icon: '/images/icons/catalog.png',
        text: 'Разделы'
    }]

//    initComponent: function() {
//
//        this.callParent();
//
//    }





});
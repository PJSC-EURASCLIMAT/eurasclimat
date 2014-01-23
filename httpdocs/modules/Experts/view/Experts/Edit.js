Ext.define('EC.Experts.view.Experts.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Информация об эксперте',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 500,

    height: 400,

    fromCurrent: false,

    hideFiles: true,

    getFilesURL: null,

    requires: [
        'EC.Experts.view.Experts.InfoForm',
        'EC.Experts.view.Experts.FilesList'
    ],

    editExpertURL: '/json/experts/experts/update',

    addExpertDocURL: '/json/experts/experts/upload-expert-doc',

    deleteExpertDocURL: '/json/experts/experts/delete-expert-doc',

    getExpertDocsURL: '/json/experts/experts/get-expert-docs',

    initComponent: function() {

        this.items = [
            {
                xtype: 'tabpanel',
                items: [
                    {
                        xtype: 'experts-info-edit-form',
                        editExpertURL: this.editExpertURL,
                        data: this.data
                    },
                    {
                        xtype: 'experts-files-list',
                        data: this.data,
                        addExpertDocURL: this.addExpertDocURL,
                        deleteExpertDocURL: this.deleteExpertDocURL,
                        getExpertDocsURL: this.getExpertDocsURL
                    }
                ]
            }
        ];


        this.callParent(arguments);
    }
});
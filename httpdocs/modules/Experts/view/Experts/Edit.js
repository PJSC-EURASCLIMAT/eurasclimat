Ext.define('EC.Experts.view.Experts.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Информация об эксперте',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 500,

    height: 400,

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

    addExpertJobTypesURL: 'json/experts/experts/add-expert-job-type',

    deleteExpertJobTypesURL: 'json/experts/experts/delete-expert-job-type',

    getExpertJobTypesURL: 'json/experts/experts/get-expert-job-types',


    initComponent: function() {

        this.items = [
            {
                xtype: 'tabpanel',
                items: [
                    {
                        xtype: 'experts-info-edit-form',
                        addExpertJobTypesURL: this.addExpertJobTypesURL,
                        deleteExpertJobTypesURL: this.deleteExpertJobTypesURL,
                        getExpertJobTypesURL: this.getExpertJobTypesURL,
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

        this.expertEditForm = this.down('experts-info-edit-form');
        this.expertEditForm.down('[action=save]').on('click',this.editExpert, this);
    },

    editExpert: function() {

        this.expertEditForm.getForm().submit({
            url: this.editExpertURL,
            success: function(form, action) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:green;">Обновление профиля специалиста прошло успешно.</span>');
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером');
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
                }
            },
            scope: this
        });

    }
});
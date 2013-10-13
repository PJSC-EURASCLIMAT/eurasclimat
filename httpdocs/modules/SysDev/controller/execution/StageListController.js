Ext.define('EC.SysDev.controller.execution.StageListController', {

    extend: 'Ext.app.Controller',

    refs: [
        { ref: 'stageList', selector: 'project-stage-list' } // this.getStageList()
    ],

    run: function() {

        this.listen({
            component: {
                'project-stage-list': {
                    'edit-button-pressed': this.onEditButtonPressed,
                    'delete-button-pressed': this.onDeleteButtonPressed
                },
                'project-stage-list button[action=add]': {
                    'click': this.onStageAdd
                },
                'project-stage-list button[action=refresh]': {
                    'click': this.stageListRefresh
                }
            }
//            ,controller: {
//                '*': {
//                    'project-selected': this.onProjectSelected,
//                    'project-stage-editor-hidden': this.onEditorHidden
//                }
//            }
        });

    },

    stageListRefresh: function() {
        this.getStageList().getStore().load({
            params: {
                project_id: this.cur_project_id
            }
        });
    },


    onStageAdd: function() {
        this.getStageList().hide();
        var rec = Ext.create('EC.SysDev.model.StageModel', {
            project_id: this.cur_project_id
        });
        this.fireEvent('stage-adding-requested', rec);
    },

    onProjectSelected: function(record) {

        if (record.get('leaf') != true) {
            return;
        }

        if (!acl.isView('projectdev', 'stages')) {
            return;
        }

        this.getStageList().getStore().load({
            params: {
                project_id: record.get('id')
            }
        });

        this.cur_project_id = record.get('id');

    },

    onEditButtonPressed: function(stageRecord) {

        this.getStageList().hide();
        this.fireEvent('stage-editing-requested', stageRecord);

    },

    onDeleteButtonPressed: function(record) {

        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(buttonName) {
            if ('yes' === buttonName) {
//
//                var store = this.getStageList().getStore();
//                store.remove(stageRecord);
//                store.sync();
                Ext.Ajax.request({
                    url: '/json/sysdev/project-stages/delete',
                    params: {
                        id: record.getId()
                    },
                    success: function(response, opts) {
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.getStageList().getStore().remove(record);
                    },
                    failure: function(response, opts) {
                        Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
                    },
                    scope: this
                });


            }
        }, this);

    },

    onEditorHidden: function() {
        this.getStageList().show();
        this.getStageList().getStore().load({
            params: {
                project_id: this.cur_project_id
            }
        });

    }

});
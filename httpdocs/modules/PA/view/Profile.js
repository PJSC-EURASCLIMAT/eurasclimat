Ext.define('EC.PA.view.Profile', {
    
    extend: 'Ext.window.Window',
    
    title: 'Профиль пользователя ' + xlib.Acl.Storage.getIdentity().name +
        ' (' + xlib.Acl.Storage.getIdentity().login + ') ',

    alias: 'widget.profilewin',
    
    layout: 'fit',

    style: {
        overflowX: 'hidden',
        overflowY: 'auto'
    },
    
    border: false,
    
    modal: true,

    width: 400,

    height: 350,

    initComponent: function() {

        this.items = [
            {
                xtype: 'panel',
                itemId: 'displayProfile',
                layout: 'fit',
                autoScroll: true,
                bodyPadding: 10,
                tpl: Ext.create('Ext.XTemplate',

                    '<table width="100%" border="0">',
                        '<tr valign="top">',
                            '<td width="100">',
                                '<tpl if="have_avatar == 1">',
                                    '<img src="images/users/{id}.jpg?{[this.dc()]}" width="100" style="float: left;margin-right: 15px">',
                                '<tpl else>',
                                    '<img src="http://placehold.it/100x100" style="float: left;margin-right: 15px"/>',
                                '</tpl>',
                            '</td>',
                            '<td>',
                                'ФИО: {name}<br/><br/>',
                                'Email: {login}<br/><br/>',
                                'г. {city}, {country}<br/><br/>',
                            '</td>',
                        '</tr>',

                        '<tpl if="this.isExpert(values)">',
                            '<tr valign="top">',
                                '<td colspan="2">',
                                    '<p><b>Специализация</b><p>',
                                    '<p>Описание: {expert_info.desc}</p>',
                                    '<p>Тип инженерного оборудования: {expert_info.equipment}</p>',
                                    '<p>Статус: {expert_info.status}</p>',
                                    '<p>Рейтинг: {expert_info.rating}</p>',
                                    '<p>Стаж профильной работы: {expert_info.work_years}</p>',
                                    '<p>Стаж профильного обучения: {expert_info.study_years}</p>',
                                    '<p>Количество сертификатов: {expert_info.sert_count}</p>',
                                    '<tpl if="this.haveJobTypes(values)">',
                                        '<p>Типы деятельности: {[this.getJobTypes(values)]}</p>',
                                    '</tpl>',

                    '</td>',
                            '</tr>',
                        '</tpl>',


                        '<tpl if="this.haveDocs(values)">',
                            '<tr valign="top">',
                                '<td colspan="2">',
                                    '<p><b>Файлы:</b></p>',
                                    '<tpl for="expert_docs">',
                                        '<p><a href="#/download/{file_id}">{file_name}</a></p>',
                                    '</tpl>',
                                '</td>',
                            '</tr>',
                        '</tpl>',


                    '</table>',

                    {
                        dc: function() {
                            return new Date().getTime();
                        },
                        isExpert: function(values) {
                            if(!Ext.isEmpty(values.expert_id)){
                                return true;
                            }
                            return false;
                        },
                        haveDocs: function(values) {
                            if(!Ext.isEmpty(values.expert_docs)){
                                return true;
                            }
                            return false;
                        },
                        haveJobTypes: function(values) {
                            if(!Ext.isEmpty(values.job_types)){
                                return true;
                            }
                            return false;
                        },

                        getJobTypes: function(values) {
                            var str = values.job_types[0].name;
                            for (var i = 1; i < values.job_types.length; i++) {
                                var jbt = values.job_types[i];
                                str+= ', '+jbt.name;
                            }
                            return str;
                        }
                    }

                )

            }
        ];

        this.buttons = [
            {
                xtype: 'button',
                text: 'Стать специалистом',
                itemId: 'makeExpertFromMe',
                hidden: !Ext.isEmpty(this.data.expert_id),
                margin: '0 0 10 0'
            },'->', {
                xtype: 'button',
                text: 'Редактировать профиль',
                itemId: 'showEditFormBtn'
            }, {
                xtype: 'button',
                hidden: true,
                text: 'Отмена',
                itemId: 'cancel'
            }
        ];

        this.callParent(arguments);

    },

    afterRender: function(){
        this.callParent(arguments);
        if(!Ext.isEmpty(this.data)) {
            this.applyData(this.data);
        }
    },

    applyData: function(data) {
        this.data = data;
        var disp = this.down("#displayProfile");
        disp.tpl.overwrite(disp.body, this.data);

    }
});
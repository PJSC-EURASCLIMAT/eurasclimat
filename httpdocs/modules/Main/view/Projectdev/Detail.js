Ext.define('EC.Main.view.Projectdev.Detail', {

    extend: 'Ext.tab.Panel',

    closable: false,

    border: false,

    bodyBorder: false,
    alias: 'widget.ProjectdevDetail',

    layout: 'fit',
    activeTab: 'info',
    itemId: 'detailTabs',
    items: [{
            title: 'Информация о проекте',
            hidden: !acl.isView('info'),
            itemId: 'info',
            data: '',
            autoScroll: true,
            loader: {
                url: '/json/sysdev/project-info/get',
                autoload: false,
                loadMask: true
            },
            tpl: '<u>Дата создания:</u> {date_create} ' + '<u>   Автор проекта:</u>  {author} <br/><br/>' 
              + '<u>Бюджет:</u> {budget} р. <br/><br/>'
              + '<u>Описание:</u>  {description} <br/><br/>' 
              + '<u>Планируемое время выполнения:</u>  с {date_plan_begin} по {date_plan_end} <br/><br/>' 
              + '<u>Дата фактического выполнения:</u>  {date_fact_end}'
        }, {
            title: 'Обсуждение и голосование',
            layout: 'fit',
            hidden: !acl.isView('comments'),
            itemId: 'projectComments',
            items: [{
                    xtype: 'panel',
                    itemId: 'projectCommentsPanel',
                    border: false,
                    autoScroll: true,
                    tpl: new Ext.XTemplate(
                      '<tpl for="."><div style="padding:5px; border-top: 1px #000 solid; border-botttom:1px #000 solid; ">',
                      '<h4>{author} {date_create} написал:</h4><br/>',
                      '{content}</div></tpl>'),
                    dockedItems: [{
                            xtype: 'panel',
                            padding: 5,
                            dock: 'bottom',
                            layout: 'hbox',
                            border: false,
                            items: [{
                                  xtype: 'label',
                                  itemId: 'markLabel',
                                  hidden: !acl.isView('votes'),
                                  width: '100',
                                  margin: 5
                                },{
                                    width: '100',
                                    hidden: !acl.isUpdate('votes'),
                                    xtype: 'button',
                                    itemId: 'markMenu',
                                    text: 'Голосовать',
                                    margin: '1 0 0 1',
                                    arrowAlign: 'right',
                                    menu: [{
                                            text: 'За',
                                            itemId: 'markButtonFor'
                                        }, {
                                            text: 'Против',
                                            itemId: 'markButtonAgainst'
                                        }, {
                                            text: 'Доработать',
                                            itemId: 'markButtonRemake'
                                        }
                                    ]
                                }, {
                                    xtype: 'textareafield',
                                    hidden: !acl.isUpdate('comments'),
                                    grow: true,
                                    itemId: 'commentContent',
                                    name: 'message',
                                    margin: '1 0 0 1',
                                    width: '60%',
                                    allowBlank: false
                                }, {
                                    xtype: 'button',
                                    hidden: !acl.isUpdate('comments'),
                                    scale: 'large',
                                    itemId: 'commentSubmit',
                                    text: 'Коментировать',
                                     margin: '1 0 0 1',
                                    width: '25%'
                                }
                            ]
                        }
                    ]
                }
            ]
        }, {
            title: 'Сведения об исполнении проекта',
            hidden: !acl.isView('stages'),
            itemId: 'stages',
            layout: 'fit'
        }, {
            title: 'Документация проекта',
            hidden: !acl.isView('docs'),
            itemId: 'docs',
            layout: 'fit'
        }
    ]
});
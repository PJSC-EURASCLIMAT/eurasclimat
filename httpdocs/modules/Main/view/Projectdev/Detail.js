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
        hidden: !acl.isView('projectdev', 'info'),
        itemId: 'info',
        data: '',
        autoScroll: true,
        loader: {
            url: '/json/sysdev/project-info/get',
            autoload: false,
            loadMask: true
        },
        tpl: new Ext.XTemplate( '<div style="padding:5px;">'
            + '<h2>Cведения о проекте разработки системы</h2>'
            + '<b>Наименование проекта: </b> {name}<br/><br/>'
            + '<b>Описание проекта: </b> {description}<br/><br/>'
            + '<b>Инициатор проекта: </b> {author}<br/><br/>'
            + '<b>Бюджет:</b> {budget} р. <br/><br/>'
            + '<b>Особые условия проекта: </b> <br/><br/>'
            + '<b>Планируемые сроки проекта: </b> с {date_plan_begin:date("d.m.Y")} по {date_plan_end:date("d.m.Y")}' 
                +'<br/><br/>'
            + '<b>Дата фактического выполнения: </b>{date_fact_end:date("d.m.Y")} <br/><br/>'
            + '</div>')
    }, {
        title: 'Обсуждение и голосование',
        layout: 'fit',
        hidden: !acl.isView('projectdev', 'comments'),
        itemId: 'projectComments',
        items: [{
            xtype: 'panel',
            itemId: 'projectCommentsPanel',
            border: false,
            autoScroll: true,
            tpl: new Ext.XTemplate(
                '<tpl for="."><div style= "border-bottom:1px #D3E2F0 solid; padding: 10px 5px;">',
                '<span style="line-height:1.5; font-weight: bolder">{author} {date_create:date("d.m.Y  H:i:s")}'
                 + ' написал:</span> <br/>',
                '{content}</div></tpl>'),
            dockedItems: [{
                xtype: 'panel',
                padding: 5,
                
                dock: 'bottom',
                layout: 'hbox',
                border: false,
                items: [{
                    itemId: 'voteResults',
                    layout: 'vbox',
                    hidden: true,
                    border: false,
                    width: 190,
                    items: [{
                        xtype: 'label',
                        text: 'Результаты голосования: '
                    },{
                        xtype: 'label',
                        itemId: 'countFor', 
                        margin: '11 0 0 10',
                        text: 'За глосов: '
                    },{
                        xtype: 'label',
                        itemId: 'countAgainst', 
                        margin: '11 0 0 10',
                        text: 'Против голосов: '
                    },{
                        xtype: 'label',
                        itemId: 'countRemake',
                        margin: '11 0 0 10',
                        text: 'Предложений доработать: '
                    }]
                }, {
                    border: false,
                    width: 190,
                    hidden: true,
                    itemId: 'markMenu',
                    layout: 'vbox',
                    margin: '1 0 0 1',
                    items: [{
                            xtype:'label',
                            text:'Голосовать'
                        },
                        {
                            xtype:'button',
                            text: 'За',
                            border: 1,
                            margin: '3 0 0 40',
                            width: 100,
                            textAlign: 'left',
                            itemId: 'markButtonFor'
                        }, {
                            xtype:'button',
                            text: 'Против',
                            border: 1,
                            margin: '3 0 0 40',
                            width: 100,
                            textAlign: 'left',
                            itemId: 'markButtonAgainst'
                        }, {
                            xtype:'button',
                            text: 'Доработать',
                            border: 1,
                            width: 100,
                            margin: '3 0 0 40',
                            textAlign: 'left',
                            itemId: 'markButtonRemake'
                        }
                    ]
                }, {
                    xtype: 'textareafield',
                    hidden: !acl.isUpdate('projectdev', 'comments'),
                    grow: true,
                    itemId: 'commentContent',
                    //name: 'message',
                    margin: '1 0 0 1',
                    width: '60%',
                    height: '100%',
                    allowBlank: false,
                    validateOnBlur: false,
                    validateOnChange: false
                }, {
                    xtype: 'button',
                    hidden: !acl.isUpdate('projectdev', 'comments'),
                    scale: 'large',
                    itemId: 'commentSubmit',
                    text: 'Коментировать',
                    margin: '1 0 0 1',
                    width: '100',
                    height: '100%'
                }]
            }]
        }]
    }, {
        title: 'Сведения об исполнении проекта',
        hidden: !acl.isView('projectdev', 'stages'),
        itemId: 'stages',
        layout: 'fit'
    }, {
        title: 'Документация проекта',
        hidden: !acl.isView('projectdev', 'docs'),
        itemId: 'docs',
        layout: 'fit'
    }]
});
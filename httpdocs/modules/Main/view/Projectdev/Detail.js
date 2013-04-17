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
            + '<h2 style="margin-bottom: 0 !important;">Сведения о проекте по разработке "{name}"</h2>'
            + '<span style="color: #999999">Создан пользвателем <i>{author} {date_create}</i></span><br/><br/>' 
            + '<b>Бюджет:</b> {budget} р. <br/><br/>'
            + '<b>Сроки:</b><br/>'
            + '&nbsp;&nbsp;&nbsp;По плану: с {date_plan_begin:date("d.m.Y")} по {date_plan_end:date("d.m.Y")} <br/>' 
            + '&nbsp;&nbsp;&nbsp;Дата фактического выполнения: {date_fact_end:date("d.m.Y")} <br/><br/>'
            + '<b>Голосование и обсуждение:</b><br/>'
            + '&nbsp;&nbsp;&nbsp; Разрешено голосовать с: {date_vote_begin:date("d.m.Y")} по '
                + '{date_vote_end:date("d.m.Y")} <br/>'
            + '&nbsp;&nbsp;&nbsp; Разрешено обсуждать с: {date_discuss_begin:date("d.m.Y")} по ' 
                + '{date_discuss_end:date("d.m.Y")} <br/><br/>'
            + '<b>Описание:</b>  <br/>{description}' 
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
                    xtype: 'label',
                    itemId: 'markLabel',
                    hidden: !acl.isView('projectdev', 'votes'),
                    width: '100',
                    margin: 5
                }, {
                    width: '100',
                    hidden: !acl.isUpdate('projectdev', 'votes'),
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
                    }]
                }, {
                    xtype: 'textareafield',
                    hidden: !acl.isUpdate('projectdev', 'comments'),
                    grow: true,
                    itemId: 'commentContent',
                    name: 'message',
                    margin: '1 0 0 1',
                    width: '60%',
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
Ext.define('Project.view.preparation.CommentPanel', {
    
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.project-comment-panel',
    
    layout: 'fit',
    
    items: [{
        xtype: 'panel',
        itemId: 'commentList',
        border: false,
        autoScroll: true,
        tpl: [
            '<tpl for=".">',
            '<div style= "border-bottom:1px #D3E2F0 solid; padding: 10px 5px; position: relative">',
            '<span style="line-height:1.5; font-weight: bolder">{author}  написал:</span> <br/>',
            '{content}',
            '<span style="position: absolute; right: 5px; top: 5px; font-size:11px; color:gray;">{[Ext.Date.format(values.date_create, "d F Y, H:i:s")]}</span>',
            '</div>',
            '</tpl>'
        ],
        dockedItems: [{
            xtype: 'panel',
            padding: 5,
            dock: 'bottom',
            layout: 'hbox',
            border: false,
            items: [{
                itemId: 'voteResults',
                layout: 'vbox',
                hidden: false,
                border: false,
                width: 190,
                items: [{
                    xtype: 'label',
                    text: 'Результаты голосования: '
                },{
                    xtype: 'label',
                    itemId: 'countFor',
                    margin: '11 0 0 10',
                    tpl: 'За глосов: {count}',
                    data: {count: 0}
                },{
                    xtype: 'label',
                    itemId: 'countAgainst', 
                    margin: '11 0 0 10',
                    tpl: 'Против глосов: {count}',
                    data: {count: ''}
                },{
                    xtype: 'label',
                    itemId: 'countRemake',
                    margin: '11 0 0 10',
                    tpl: 'Предложений доработать: {count}',
                    data: {count: ''}
                }]
            }, {
                border: false,
                width: 190,
                hidden: false,
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
                flex: 1,
                margin: '1 0 0 1',
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
//                width: 200,
                height: '100%'
            }]
        }]
    }]

    
});
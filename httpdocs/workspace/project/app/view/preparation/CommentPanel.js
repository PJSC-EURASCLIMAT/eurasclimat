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
            '<div style= "border-bottom:1px #D3E2F0 solid; padding: 10px 5px;">',
            '<span style="line-height:1.5; font-weight: bolder">{author} {[this.formatDate(values.date_create)]}',
            ' написал:</span> <br/>',
            '{content}',
            '</div>',
            '</tpl>',
            {
                formatDate: function(dateString) {

                    var date = Ext.Date.parse(dateString, 'Y-m-d H:i:s');

                    return Ext.Date.format(date, 'd.m.Y H:i:s');

                }
            }
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

    
});
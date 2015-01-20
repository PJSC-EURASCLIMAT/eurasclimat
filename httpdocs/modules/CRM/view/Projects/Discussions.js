Ext.define('EC.CRM.view.Projects.Discussions', {
    
    extend: 'Ext.panel.Panel',
    
    layout: 'fit',
    
    border: false,
    
    items: [{
        xtype: 'panel',
        itemId: 'CRMProjectsDiscussions',
        border: false,
        autoScroll: true,
        tpl: [
            '<tpl for=".">',
            '<div style= "border-bottom:1px #D3E2F0 solid; padding: 10px 5px; position: relative">',
            '<span style="line-height:1.5; font-weight: bolder">{author}:</span> <br/>',
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
            height: 100,
            items: [{
                xtype: 'textareafield',
                disabled: !acl.isUpdate('projects'),
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
                disabled: !acl.isUpdate('projects'),
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
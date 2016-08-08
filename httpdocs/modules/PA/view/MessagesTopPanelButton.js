var isAuth = (xlib.Acl.Storage.getIdentity().login !== 'guest');

Ext.define('EC.PA.view.MessagesTopPanelButton', {
    
    extend: 'Ext.container.Container',

    alias: 'widget.top-panel-msg-button',

    padding: '8 0 8 0',

    items: [
        {
            xtype: 'button',
            tooltip: 'Сообщения',
            bodyStyle: 'background:transparent;',
            icon: '/images/icons/messages.png',
            arrowCls: '',
            frame: false,
            border: false,
            style: {
                background: 'transparent !important'
            },
            hidden: !isAuth,
            action: 'messages',
            launchModule: 'EC.PA.controller.Messages'
        }
        ,{
            xtype: 'box',
            hidden: true,
            itemId: 'count',
            cls: 'top-panel-messages-number',
            html: ''
        }
    ]
    
    ,updateCount: function(num) {
        var counter = this.down("#count");
        counter.update(num);
        if(num === 0 && !counter.isHidden()) {
            counter.hide();
        } else if(num > 0 && counter.isHidden()) {
            counter.show();
        }
    }
});
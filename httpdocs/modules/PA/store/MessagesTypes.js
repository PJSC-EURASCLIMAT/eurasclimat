Ext.define('EC.PA.store.MessagesTypes', {
    extend: 'Ext.data.TreeStore',
    fields: ['type','box','text'],

    constructor: function(config) {
        this.root = {
            expanded: true,
            children: []
        };

        var types = xlib.System.getMessageTypes();
        var boxes = {
            'in': {
                name: 'Входящие',
                icon: '/images/icons/inbox.png'
            },
            'out': {
                name: 'Исходящие',
                icon: '/images/icons/outbox.png'
            },
            'deleted': {
                name: 'Корзина',
                icon: '/images/icons/trash.png'
            }
        };
        var typeIcons = {
            1 : '/images/icons/warning.png',
            2 : '/images/icons/fam/cog.png',
            3 : '/images/icons/fam/user.png'
        };



        for (var i in boxes) {
            var boxName = boxes[i].name;
            var icon = boxes[i].icon;

            var child = {
                    type: 0,
                    box: i,
                    text: boxName,
                    icon: icon,
                    leaf: false,
                    expanded: true,
                    children: []
            };

            if (i == 'in') {
                for (var j in types) {
                    var type = types[j];
                    child.children.push({
                        type: j,
                        box: i,
                        icon: typeIcons[j],
                        text: type,
                        leaf: true
                    })
                }
            }

            this.root.children.push(child);
        }

        this.superclass.constructor.call(this, config);

    }
});
Ext.define('EC.PA.store.MessagesTypes', {
    extend: 'Ext.data.TreeStore',
    fields: ['type','box','text'],

    constructor: function(config) {
        this.root = {
            expanded: true,
            children: []
        };

        var types = xlib.System.Messages.getMessageTypes();
        var boxes = {
            'in':'Входящие',
            'out': 'Исходящие',
            'deleted': 'Удаленные'
        };

        for (var i in boxes) {
            var boxName = boxes[i];

            var child = {
                    type: 0,
                    box: i,
                    text: boxName,
                    leaf: false,
                    children: []
            };

            if(i === 'in') {
                child.expanded = true;
            }

            for (var j in types) {
                var type = types[j];
                child.children.push(
                    {type: j, box: i, text: type, leaf: true }
                )
            }

            this.root.children.push(child);
        }

        this.superclass.constructor.call(this, config);

    }
});
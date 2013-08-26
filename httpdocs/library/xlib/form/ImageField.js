Ext.define('xlib.form.ImageField', {
    extend: 'Ext.form.field.Base',
    alias: 'widget.imagefield',

    dir: '/images/',
    value: '',
    defaultAutoCreate : {tag: 'div', 'class' : 'image-field-wrap'},

    noCache: 0,

    initComponent: function () {
        this.updateCache();
        if (!Ext.isDefined(this.value)) this.value = '';
        xlib.form.ImageField.superclass.initComponent.call(this);
    },

//    setValue: function (v) {
//        var me = this;
//        me.callParent(arguments);
//    },

    imageFieldTpl : new Ext.XTemplate(
        '<img id="{id}" class="{fieldCls}" src="{dir}{value}?v={noCache}" />'
    ),
    updateCache: function(){
        this.noCache = (new Date()).getTime();
    },
    onRender : function(ct, position){
        xlib.form.ImageField.superclass.onRender.call(this, ct, position);
        this.el.update(this.imageFieldTpl.apply(this));
    }

    ,setValue : function (v) {
        this.updateCache();
        if(v === '' || v === null ) return;

        var setFn = function () {
            this.el.update(this.imageFieldTpl.apply(this));
        };
        this.value = v;
        if (this.rendered) {
            setFn.call(this, v);
        } else {
            this.on('afterrender', setFn.createDelegate(this), {single:true});
        }
    }


});
Ext.define('xlib.overrides.FileField', {
    override: 'Ext.form.field.File'

    /*
    * FIX: чтобы при отправке формы, поле не сбрасывалось
    * */
    ,extractFileInput: function() {
        var me = this,
            fileInput = me.fileInputEl.dom,
            clone = fileInput.cloneNode(true);

        fileInput.parentNode.replaceChild(clone, fileInput);
        me.fileInputEl = Ext.get(clone);
        return fileInput;
    }
});
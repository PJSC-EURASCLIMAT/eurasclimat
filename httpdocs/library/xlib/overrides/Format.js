Ext.define('xlib.overrides.Format', {
    override: 'Ext.util.Format'

    ,wformat: function( number, forms ) {
        var n = parseInt(number,10);
        var nplurals=3;
        var plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
        plural = (n==0)?0:plural + 1;
        if(forms.length > plural) return forms[plural].replace("$",n);
        return "";
    }

});
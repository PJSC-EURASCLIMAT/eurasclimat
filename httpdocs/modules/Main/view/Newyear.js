Ext.define('EC.Main.view.Newyear', {

    extend: 'Ext.panel.Panel',

    layout: 'fit',
    
    //html: '<script src="http://101widgets.com/w1417264196-0000012b&159&228"></script>'
    /*
    html: '<center><object data="http://101widgets.com/w/6632eeb7708f6410598b74b2660b0ed91417264196-0000012b/wid.swf" ' +
          'type="application/x-shockwave-flash" height="208" width="170">' +
          '<param name="autoPlay" value="true">' +
          '<param name="allowScriptAccess" value="always">' +
          '<param name="flashvars" value="fid=14172641960000012b">' +
          '<param name="allowNetworking" value="internal">' +
          '<param name="menu" value="false" /><param name="quality" value="high" />' +
          '<param name="wmode" value="transparent" /></object></center>'
          */
    
    html: '<iframe width="100%" height="100%" src="/ny/dedm2.swf"></iframe>'
});
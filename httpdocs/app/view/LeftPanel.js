Ext.define('App.view.LeftPanel', {

    extend: 'Ext.Panel',
    
    alias: 'widget.LeftPanel',

    region: 'west',
    
    layout: 'border', 
    
    width: 150,
    
    baseCls: 'xlib-bkg',
    
    border: false,
    
    items: [{
        region: 'north',
        baseCls: 'xlib-bkg',
        height: 140, 
        items: [{
            xtype: 'image',
            src: '/images/logo.png',
            margin: '20 10'
        }]
    }, {
        region: 'center',
        baseCls: 'xlib-bkg',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        padding: 5,
        defaultType: 'button',
        defaults: {
            margins: 5,
            textAlign: 'left'
        },
        items: [{
            text: 'Каталоги',
            title: 'Каталоги продукции и услуг',
            icon: '/images/icons/catalogue.png',
            launchModule: 'EC.Catalog.controller.Main',
            hidden: !acl.isView('catalog')
        }, {
            text: 'Администрирование',
            iconCls: 'expand-all',
            hidden: !acl.isView('admin'),
            launchModule: 'EC.Admin.controller.Main'
        }, {
            text: 'Личный кабинет',
            icon: '/images/icons/worker.png',
            hidden: xlib.Acl.Storage.getIdentity().login == 'guest', 
            launchModule: 'EC.Pa.controller.Main'    
        }, {
            text: xlib.Acl.Storage.getIdentity().login == 'guest' 
                ? 'Войти в систему' : 'Выйти из системы',
            icon: '/images/icons/login.png',
            handler: function() {
                window.location.href = xlib.Acl.Storage.getIdentity().login == 'guest'
                    ? '/index/login' : '/index/logout';
            }
        }, {
            xtype: 'label',
            style: 'padding-top: 20px;',
            html: '<div id="gsInformerID-br6KGuhku8Cw22" class="gsInformer" style="width:128px;height:187px"><div class="gsIContent"><div id="cityLink"><a href="http://www.gismeteo.ru/city/daily/4368/" target="_blank">Погода в Москве</a></div><div class="gsLinks"><table><tr><td><div class="leftCol leftColCenter"><a href="http://www.gismeteo.ru/city/weekly/4368/" target="_blank"><img alt="Gismeteo" title="Gismeteo" src="http://www.gismeteo.ru/static/images/informer2/logo-mini2.png" align="absmiddle" border="0" /><span>Gismeteo</span></a></div></td></tr></table></div></div></div>'
        }]
    }]
});
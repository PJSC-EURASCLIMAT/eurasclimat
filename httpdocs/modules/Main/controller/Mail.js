Ext.define('EC.Main.controller.Mail', {

    extend: 'Ext.app.Controller',

    run: function(container) {
        
        container.add(Ext.create('Ext.panel.Panel', {
        	title: 'Почта',
        	frame: true,
            items: [Ext.create('Ext.Component', {
                autoEl: {
                    tag: 'iframe',
                    width: '100%',
                    height: '100%',
                    src: 'http://eurasmail.ru/mail'
                }
            })]
        }));
            
    }
    
});
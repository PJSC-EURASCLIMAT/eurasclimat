Ext.define('EC.Catalog.controller.ChapterAbstract', {
    
    extend: 'Ext.app.Controller',
    
    content: '',
    
    run: function(container) {
        
        this.Container = container; 
        
        container.add({
            border: false,
            title: false,
            items: [Ext.create('Ext.panel.Panel', {
                border: false,
                title: false,
                bodyPadding: 5,
                padding: '0 0 5px 0',
                autoScroll: true,
                style: 'text-align: justify;',
                html: this.content
            })]
        });
    }
});
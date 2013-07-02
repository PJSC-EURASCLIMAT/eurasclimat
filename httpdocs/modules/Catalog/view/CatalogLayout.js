Ext.define('EC.Catalog.view.CatalogLayout', {
    
    extend: 'Ext.panel.Panel',
    
    layout: 'border',
    
    border: false,
    
    items: [{
        xtype: 'CatalogTree',
        region: 'west',
        width: 170
    }, {
        xtype: 'panel',
        type: 'preview',
        layout: 'fit',
        region: 'center',
        items: [{
            xtype: 'panel',
            layout: 'fit',
            bodyPadding: 5,
            autoScroll: true,
            border: false,
            style: 'text-align: justify;',
            html: 'При раз&shy;вер&shy;ты&shy;ва&shy;нии ви&shy;дже&shy;та ' +
                    'и на&shy;жа&shy;тии в поле сле&shy;ва на ка&shy;кую-либо ' +
                    'по&shy;зи&shy;цию из спис&shy;ка ка&shy;та&shy;ло&shy;гов ' +
                    'то&shy;ва&shy;ров, в этом поле вы смо&shy;же&shy;те ' +
                    'озна&shy;ко&shy;мить&shy;ся с рас&shy;кры&shy;ва&shy;ю&shy;щей ' +
                    'или по&shy;яс&shy;ня&shy;ю&shy;щей ин&shy;фор&shy;ма&shy;ци&shy;ей ' +
                    'о дан&shy;ном ка&shy;та&shy;ло&shy;ге то&shy;ва&shy;ров, ' +
                    'а так&shy;же уви&shy;деть гра&shy;фик ак&shy;тив&shy;но&shy;сти ' +
                    'поль&shy;зо&shy;ва&shy;те&shy;лей при ра&shy;бо&shy;те ' +
                    'с дан&shy;ным ка&shy;та&shy;ло&shy;гом то&shy;ва&shy;ров.'
        }]
    }]
});
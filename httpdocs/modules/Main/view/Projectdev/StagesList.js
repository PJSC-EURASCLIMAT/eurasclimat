Ext.define('EC.Main.view.Projectdev.StagesList', {

    extend: 'Ext.grid.Panel',
    
    store: 'EC.Main.store.Projectdev.Stages',
    
    layout: 'fit',
    
    forceFit: true,
    
    border: false,
    
    initComponent: function() {
        
        this.columns = [{
            header: '№',
            dataIndex: 'index'
        }, {
            header: 'Автор',
            dataIndex: 'author'
        }, {
            header: 'Наименование',
            dataIndex: 'name'
        }, {
            xtype: 'datecolumn',
            header: 'Планируемая дата </br>начала',
            format: 'd.m.Y H:i',
            dataIndex: 'date_plan_begin'
        }, {
            xtype: 'datecolumn',
            header: 'Планируемая дата </br>завершения',
            format: 'd.m.Y H:i',
            dataIndex: 'date_plan_end'
        }, {
            xtype: 'datecolumn',
            header: 'Фактическая дата </br>начала',
            format: 'd.m.Y H:i',
            dataIndex: 'date_fact_begin'
        }, {
            xtype: 'datecolumn',
            header: 'Фактическая дата </br>завершения',
            format: 'd.m.Y H:i',
            dataIndex: 'date_fact_end'
        }, {
            xtype: 'datecolumn',
            header: 'Дата </br>создания',
            format: 'd.m.Y H:i',
            dataIndex: 'date_create'
        }
      ],
       
      this.bbar = Ext.create('Ext.PagingToolbar', {
          store: this.store,
          displayInfo: true,
          plugins: Ext.create('xlib.ProgressBarPager', {})
      });

      this.callParent(arguments);
    }
});
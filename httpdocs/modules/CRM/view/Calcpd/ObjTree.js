Ext.define('EC.CRM.view.Calcpd.ObjTree', {

    extend: 'Ext.tree.Panel',
    
    alias: ['widget.CalcpdObjTree'],
    
    store: 'EC.CRM.store.Calcpd.ObjTree',
    
    layout: 'fit',
    
    title: 'Типы и классы объектов',
    
    rootVisible: false,
    
    useArrows: true,
    
    scroll: 'vertical'
    
});
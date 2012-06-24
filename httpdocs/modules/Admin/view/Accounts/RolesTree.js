Ext.define('EC.Admin.view.Accounts.RolesTree', {

    extend: 'Ext.tree.Panel',
    
    store: 'EC.Admin.store.AccountRoles',
    
    rootVisible: false,
    
    useArrows: true,
    
    floating: true,
    
    hidden: true,
    
    height: 200,
    
    minWidth: 200,
    
    displayField: 'name',
    
    initComponent: function() {
        
        this.on('show', function() {
            this.setLoading('Загрузка...');
            Ext.Function.defer(this.setChecks, 1000, this, arguments); 
        }, this);
        
        this.on('hide', this.setValue, this);
        
        this.callParent(arguments);
    },
    
    setChecks: function() {
        
        var roles = Ext.decode(this.field.getValue());
        
        var f = function(node) {
            node.set('checked', false);
            node.expand();
            Ext.each(roles, function(r) {
                if (node.get('id') == r.id) {
                    node.set('checked', true);
                    return false;
                }
            });
            node.eachChild(f);
        }; 
        
        this.getRootNode().eachChild(f);
        this.setLoading(false);
    },
    
    setValue: function () {
        var roles = [],
            data = this.getChecked();
        Ext.each(data, function(r) {
            roles.push({id: r.get('id'), name: r.get('name')});
        });
        this.field.setValue(Ext.encode(roles));
    }
});







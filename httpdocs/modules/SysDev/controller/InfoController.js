Ext.define('EC.SysDev.controller.InfoController', {
    
    extend: 'EC.SysDev.controller.abstract.InfoController',
    
    refs: [
        { ref: 'info', selector: 'project-info-component' }, // this.getInfo()
        { ref: 'editButton', selector: 'project-info-component [itemId="edit-button"]' } // this.getEditButton()
    ],

    run: function() {

        this.listen({
            component: {
                'project-info-component [itemId="edit-button"]': {
                    click: this.onEditButtonClick
                }
            }
//            ,controller: {
//                '*': {
//                    'project-selected': this.onProjectSelected
//                }
//            }
        });

    }
    
});
Ext.define('EC.CRM.view.Projects.Members', {
    
    extend: 'Ext.grid.Panel',
    
    itemId: 'ProjectsMembersPanel',
    
    border: false,

    layout: 'fit',
    
    enableColumnHide: false,
    
    enableColumnMove: false,
    
    permissions: null,
    
    projectID: null,
    
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: [
            '{name:this.formatName}', {
                formatName: function(v) {
                    switch(v) {
                        case 'customer': return 'Представитель заказчика';
                        case 'manager': return 'Менеджер проекта';
                        case 'projector': return 'Отдел проектирования';
                        case 'logistic': return 'Отдел логистики';
                        case 'productor': return 'Производственный отдел';
                        case 'bookkeeper': return 'Финансовый отдел';
                        case 'commercial': return 'Коммерческий отдел';
                        case 'lawyer': return 'Юридический отдел';
                        case 'clerk': return 'Отдел делопроизводства';
                        case 'adv': return 'Отдел рекламы и маркетинга';
                        case 'metalconst': return 'Производство металоконструкций';
                        case 'provider': return 'Поставщик';
                        case 'contractor': return 'Подрядчик';
                        default: return v;
                    }
                }
            }
        ],
        enableGroupingMenu: false,
        hideGroupedHeader: true
    }],

    initComponent: function() {
        
    	this.store = Ext.create('EC.CRM.store.Projects.Members');
    	
        this.columns = [{
            header: 'Роль',
            dataIndex: 'role'
        }, {
            xtype: 'templatecolumn',
            header: 'Имя',
            tpl: '<a href="#/profile/{account_id}/show">{account_name}</a>',
            dataIndex: 'account_name',
            flex: 1
        }, {
            header: 'Город',
            dataIndex: 'city',
            width: 200
        }, {
            header: 'Страна',
            dataIndex: 'country',
            width: 200
        }, {
        	xtype: 'checkcolumn',
        	text: 'Редактирование',
        	align: 'center',
            dataIndex: 'is_editor',
            disabled: !this.permissions,
            width: 120
        }, {
            xtype: 'actioncolumn',
            width: 20,
            items: [{
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('deleteitem', grid.getStore().getAt(rowIndex).get('id'));
                },
                scope: this
            }]
        }];

        this.tbar = [{
            text: 'Добавить участника',
            iconCls: 'user-add',
            hidden: !this.permissions,
            menu: [{
                text: 'Представитель заказчика',
                role: 'customer',
                iconCls: 'user-add'
            }, {
                text: 'Менеджер проекта',
                role: 'manager',
                iconCls: 'user-add'
            }, {
                text: 'Отдел проектирования',
                role: 'projector',
                iconCls: 'user-add'
            }, {
                text: 'Отдел логистики',
                role: 'logistic',
                iconCls: 'user-add'
            }, {
                text: 'Производственный отдел',
                role: 'productor',
                iconCls: 'user-add'
            }, {
            	text: 'Финансовый отдел',
            	role: 'bookkeeper',
            	iconCls: 'user-add'
            }, {
            	text: 'Коммерческий отдел',
            	role: 'commercial',
            	iconCls: 'user-add'
            }, {
              text: 'Юридический отдел',
              role: 'lawyer',
              iconCls: 'user-add'
            }, {
            	text: 'Отдел делопроизводства',
            	role: 'clerk',
            	iconCls: 'user-add'
            }, {
            	text: 'Отдел рекламы и маркетинга',
            	role: 'adv',
            	iconCls: 'user-add'
            }, {
            	text: 'Производство металоконструкций',
            	role: 'metalconst',
            	iconCls: 'user-add'
            }, {
            	text: 'Поставщик',
            	role: 'provider',
            	iconCls: 'user-add'
            }, {
            	text: 'Подрядчик',
            	role: 'contractor',
            	iconCls: 'user-add'
            }]
        }, '->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            action: 'refresh'
        }];
        
        this.callParent(arguments);
    }
});
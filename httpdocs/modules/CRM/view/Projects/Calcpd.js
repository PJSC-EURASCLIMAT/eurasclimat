Ext.define('EC.CRM.view.Projects.Calcpd', {
    
    extend: 'Ext.panel.Panel',
    
    layout: 'fit',
    
    border: false,
    
    initComponent: function() {
    	
	    this.items = [{
	        xtype: 'grid',
	        store: Ext.create('EC.CRM.store.Projects.Calcpd'),
	        layout: 'fit',
	        enableColumnHide: false,
	        enableColumnMove: false,
	        features: [{
	            ftype: 'groupingsummary',
	            groupHeaderTpl: '{name}',
	            enableGroupingMenu: false,
	            hideGroupedHeader: true
	        }, {
	            ftype: 'summary',
	            dock: 'bottom'
	        }],
	        plugins: [{
	            ptype: 'cellediting',
	            pluginId: 'CalcpdEditor',
	            clicksToEdit: 1
	        }],
	        columns: [{
	            header: 'Класс помещения',
	            dataIndex: 'obj_class_name'
	        }, {
	            header: 'Наименование работы',
	            dataIndex: 'serv_name',
	            flex: 1,
	            hideable: false,
	            sortable: false,
	            summaryType: 'count',
	            summaryRenderer: function(value, summaryData, dataIndex) {
	                return 'Итого (' + value + ')';
	            }
	        }, {
	        	header: 'Тип объекта',
	        	dataIndex: 'obj_type_name',
	            width: 200,
	        }, {
	            xtype: 'numbercolumn',
	            header: 'Цена за м.кв.',
	            hideable: false,
	            sortable: false,
	            align: 'right',
	            width: 100,
	            dataIndex: 'price',
	            renderer: xlib.formatCurrency
	        }, {
	            xtype: 'numbercolumn',
	            header: 'Площадь (м.кв.)',
	            hideable: false,
	            sortable: false,
	            align: 'right',
	            width: 100,
	            dataIndex: 'square',
	            summaryType: 'sum',
	            field: {
	                xtype: 'numberfield',
	                minValue: 0 
	            }
	        }, {
	            xtype: 'numbercolumn',
	            header: 'Сумма',
	            hideable: false,
	            sortable: false,
	            align: 'right',
	            width: 100,
	            dataIndex: 'summ',
	            summaryRenderer: xlib.formatCurrency,
	            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
	                return xlib.formatCurrency(record.get('price') * record.get('square'));
	            },
	            summaryType: function(records) {
	                var i = 0, length = records.length, total = 0, record;
	                for (; i < length; ++i) {
	                    record = records[i];
	                    total += (record.get('price') * record.get('square'));
	                }
	                return total;
	            }
	        }, {
	            xtype: 'actioncolumn',
	            hideable: false,
	            sortable: false,
	            align: 'center',
	            width: 45,
	            items: [{
	                icon: '/images/icons/edit.png',
	                tooltip: 'Редактировать',
	                iconCls: 'x-btn',
	                handler: function(view, rowIndex, colIndex) {
	                    var grid = view.up('grid'),
	                        editor = grid.getPlugin('CalcpdEditor'),
	                        record = grid.getStore().getAt(rowIndex),
	                        column = grid.down('numbercolumn[dataIndex=square]');
	                    editor.startEdit(record, column);
	                }
	            }, {
	                icon: '/images/icons/fam/delete.gif',
	                tooltip: 'Удалить',
	                iconCls: 'x-btn',
	                handler: function(view, rowIndex, colIndex) {
	                    Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
	                        if ('yes' === b) {
	                            var store = view.up('grid').getStore();
	                            store.removeAt(rowIndex);
	                            store.reload();
	                        }
	                    }, this);
	                }
	            }]
	        }]
	    }];
    
    	this.tbar = {
			layout: 'vbox',
			style: 'height: 60px;',
			items: [{
				xtype: 'toolbar',
				border: false,
				width: '100%',
				items: [{
			    	xtype: 'button',
			    	text: 'Информация по ценам на ПИР',
			    	iconCls: 'info',
			    	action: 'info'
			    }, {
			    	xtype: 'button',
			    	text: 'Настройки ПИР',
			    	iconCls: 'option',
			    	hidden: !acl.isUpdate('calcpd', 'admin'),
			    	action: 'config'
			    }, {
			    	xtype: 'button',
		            text: 'Скачать список в Excel',
		            iconCls: 'excel',
		            action: 'excel'
			    }, '->', {
			    	xtype: 'button',
			    	tooltip: 'Обновить',
			    	iconCls: 'x-tbar-loading',
			    	action: 'refresh'
			    }],
			}, {
				xtype: 'form',
		        height: 27,
		        layout: 'hbox',
		        bodyStyle: 'background: transparent;',
		        border: false,
		        defaults: {
		            inputAttrTpl: 'style="height:19px;"',
		            allowBlank: false,
		            margins: '5 5 5 5'
		        },
		        items: [{
		            xtype: 'combo',
		            valueField: 'id',
		            displayField: 'name', 
		            fieldLabel: 'Тип помещения',
		            name: 'obj_class_id',
		            labelWidth: 85,
		            width: 245,
		            editable: false,
		            value: '',
		            store: {
		                fields: ['id', 'name'],
		                autoLoad: true,
		                proxy: {
		                    type: 'ajax',
		                    api: {
		                        read:   '/json/crm/calcpd-config/read-obj-class'
		                    },
		                    reader: {
		                        type: 'json',
		                        root: 'data',
		                        successProperty: 'success'
		                    },
		                    pageParam: undefined,
		                    startParam: undefined,
		                    sortParam: undefined,
		                    limitParam: undefined
		                }
		            }
		        }, {
		        	xtype: 'combo',
		        	valueField: 'id',
		        	displayField: 'name', 
		        	fieldLabel: 'Тип объекта',
		        	name: 'obj_type_id',
		        	labelWidth: 70,
		        	width: 245,
		        	editable: false,
		        	value: '',
		        	store: {
		        		fields: ['id', 'name'],
		        		autoLoad: true,
		        		proxy: {
		        			type: 'ajax',
		        			api: {
		        				read:   '/json/crm/calcpd-config/read-obj-type'
		        			},
		        			reader: {
		        				type: 'json',
		        				root: 'data',
		        				successProperty: 'success'
		        			},
		        			pageParam: undefined,
		        			startParam: undefined,
		        			sortParam: undefined,
		        			limitParam: undefined
		        		}
		        	}
		        }, {
		            xtype: 'combo',
		            valueField: 'id',
		            displayField: 'name', 
		            fieldLabel: 'Вид работы',
		            name: 'serv_id',
		            labelWidth: 65,
		            width: 245,
		            editable: false,
		            value: '',
		            store: {
		                fields: ['id', 'name'],
		                autoLoad: true,
		                proxy: {
		                    type: 'ajax',
		                    api: {
		                        read:   '/json/crm/calcpd-config/read-serv'
		                    },
		                    reader: {
		                        type: 'json',
		                        root: 'data',
		                        successProperty: 'success'
		                    },
		                    pageParam: undefined,
		                    startParam: undefined,
		                    sortParam: undefined,
		                    limitParam: undefined
		                }
		            }
		        }, {
		            xtype: 'numberfield',
		            inputAttrTpl: 'style="height:20px;"',
		            fieldLabel: 'Площадь',
		            labelWidth: 50,
		            minValue: 0,
		            name: 'square',
		            width: 135,
		            value: 0
		        }, {
		            xtype: 'button',
		            text: 'Добавить',
		            formBind: true,
		            action: 'addline'
		        }]
			}]
    	};
    	
    	this.callParent(arguments);
    },
});
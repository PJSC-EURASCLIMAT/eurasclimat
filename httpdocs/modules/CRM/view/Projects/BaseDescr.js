Ext.define('EC.CRM.view.Projects.BaseDescr', {
    
    extend: 'Ext.form.Panel',
    
    uses: [
        'EC.CRM.view.Projects.StageCombo',
        'EC.CRM.view.Projects.ObjectCombo'
    ],
    
    autoScroll: true,
    
    trackResetOnLoad: true,
    
    border: false,
    
    bodyPadding: 5,
    
    fieldDefaults: {
        labelAlign: 'left',
        border: false,
        allowBlank: true,
        anchor: '100%',
        labelWidth: 200
    },
    
    url: null,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'hidden',
            name: 'id'
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Инициатор',
            name: 'creator_name'
        }, {
            xtype: 'projectsGroupsCombo',
            fieldLabel: 'Группа',
            name: 'group_id'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Наименование проекта',
            name: 'name'
        }, {
            xtype: 'AccountsCombo',
            fieldLabel: 'Заказчик',
            name: 'customer_id'
        }, {
            xtype: 'AccountsCombo',
            fieldLabel: 'Руководитель проекта',
            name: 'manager_id'
        }, {
            xtype: 'ProjectsStageCombo'
        }, {
            xtype: 'ProjectsObjectCombo'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Площадь помещения (м.кв.)',
            name: 'area'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Адрес объекта',
            name: 'address'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Описание',
            name: 'description'
        }, {
            xtype: 'fieldcontainer',
            defaultType: 'checkboxfield',
            fieldLabel: 'Типы инженерных систем',
            defaults: {
                inputValue: '1',
                uncheckedValue: '0'
            },
            items: [{
                boxLabel: 'Кондиционирование',
                name: 'sys_cond'
            }, {
                boxLabel: 'Вентиляция',
                name: 'sys_vent'
            }, {
                boxLabel: 'Отопление',
                name: 'sys_heat'
            }, {
                boxLabel: 'Водоснабжение',
                name: 'sys_water'
            }, {
                boxLabel: 'Электрика',
                name: 'sys_electricity'
            }, {
                boxLabel: 'Автоматизация',
                name: 'sys_automation'
            }, {
                boxLabel: 'Канализация',
                name: 'sys_canal'
            }, {
                boxLabel: 'Пожарная сигнализация',
                name: 'sys_fire'
            }, {
                boxLabel: 'Охранная сигнализация',
                name: 'sys_security'
            }, {
                boxLabel: 'Интернет коммуникации',
                name: 'sys_internet'
            }, {
                boxLabel: 'Телефонизация',
                name: 'sys_phone'
            }, {
                boxLabel: 'Радиофикация',
                name: 'sys_radio'
            }, {
                boxLabel: 'Телевизионные системы и коммуникации',
                name: 'sys_tv'
            }, {
                boxLabel: 'Диспетчеризация',
                name: 'sys_dispatch'
            }, {
                boxLabel: 'Системы чистых помещений',
                name: 'sys_clean'
            }]
        }, {
            xtype: 'fieldcontainer',
            defaultType: 'checkboxfield',
            fieldLabel: 'Типы услуг',
            defaults: {
                inputValue: '1',
                uncheckedValue: '0'
            },
            items: [{
                boxLabel: 'Проектирование',
                name: 'serv_project'
            }, {
                boxLabel: 'Логистика',
                name: 'serv_logistic'
            }, {
                boxLabel: 'Исполнение',
                name: 'serv_execution'
            }, {
                boxLabel: 'Внедрение',
                name: 'serv_implementation'
            }]
        }];

        this.bbar = ['->', {
            text: 'Сохранить',
            formBind: true,
            action: 'save'
        }, {
            text: 'Отменить изменения',
            scope: this,
            handler: function() {
                this.getForm().reset();
            }
        }];
        
        this.callParent(arguments);
    }
});
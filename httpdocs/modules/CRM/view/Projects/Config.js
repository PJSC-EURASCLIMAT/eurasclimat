Ext.define('EC.CRM.view.Projects.Config', {
    
    extend: 'Ext.form.Panel',
    
    trackResetOnLoad: true,
    
    border: false,
    
    defaults: {
        labelAlign: 'top',
        padding: 20
    },
    
    items: [{
        xtype: 'checkboxgroup',
        fieldLabel: 'Типы инженерных систем',
        columns: 3,
        labelStyle: 'font-weight: 900; padding-bottom: 10px;',
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
        xtype: 'checkboxgroup',
        fieldLabel: 'Типы услуг',
        labelStyle: 'font-weight: 900; padding-bottom: 10px;',
        columns: 4,
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
    }],
        
    initComponent: function() {
        
        this.bbar = ['->', {
            text: 'Сохранить',
            formBind: true,
            action: 'save'
        }, {
            text: 'Отменить',
            scope: this,
            handler: function() {
                this.getForm().reset();
            }
        }];
        
        this.callParent(arguments);
    }
});
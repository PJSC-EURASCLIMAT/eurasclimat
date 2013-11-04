Ext.define('EC.SysDev.view.Info', {
    
    alias: 'widget.project-info-component',

    extend: 'Ext.panel.Panel',

    border: false,

    //alias: 'widget.project-info-component',

    tbar: [
        '->',
        {
            text: 'Редактировать',
            itemId: 'edit-button',
            hidden: !acl.isUpdate('sysdev', 'info')
        }
    ],

    data: {},

    loader: {
        url: '/json/sysdev/project-info/get',
        autoload: false,
        loadMask: true,
        renderer: 'data'
    },

    tpl: [
        '<tpl if="data">',
        '<div style="padding:5px;">',
        '<b>Наименование проекта: </b> {data.name}<br/><br/>',
        '<a href="#" action="show-full_desc">Детальное описание проекта</a><br/><br/>',
        '<b>Описание проекта: </b> {data.description}<br/><br/>',
        '<b>Инициатор проекта: </b> {data.author}<br/><br/>',
        '<b>Бюджет:</b> {data.budget} р. <br/><br/>',
        '<b>Особые условия проекта: </b> <br/><br/>',
        '<b>Планируемые сроки проекта: </b> с {[this.formatDate(values.data.date_plan_begin)]} по {[this.formatDate(values.data.date_plan_end)]}',
        '<br/><br/>',
        '<b>Дата фактического выполнения: </b>{[this.formatDate(values.data.date_fact_end)]} <br/><br/>',
        '</div>',
        '</tpl>',
        {
            formatDate: function(dateString) {

                var date = Ext.Date.parse(dateString, 'Y-m-d H:i:s');

                return Ext.Date.format(date, 'd.m.Y');

            }
        }
    ],
    initComponent: function () {

        this.listeners = {
            element  : 'el',
            delegate : 'a[action=show-full_desc]',
            click    : function() {
                this.fireEvent('show-full_desc');
            },
            scope: this
        };
        this.callParent(arguments);

    }
    
});
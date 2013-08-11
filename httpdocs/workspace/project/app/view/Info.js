Ext.define('Project.view.Info', {
    
    extend: 'Ext.Component',
    
    alias: 'widget.project-info-component',

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
        '<h2>Cведения о проекте разработки системы</h2>',
        '<b>Наименование проекта: </b> {data.name}<br/><br/>',
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
    ]
});
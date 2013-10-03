Ext.define('EC.Project.controller.execution.StageChartController', {
    
    extend: 'Ext.app.Controller',
    
    refs: [
        { ref: 'stageChart', selector: 'project-stage-chart' } // this.getStageChart()
    ],
    
    init: function() {
        
        this.listen({
            controller: {
                '*': {
                    'project-selected': this.onProjectSelected
                }
            },
            store: {
                '#projectStageChartStore': {
                    load: this.onStageChartStoreLoad
                }
            }
        });
        
    },
            
    onProjectSelected: function(record) {

        if (record.get('leaf') != true) {
            return;
        }
        
        if (!acl.isView('projectdev', 'chart')) {
            return;
        }

        this.getStageChart().getStore().load({
            params: {
                project_id: record.get('id')
            }
        });

    },
            
    onStageChartStoreLoad: function(store, records, successful, eOpts) {
            
        var finishDatePlan = 0;
        var finishDateFact = 0;

        if (records.length > 0) {
            finishDatePlan = records[records.length-1].get('date_plan_end');
            finishDateFact = records[records.length-1].get('date_fact_end');
        }

        for (var i = 0; i < records.length; i++) {

            var rec = records[i];
            rec.set('date_plan_finish', finishDatePlan);
            rec.set('date_fact_finish', finishDateFact);
            if (i == records.length-1) {
                rec.set('finish_display', 'Этап ' + rec.get('index') + ' - ' + rec.get('name') +  ' (Финиш)');
            } else {
                rec.set('finish_display', 'Этап ' + rec.get('index') + ' - ' + rec.get('name'));
            }
        }
        
    }
    
});
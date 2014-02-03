Ext.define('EC.Experts.view.Experts.FilterTree', {

    extend: 'Ext.tree.Panel',

    alias: 'widget.ExpertsFilterTree',

    layout: 'fit',

    hideHeaders: true,

    useArrows: true,

    rootVisible: false,

    initComponent: function() {

        this.store = Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                children: [
                    {
                        text: "Специалисты по типам инженерного оборудования",
                        expanded: false,
                        children: [
                            { text:'Кондиционерное оборудование', leaf: true},
                            { text:'Оборудование вентиляции', leaf: true},
                            { text:'Оборудование водоснабжения и канализации', leaf: true},
                            { text:'Оборудование пылеудаления', leaf: true},
                            { text:'Оборудование отопления', leaf: true},
                            { text:'Электрика', leaf: true},
                            { text:'Автоматика', leaf: true},
                            { text:'Пожарная сигнализация', leaf: true},
                            { text:'Охранная сигнализация', leaf: true},
                            { text:'Интернет-коммуникации', leaf: true},
                            { text:'Оборудование телефонизации', leaf: true},
                            { text:'Оборудование радиофикации', leaf: true},
                            { text:'Телевизионные системы ', leaf: true}
                        ]
                    },
                    {
                        text: "Специалисты по типам деятельности",
                        expanded: false,
                        children: [
                            { text:'Руководитель проекта', leaf: true},
                            { text:'Проектировщик', leaf: true},
                            { text:'Менеджер', leaf: true},
                            { text:'Логист', leaf: true},
                            { text:'Инженер', leaf: true},
                            { text:'Монтажник', leaf: true},
                            { text:'Маркетолог', leaf: true},
                            { text:'Эксперт', leaf: true},
                            { text:'Экономист', leaf: true},
                            { text:'Аудитор', leaf: true},
                            { text:'Бухгалтер', leaf: true},
                            { text:'Делопроизводитель', leaf: true},
                            { text:'Специалист по безопасности', leaf: true},
                            { text:'Специалист по охране труда', leaf: true}
                        ]
                    },
                    {
                        text: "Специалисты по статусу",
                        expanded: false,
                        children: [
                            { text:'Штатный руководящий работник', leaf: true},
                            { text:'Штатный специалист', leaf: true},
                            { text:'Внештатный специалист', leaf: true},
                            { text:'Свободный специалист', leaf: true},
                            { text:'Работник по совмещению', leaf: true},
                            { text:'Работник временного замещения', leaf: true},
                            { text:'Прикомандированный специалист', leaf: true},
                            { text:'Стажер', leaf: true},
                            { text:'Ученик', leaf: true}
                        ]
                    },
                    {
                        text: "Специалисты по рейтингам",
                        expanded: false,
                        children: [
                            { text:'Лучший специалист', leaf: true},
                            { text:'Эксперт', leaf: true},
                            { text:'Высококвалифицированный специалист', leaf: true},
                            { text:'Специалист средней квалификации', leaf: true},
                            { text:'Специалист низкой квалификации', leaf: true},
                            { text:'Кандидат в специалисты', leaf: true}
                        ]
                    },
                    {
                        text: "Специалисты по опыту"
                    },
                    {
                        text: "Специалисты по регионам",
                        expanded: false
                    }
                ]
            }
        });

        this.callParent(arguments);
    }
});
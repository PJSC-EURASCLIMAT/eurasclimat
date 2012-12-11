Ext.define('EC.Main.view.Layout', {

    extend: 'Ext.tab.Panel',

    requires: ['xlib.portal.PortalPanel'],
    
    alias: 'widget.MainPanel',
    
    id: 'Main-tab',
    
    title: 'Главная',

    tabPosition: 'bottom',
    
    closable: false,
    
    border: false,
        
//    tbar: [{
//        text: 'Компания',
//        title: 'Компания'
//        //launchModule: 'EC.Main.controller.Article',
//        //hidden: !acl.isView()
//    }, {
//        text: 'Область оказания услуг',
//        title: 'Область оказания услуг'
//        //launchModule: 'EC.Main.controller.Article',
//        //hidden: !acl.isView()
//    }, {
//        text: 'Партнеры',
//        title: 'Партнеры'
//        //launchModule: 'EC.Main.controller.Article',
//        //hidden: !acl.isView()
//    }, {
//        text: 'Заказчики',
//        title: 'Заказчики'
//        //launchModule: 'EC.Main.controller.Article',
//        //hidden: !acl.isView()
//    }, {
//        text: 'Реализованные объекты',
//        title: 'Реализованные объекты'
//        //launchModule: 'EC.Main.controller.Article',
//        //hidden: !acl.isView()
//    }, {
//        text: 'Контакты',
//        title: 'Контакты'
//        //launchModule: 'EC.Main.controller.Article',
//        //hidden: !acl.isView()
//    }],
    
    defaults: {
        layout: 'fit',
        closable: true
    },
    
    items: [{
        title: 'Рабочий стол',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 2,
        items: [{
            columnWidth: 0.65,
            items: [{
                xtype: 'portlet',
                heigth: 600,
                autoScroll: true,
                title: 'О компании',
                html: '<div style="text-align: justify; padding: 10px;">'
                    + '<p style="text-indent: 2em;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus arcu, lobortis sit amet aliquam vitae, mollis id lacus. Sed eget nibh nulla. Aliquam nisi ipsum, hendrerit a egestas a, tincidunt vulputate justo. Donec a ipsum ac metus accumsan lobortis. Vivamus nec nulla at augue facilisis varius. Morbi a velit eros, non ornare magna. Nam dui erat, suscipit ut vehicula non, interdum vitae eros. Aliquam eu rhoncus libero. Curabitur aliquet ultricies est. Morbi feugiat iaculis posuere. Suspendisse sit amet dui in sapien egestas semper. Nullam nec justo id lacus suscipit tincidunt eu sit amet neque. Vivamus vel leo metus.Proin adipiscing mattis est in gravida. Fusce nec purus nisi, id ullamcorper erat. Donec metus justo, auctor et fermentum ultricies, viverra ac velit. Proin blandit euismod lacinia. Fusce sit amet mollis turpis. Vestibulum sed odio massa. Proin interdum elit nec velit commodo pretium. Curabitur eget justo vitae nisi sodales suscipit. Morbi elit nisi, porta sit amet suscipit at, porttitor ac tellus. Curabitur gravida placerat condimentum. Suspendisse in laoreet diam. Duis iaculis, justo vitae euismod eleifend, neque nisi auctor arcu, sed posuere erat justo a nunc. Ut varius est non quam blandit placerat lobortis arcu pellentesque. Sed consequat dapibus suscipit. Donec odio felis, pharetra in lobortis ac, venenatis in lacus.</p>'
                    + '<p style="text-indent: 2em;">Vivamus vulputate, sem id pharetra porta, turpis nunc elementum ipsum, quis varius elit felis id nisl. Quisque interdum purus ut eros sodales egestas. Suspendisse suscipit urna rutrum est sagittis quis tempor metus consequat. Donec dapibus, justo eu iaculis gravida, purus neque posuere enim, vel vestibulum ante velit vitae dui. Ut sit amet nibh elit, sed commodo ipsum. Suspendisse eu mi justo, ut hendrerit lectus. Nam ullamcorper, mi vel imperdiet luctus, augue purus mattis eros, nec vulputate nulla dolor et sapien. Nullam placerat molestie consectetur. Nulla pretium lorem in arcu fringilla sed malesuada nisl lacinia. In hac habitasse platea dictumst. Morbi egestas, turpis at tristique consequat, arcu orci faucibus eros, a auctor massa nunc a mauris. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin eget massa ante. Cras volutpat, tortor sed egestas aliquet, est nibh tristique enim, sit amet ornare ante arcu vel leo.</p>'
                    + '<p style="text-indent: 2em;">Nullam mi lectus, laoreet eget fermentum quis, adipiscing et purus. Suspendisse nec condimentum leo. Ut ultrices malesuada eros, vel imperdiet nunc elementum vel. Donec vitae orci arcu. Etiam at turpis a ipsum pellentesque placerat. Nam malesuada, urna id pharetra malesuada, arcu arcu elementum tortor, sed venenatis felis nunc eu sem. Praesent ullamcorper, turpis vitae feugiat porta, arcu eros porta mi, quis ultrices tellus sapien sed quam. Quisque accumsan malesuada leo, at pellentesque felis bibendum at. Integer commodo sollicitudin felis et mollis. Mauris risus eros, auctor vitae bibendum eget, hendrerit quis turpis.</p>'
                    + '<p style="text-indent: 2em;">Etiam adipiscing metus nec diam bibendum elementum. In at est rhoncus nibh laoreet congue id at tellus. Vestibulum et elit ligula, vel commodo nisl. Fusce vitae porta lectus. Vivamus suscipit dictum massa, ac porta sapien consectetur id. In hac habitasse platea dictumst. Aliquam id neque at sem sollicitudin pharetra. Aenean imperdiet tellus id nisl malesuada vitae bibendum odio convallis. Pellentesque dictum porta erat, at pretium augue egestas ut. Nam tempus mauris est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam gravida sodales dignissim. Sed facilisis nunc eget enim lobortis faucibus. In ac purus sit amet lectus venenatis interdum.</p>'
                    + '</div>'
            }]
        }, {
            columnWidth: 0.35,
            items: [{
                xtype: 'portlet',
                heigth: 600,
                title: 'Новости'
            }]
        }]
    }]
});
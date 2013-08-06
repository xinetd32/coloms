Ext.define('coloMS.model.inventory.Order', {
    extend: 'coloMS.model.inventory.Base',
    fields: [
        //"user_id":1,"_user__name":"xinetd@ukr.net","_user__first_name":"Oleg","_user__last_name":"Sobyna"
        {
            name: 'user_id',
            type: 'int'
        },
        {
            name: '_user__name',
            type: 'string'
        },
        {
            name: '_user__first_name',
            type: 'string'
        },
        {
            name: '_user__last_name',
            type: 'string'
        }                    
    ]
});
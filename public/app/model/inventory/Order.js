Ext.define('coloMS.model.inventory.Order', {
    extend: 'coloMS.model.inventory.Base',
    fields: [
        //"user_id":1,"_user__name":"xinetd@ukr.net","_user__first_name":"Oleg","_user__last_name":"Sobyna"
        {
            name: 'distributor_id',
            type: 'int'
        },        
        {
            name: 'user_id',
            type: 'int',
            persist: false
        },
        // decorate
        {
            name: '_user__email',
            type: 'string',
            persist: false
        },
        {
            name: '_distributor__name',
            type: 'string',
            persist: false
        },        
        {
            name: '_user__first_name',
            type: 'string',
            persist: false
        },
        {
            name: '_user__last_name',
            type: 'string',
            persist: false
        }                    
    ]
});
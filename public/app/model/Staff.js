Ext.define('coloMS.model.Staff', {
    extend: 'coloMS.model.Base',
    
    fields: [
        {
            name: 'first_name',
            type: 'string'
        },
        {
            name: 'last_name',
            type:  'string'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'dob',
            type: 'date'
        },
        {
            name: 'phone',
            type: 'string'
        },
        {
            name: 'roles',
            type: 'string'
        },
        {
            name: 'last_login',
            type: 'date',
            persist: false
        }
    ]
})
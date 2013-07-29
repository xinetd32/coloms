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
            type: 'date',
            //dateWriteFormat: 'd-m-Y'
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
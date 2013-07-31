Ext.define('coloMS.model.inventory.Distributor', {
    extend: 'coloMS.model.inventory.Base',
    
    fields: [
        {
            name: 'address',
            type: 'string'
        },
        {
            name: 'phone',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        }
    ]
});
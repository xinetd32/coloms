Ext.define('coloMS.model.inventory.Model', {
    extend: 'coloMS.model.inventory.Base',
    
    fields: [
        {
            name: 'power',
            type: 'int'
        },
        {
            name: 'vendor_id',
            type: 'int'
        },
        {
            name: 'product_type_id',
            type: 'int'
        },
        {
            name: 'consumable',
            type: 'boolean'
        },
        // decorate releashions
        {
            name: '_vendors__name',
            type: 'string',
            persist: false
        },
        {
            name: '_product_types__name',
            type: 'string',
            persist: false
        }
    ]
});
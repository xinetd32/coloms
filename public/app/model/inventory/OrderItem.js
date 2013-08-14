Ext.define('coloMS.model.inventory.OrderItem', {
    extend: 'coloMS.model.inventory.Base',
    
    fields: [
        {
            name: 'id',
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
            name: 'order_id',
            type: 'int'
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
        },
        {
            name: 'name',
            type: 'string',
            persist: false
        },        
        {
            name: 'quantity',
            type: 'int',
            defaultValue: 1
        },
        {
            name: 'condition',
            type: 'string'
        },
        {
            name: 'guaranty',
            type: 'int'
        },
        {
            name: 'guaranty_service',
            type: 'string'
        },
        {
            name: 'status',
            type: 'string'
        }        
    ]
});
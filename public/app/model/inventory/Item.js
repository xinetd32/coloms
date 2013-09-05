Ext.define('coloMS.model.inventory.Item', {
    extend: 'coloMS.model.inventory.Base',
    
    fields: [
        {
            name: 'vendor_name',
            type: 'string'
        },    
        {
            name: 'product_type',
            type: 'string'
        },
        {
            name: 'model_name',
            type: 'string',
        },
        {
            name: 'model_power',
            type: 'int',
        },        
        {
            name: 'order_id',
            type: 'string',
        },
        {
            name: 'condition',
            type: 'string'
        },
        {
            name: 'guaranty',
            type: 'string'
        },
        {
            name: 'guaranty_service',
            type: 'string'
        },                
        {
            name: 'status',
            type: 'string'
        },                
        {
            name: 'location_id',
            type: 'int'
        },  
        {
            name: 'price',
            type: 'float'
        },
        {
            name: 'old_id',
            type: 'int'
        },                                   

        // decorate releashions
         {
            name: '_location',
            type: 'string'
        }           
    ]
});
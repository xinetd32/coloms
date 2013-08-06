Ext.define('coloMS.store.inventory.OrderItems', {
    extend: 'Ext.data.Store',
    alias: 'store.inventory.orderItems',

    requires: [
        'coloMS.model.inventory.OrderItem'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'coloMS.model.inventory.OrderItem',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'OrderItems',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                    //root: 'rows'
                }
            }
        }, cfg)]);
    }
});
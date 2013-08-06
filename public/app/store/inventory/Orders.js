Ext.define('coloMS.store.inventory.Orders', {
    extend: 'Ext.data.Store',
    alias: 'store.inventory.orders',

    requires: [
        'coloMS.model.inventory.Order'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'coloMS.model.inventory.Order',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'Orders',
            proxy: {
                type: 'rest',
                url: '/inventory/orders',
                format: 'json',
                reader: {
                    type: 'json',
                    root: 'rows'
                }
            }
        }, cfg)]);
    }
});
Ext.define('coloMS.store.inventory.OrderStatuses', {
    extend: 'Ext.data.Store',
    alias: 'store.inventory.orderStatuses',

    requires: [
        'coloMS.model.inventory.OrderStatus'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'coloMS.model.inventory.OrderStatus',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'inventory.OrderStatuses',
            proxy: {
                type: 'rest',
                url: '/inventory/get_order_status',
                format: 'json',
                reader: {
                    type: 'json',
                    root: 'rows'
                }
            }
        }, cfg)]);
    }
});
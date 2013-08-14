Ext.define('coloMS.store.inventory.ItemStatuses', {
    extend: 'Ext.data.Store',
    alias: 'store.inventory.itemStatuses',

    requires: [
        'coloMS.model.inventory.ItemStatus'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'coloMS.model.inventory.ItemStatus',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'inventory.ItemStatuses',
            proxy: {
                type: 'rest',
                url: '/inventory/get_item_statuses',
                format: 'json',
                reader: {
                    type: 'json',
                    root: 'rows'
                }
            }
        }, cfg)]);
    }
});
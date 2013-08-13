Ext.define('coloMS.store.inventory.Items', {
    extend: 'Ext.data.Store',
    alias: 'store.inventory.items',

    requires: [
        'coloMS.model.inventory.Item'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'coloMS.model.inventory.Item',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'inventory.Items',
            proxy: {
                type: 'rest',
                url: '/inventory/items',
                format: 'json',
                reader: {
                    type: 'json',
                    root: 'rows'
                }
            }
        }, cfg)]);
    }
});
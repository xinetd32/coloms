Ext.define('coloMS.store.inventory.Distributors', {
    extend: 'Ext.data.Store',
    alias: 'store.inventory.distributors',

    requires: [
        'coloMS.model.inventory.Distributor'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'coloMS.model.inventory.Distributor',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'Distributors',
            proxy: {
                type: 'rest',
                url: '/inventory/distributors',
                format: 'json',
                reader: {
                    type: 'json',
                    root: 'rows'
                }
            }
        }, cfg)]);
    }
});
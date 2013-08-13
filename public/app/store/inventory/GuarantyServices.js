Ext.define('coloMS.store.inventory.GuarantyServices', {
    extend: 'Ext.data.Store',
    alias: 'store.inventory.guarantyServices',

    requires: [
        'coloMS.model.inventory.GuarantyService'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'coloMS.model.inventory.GuarantyService',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'inventory.GuarantyServices',
            proxy: {
                type: 'rest',
                url: '/inventory/get_guaranty_services',
                format: 'json',
                reader: {
                    type: 'json',
                    root: 'rows'
                }
            }
        }, cfg)]);
    }
});
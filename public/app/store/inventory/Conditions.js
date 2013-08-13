Ext.define('coloMS.store.inventory.Conditions', {
    extend: 'Ext.data.Store',
    alias: 'store.inventory.conditions',

    requires: [
        'coloMS.model.inventory.Condition'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'coloMS.model.inventory.Condition',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'inventory.Conditions',
            proxy: {
                type: 'ajax',
                url: '/inventory/get_conditions',
                format: 'json',
                reader: {
                    type: 'json',
                    root: 'rows'
                }
            }
        }, cfg)]);
    }
});
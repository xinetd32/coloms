Ext.define('coloMS.store.inventory.Equipments', {
    extend: 'Ext.data.Store',
    alias: 'store.inventory.equipments',

    requires: [
        'coloMS.model.inventory.Equipment'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'coloMS.model.inventory.Equipment',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'inventory.Equipments',
            proxy: {
                type: 'rest',
                url: '/inventory/equipments',
                format: 'json',
                reader: {
                    type: 'json',
                    root: 'rows'
                }
            }
        }, cfg)]);
    }
});
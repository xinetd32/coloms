Ext.define('coloMS.store.Staff', {
    extend: 'Ext.data.Store',
    alias: 'store.staff',

    requires: [
        'coloMS.model.Staff'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'coloMS.model.Staff',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'Staff',
            proxy: {
                type: 'rest',
                url: '/users',
                format: 'json',
                reader: {
                    type: 'json',
                    root: 'rows'
                }
            }
        }, cfg)]);
    }
});
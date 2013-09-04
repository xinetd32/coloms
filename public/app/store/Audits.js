Ext.define('coloMS.store.Audits', {
    extend: 'Ext.data.Store',
    alias: 'store.logs',

    requires: [
        'coloMS.model.Audit'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'coloMS.model.Audit',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'Logs',
            autoLoad: true,
            sorters: [{
                    property: 'created_at',
                    direction: 'DESC' // or 'ASC'
            }],            
            proxy: {
                type: 'ajax',
                url: '/logs',
                format: 'json',
                reader: {
                    type: 'json',
                    root: 'rows'
                }
            }
        }, cfg)]);
    }
});
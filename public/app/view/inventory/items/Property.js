Ext.define('coloMS.view.inventory.items.Property', {
    extend: 'Ext.grid.property.Grid',
    alias: 'widget.itemsProperty',
    title: 'Item properties',


    source: {},    

    initComponent: function() {
        var me = this;

        me.tbar = [
            'Search',
            {
                xtype: 'textfield',
                name: 'searchField',
                hideLabel: true,
                width: 200
            }
        ],

        me.callParent(arguments);


    }

});

Ext.define('coloMS.view.inventory.orders.edit.OrderItemsProperty', {
    extend: 'Ext.grid.property.Grid',
    alias: 'widget.orderItemsProperty',
    title: 'OrderItem properties',


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

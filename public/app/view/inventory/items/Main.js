Ext.define('coloMS.view.inventory.items.Main', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.itemsMain',
    
    requires: [
        'coloMS.view.inventory.items.List',
        'coloMS.view.inventory.items.Property'
    ],  
    frame: true,
    bodyPadding: 5,
    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'side'
    },

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'itemsList',
            flex: .7
        },
        {
            xtype: 'itemsProperty',
            flex: .3
        }
    ]
});
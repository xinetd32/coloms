Ext.define('coloMS.view.inventory.equipments.Main', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.equipmentsMain',
    
    requires: [
        'coloMS.view.inventory.equipments.List',
        'coloMS.view.inventory.items.List'
    ],  
    frame: true,
    bodyPadding: 5,
    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'side'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'equipmentsList',
            flex: .6
        },
        {
            xtype: 'equipmentsItemsList',
            flex: .4
        }
    ]
})
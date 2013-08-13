Ext.define('coloMS.view.inventory.items.Property', {
    extend: 'Ext.grid.property.Grid',
    alias: 'widget.itemsProperty',
    title: 'Item properties',


    source: {},
    requires: [
        'coloMS.store.inventory.GuarantyServices',
        'coloMS.store.inventory.Conditions'
    ],
    
    customEditors: {
        'guaranty_service': Ext.create('Ext.form.ComboBox', {                       
                        store: Ext.create('coloMS.store.inventory.GuarantyServices'), 
                        displayField: 'name',
                        valueField: 'name'
                    }),
        'condition': Ext.create('Ext.form.ComboBox', {                       
                        store: Ext.create('coloMS.store.inventory.Conditions'), 
                        displayField: 'name',
                        valueField: 'name'
                    }),                    
         'guaranty': Ext.create('Ext.form.field.Number' , {
              minValue: 0
         })           
    },                    

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

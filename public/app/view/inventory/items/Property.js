Ext.define('coloMS.view.inventory.items.Property', {
    extend: 'Ext.grid.property.Grid',
    alias: 'widget.itemsProperty',
    title: 'Item properties',


    source: {},
    
    customEditors: {
        'guaranty_service': Ext.create('Ext.form.ComboBox', {                       
                        store: {
                                    type: 'inventory.guarantyServices'
                                }, 
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

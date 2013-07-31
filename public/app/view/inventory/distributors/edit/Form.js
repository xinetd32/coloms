Ext.define('coloMS.view.inventory.distributors.edit.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.distributorsEditForm',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.layout.container.Form'
    ],
    
    layout: 'form',
    defaults: {
        labelAlign: 'right',
        margins: '0 10 0 10'
    },
    width: 400,
    bodyPadding: 10,
    frame: true,  

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: 'Name'
                },
                {
                    xtype: 'textfield',
                    name: 'address',
                    fieldLabel: 'Address'
                },
                {
                    xtype: 'textfield',
                    name: 'phone',
                    fieldLabel: 'Phone'
                },
                {
                    xtype: 'textfield',
                    name: 'email',
                    fieldLabel: 'Email'
                },                                                
                {
                    xtype: 'textarea',
                    name: 'description',
                    fieldLabel: 'Description',
                    height: 150,
                    grow: true,
                },
                
            ],
        });

        me.callParent(arguments);
    }

});
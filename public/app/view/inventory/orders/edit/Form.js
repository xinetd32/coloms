Ext.define('coloMS.view.inventory.orders.edit.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.orderEditForm',

    requires: [
        'Ext.form.FieldContainer',
        'coloMS.ux.form.field.RemoteComboBox',
        'coloMS.ux.form.field.plugin.ClearTrigger',
        'Ext.layout.container.Form',
    ],
    
    layout: 'form',
    fieldDefaults: {
        flex: 1,
        margins: 5
    },    
    defaults: {
        labelAlign: 'right',
        margins: '0 10 0 10'
    },
    width: 900,
    bodyPadding: 10,
    frame: true,  

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    margins: '0 10 0 10',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Order',
                            columnWidth: 0.5,
                            defaults: {anchor: '100%'},
                            layout: 'anchor', 
                            items: [
                                {
                                    xtype: 'ux.form.field.remotecombobox',
                                    name: 'distributor_id',
                                    fieldLabel: 'Distributor',
                                    displayField: 'name',
                                    valueField: 'id',
                                    store: {
                                        type: 'inventory.distributors'
                                    },
                                    plugins: [
                                        {
                                            ptype: 'cleartrigger'
                                        }
                                    ],
                                    editable: false,
                                    forceSelection: true
                                    //tpl: '<tpl for="."><div class="x-combo-list-item" ><b>{name}</b> - [{description}]</div></tpl>',
                                },
                                {
                                    xtype: 'textarea',
                                    name: 'description',
                                    fieldLabel: 'Description',
                                    height: 30,
                                    grow: true,
                                },                                
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Distributor Parameters',
                            columnWidth: 0.5, 
                            defaults: {anchor: '100%'},
                            layout: 'anchor',                            
                            items: [

                                {
                                    xtype: 'textfield',
                                    name: 'dis_offer',
                                    fieldLabel: 'Dis Offer'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'dis_order',
                                    fieldLabel: 'Dis Order'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'dis_invoce',
                                    fieldLabel: 'Dis Invoice'
                                }                            
                            ]
                        }
                    ]
                },
            
                {
                    xtype: 'ordersModelsList',
                    store: Ext.create('coloMS.store.inventory.Models',{
                        pageSize: 30
                    }),
                    height: 250,
                    title: 'Models'
                },
                {
                    xtype: 'orderItemsList',
                    height: 250,
                    title: 'Order Items',
                    store: Ext.create('coloMS.store.inventory.OrderItems',{
                        //pageSize: 30
                    }), 
                }
            ],
        });

        me.callParent(arguments);
    }
});
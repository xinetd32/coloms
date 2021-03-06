Ext.define('coloMS.view.inventory.orders.edit.OrderItemsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.orderItemsList',

    store: 'inventory.OrderItems',
    
    requires: [
        'coloMS.ux.form.field.plugin.ClearTrigger',
        'Ext.toolbar.Spacer',
        'Ext.grid.column.Action'
    ],
    

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
            
                        {
                            xtype: 'gridcolumn',
                            dataIndex: '_vendors__name',
                            text: 'Vendor',
                            flex: 0.5,
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: '_product_types__name',
                            text: 'Type',
                            flex: 0.5,
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: 'Name',
                            flex: 1
                        },
                        /*
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'condition',
                            text: 'Condition',
                            editor: {
                                xtype: 'combobox',
                                displayField: 'name',
                                valueField: 'name',
                                store: {
                                    type: 'inventory.conditions'
                                },
                                editable: false,
                                forceSelection: true
                             }  
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'guaranty',
                            text: 'Guaranty time',
                            flex: 0.5,
                            editor: {
                                xtype: 'numberfield',
                                minValue: 0
                            }                            
                        },
                        {
                            
                            xtype: 'gridcolumn',
                            dataIndex: 'guaranty_service',
                            text: 'Guaranty_service',
                            flex: 0.5,
                            editor: {
                                xtype: 'combobox',
                                displayField: 'name',
                                valueField: 'name',
                                triggerAction: 'all',
                                store: Ext.create('coloMS.store.inventory.GuarantyServices'), 
                                editable: false,
                                forceSelection: true                                                               
                            }
                        }, 
                        */                                               
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'quantity',
                            text: 'Quantity',
                            flex: 0.3,
                            summaryType: 'count',
                            editor: {
                                xtype: 'numberfield',
                                minValue: 1
                            }                            
                        },
                        /*
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'status',
                            text: 'Status',
                          //  flex: 0.3           
                        },
                        */ 
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'price',
                            text: 'Price',
                            flex: 0.3,
                            editor: {
                                xtype: 'numberfield',
                                minValue: 0,
                                decimalPrecision: 2
                            }                            
                        },  
                        {
                            xtype: 'actioncolumn',
                            width:50,
                            items: [
                                {
                                    tooltip: 'Delete',
                                    icon: 'resources/images/icons/delete.png',
                                    handler: function(grid, rowIndex, colIndex) {
                                        Ext.Msg.confirm( 'Attention', 'Are you sure you want to delete this Item?', function( buttonId, text, opt ) {
                                            if( buttonId=='yes' ) {
                                                grid.getStore().remove(grid.getStore().getAt(rowIndex));
                                            }
                                        });                                      
                                        
                                    }                                    
                                }
                            ]  
                        }           
            ],
            /*
            plugins: coloMS.LoggedInUser.inRole('admin') ? [
                Ext.create('Ext.grid.plugin.RowEditing', {
                    pluginId: 'orderRowEdit'
                })
            ] : []            
          */
        });

        me.callParent(arguments);
    },
});
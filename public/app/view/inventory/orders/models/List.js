Ext.define('coloMS.view.inventory.orders.models.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ordersModelsList',

    store: 'inventory.Models',
    iconCls: 'silk-key',
    
    requires: [
        'coloMS.ux.form.field.plugin.ClearTrigger',
        'Ext.toolbar.Spacer'
    ],
    

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: '_vendors__name',
                    text: 'Vendor',
                    flex: 1,
                    filter: {
                        type: 'string',
                        sqlField: 'vendors.name'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: '_product_types__name',
                    text: 'Type',
                    flex: 0.5,
                    filter: {
                        type: 'string',
                        sqlField: 'product_types.name'
                    }                    
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: 'Name',
                    flex: 1,
                    filter: {
                        type: 'string',
                        sqlField: 'models.name'
                    }                    
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'description',
                    text: 'Description',
                    flex: 1, 
                    filter: {
                        type: 'string',
                        sqlField: 'models.description'
                    }                    
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'search',
                            fieldLabel: 'Search',
                            labelAlign: 'right',
                            defaultAlign: 'tr-br?'                          
                        }                    
                    ]
                },    
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'pagingtoolbar',
                            ui: 'footer',
                            //width: 360,
                            defaultButtonUI: 'default',
                            store: me.getStore(),
                            displayInfo: true
                        },
                           '->',
                       {
                            text: 'Clear Filter Data',
                            dock: 'bottom',
                            handler: function () {
                                me.filters.clearFilters();
                                me.down('#search').setValue('');
                            } 
                        }                         
                    ]
                }
            ],
            features: [{
                ftype: 'filters'
            }]
        });

        me.callParent(arguments);
    },
});
Ext.define('coloMS.view.inventory.items.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.itemsList',

    requires: [
        'Ext.grid.plugin.RowEditing',
        'Ext.toolbar.Paging',
        'coloMS.store.inventory.Items'
    ],

    height: 250,
    width: 400,
    iconCls: 'silk-wrench',
    store: 'inventory.Items',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'id',
                    text: 'ID',
                    flex: 0.1,
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'vendor_name',
                    text: 'Vendor',
                    flex: 0.2,
                    filter: {
                        type: 'string',
                        sqlField: 'vendors.name'
                    }                        
                },                
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'product_type',
                    text: 'Type',
                    flex: 0.5,
                    filter: {
                        type: 'string',
                        sqlField: 'product__types.name'
                    }                       
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'model_name',
                    text: 'Model',
                    flex: 0.5,
                    filter: {
                        type: 'string',
                        sqlField: 'models.name'
                    }                       
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'status',
                    text: 'Status',
                    flex: 0.2,
                    filter: {
                        type: 'string',
                        sqlField: 'items.status'
                    }                   
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'location_id',
                    text: 'LocationID',
                    flex: 0.2,
                    filter: {
                        type: 'int',
                        sqlField: 'items.location_id'
                    }                   
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: '_location',
                    text: 'Location Name',
                    flex: 0.5,
                    filter: {
                        type: 'string',
                        sqlField: 'equipments.name'
                    }                   
                }                                                                      
            ],
           /*
            plugins: coloMS.LoggedInUser.inRole('admin') ? [
                Ext.create('Ext.grid.plugin.RowEditing', {

                })
            ] : [],
           */ 
            features: [{
                ftype: 'filters'
            }],            
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'tbspacer'
                        },
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
            ]        
        });

        me.callParent(arguments);
    }

});
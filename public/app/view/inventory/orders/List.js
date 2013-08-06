Ext.define('coloMS.view.inventory.orders.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.orderList',

    height: 250,
    width: 400,
    title: 'Manage Orders',
    store: 'inventory.Orders',
    iconCls: 'silk-cart',
    
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
                    dataIndex: 'id',
                    text: 'OrderID',
                    flex: 0.5,
                    filter: {
                        type: 'string',
                        sqlField: 'orders.id'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: 'Name',
                    flex: 0.5,
                    filter: {
                        type: 'string',
                        sqlField: 'orders.name'
                    }                    
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'created_at',
                    text: 'Create date',
                    flex: 1,
                    filter: {
                        type: 'date',
                        sqlField: 'orders.created_at'
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
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'user_id',
                    text: 'UserID',
                    flex: 0.5, 
                    filter: {
                        type: 'int',
                        sqlField: 'user.id'
                    }                                       
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    
                    loader: {
                        url: 'get_controls',
                        renderer: 'component',
                        autoLoad: true,
                        params: {
                            item: me.$className
                        }                        
                    }
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
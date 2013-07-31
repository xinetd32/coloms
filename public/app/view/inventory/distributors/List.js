
Ext.define('coloMS.view.inventory.distributors.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.distributorsList',

    height: 250,
    width: 400,
    title: 'Manage Distributors',
    store: 'inventory.Distributors',
    iconCls: 'silk-lorry',
    
    requires: [
        'Ext.toolbar.Spacer'
    ],
    

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: 'Name',
                    flex: 1,
                    filter: {
                        type: 'string',
                        sqlField: 'distributors.name'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'phone',
                    text: 'Phone',
                    flex: 0.5,
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'address',
                    text: 'Address',
                    flex: 1,  
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'email',
                    text: 'Email',
                    flex: 0.5, 
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'description',
                    text: 'Description',
                    flex: 1, 
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
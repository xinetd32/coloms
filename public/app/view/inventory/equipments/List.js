Ext.define('coloMS.view.inventory.equipments.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.equipmentsList',

    requires: [
        'Ext.grid.plugin.RowEditing',
        'Ext.toolbar.Paging',
        'coloMS.store.inventory.Equipments'
    ],

    height: 250,
    width: 400,
    
    store: 'inventory.Equipments',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: 'Name',
                    flex: 0.2,
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'description',
                    text: 'Descripton',
                    flex: 0.5,
                    editor: {
                        xtype: 'textfield'
                    }
                }
            ],
            plugins: coloMS.LoggedInUser.inRole('admin') ? [
                Ext.create('Ext.grid.plugin.RowEditing', {

                })
            ] : [],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'add',
                            iconCls: 'silk-add',
                            hidden: !coloMS.LoggedInUser.inRole('admin'),
                            text: 'Add'
                        },
                        { 
                            xtype: 'tbseparator' 
                        },
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
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    defaultButtonUI: 'default',
                    displayInfo: true,
                    store: me.getStore()
                }
            ]
        });

        me.callParent(arguments);
    }

});
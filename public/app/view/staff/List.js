/**
 * Grid for displaying Staff details
 */
Ext.define('coloMS.view.staff.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.staff.list',
    requires: [
        'Ext.grid.column.Boolean',
        'Ext.grid.column.Date'
    ],
    title: 'Manage Users',
    iconCls: 'silk-group',
    store: 'Staff',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            columns: {
                defaults: {},
                items: [
                    {
                        text: 'Name',
                        dataIndex: 'last_name',
                        renderer: function( value, metaData, record, rowIndex, colIndex, store, view ) {
                            return value + ' ' + record.get( 'first_name' )
                        },
                        width: 200
                    },
                    {
                        text: 'Email',
                        dataIndex: 'email',
                        width: 150
                        //align: 'right'
                    },                    
                    {
                        text: 'Phone',
                        dataIndex: 'phone'
                    },
                   {
                        xtype: 'datecolumn',
                        text: 'Last login',
                        dataIndex: 'last_login',
                        //ormat: 'd-m-Y'
                    },
                    {
                        text: 'Roles',
                        dataIndex: 'roles'
                    },                    
                ]
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'add',
                            iconCls: 'silk-add',
                            text: 'Add User'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    ui: 'footer',
                    defaultButtonUI: 'default',
                    dock: 'bottom',
                    displayInfo: true,
                    store: me.getStore()
                }
            ]
        });
        me.callParent( arguments );
    }
});
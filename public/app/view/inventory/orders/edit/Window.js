Ext.define('coloMS.view.inventory.orders.edit.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.orderEditWindow',

    requires: [
        'coloMS.view.inventory.orders.edit.Form'
    ],

    width: 1200,
    height: 940,
    layout: {
        type: 'fit'
    },
    constrainHeader: true,
    modal: true,
    editable: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'orderEditForm'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Cancel',
                            itemId: 'cancel',
                            iconCls: 'silk-cancel'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            text: 'Save',
                            itemId: 'save',
                            hidden: !coloMS.LoggedInUser.inRole('admin'),
                            iconCls: 'silk-accept'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});
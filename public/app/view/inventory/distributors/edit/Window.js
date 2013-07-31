
Ext.define('coloMS.view.inventory.distributors.edit.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.distributorsEditWindow',

    requires: [
        'coloMS.view.inventory.distributors.edit.Form'
    ],

    width: 600,
    layout: {
        type: 'fit'
    },
    constrainHeader: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'distributorsEditForm'
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
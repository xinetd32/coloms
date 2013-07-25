Ext.define('coloMS.view.staff.edit.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.staff.edit.window',
    requires: [
        'coloMS.view.staff.edit.Form'
    ],
    iconCls: 'silk-group',
    width: 500,
    modal: true,
    resizable: true,
    draggable: true,
    constrainHeader: true,
    layout: 'fit',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'staff.edit.form'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'cancel',
                            text: 'Cancel',
                            iconCls: 'silk-cancel'
                        },
                        '->',
                        {
                            xtype: 'button',
                            itemId: 'save',
                            text: 'Save',
                            iconCls: 'silk-accept'
                        }
                    ]
                }
            ]
        });
        me.callParent( arguments );
    }
});
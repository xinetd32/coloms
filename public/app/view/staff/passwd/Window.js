Ext.define('coloMS.view.staff.passwd.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.staff.passwd.window',
    requires: [
        'coloMS.view.staff.passwd.Form'
    ],
    iconCls: 'silk-lock',
    title: 'Set password',
    width: 200,
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
                    xtype: 'staff.passwd.form'
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
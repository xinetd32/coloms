/*
 * File: app/view/inventory/model/edit/Window.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('coloMS.view.inventory.model.edit.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.modelEditWindow',

    requires: [
        'coloMS.view.inventory.model.edit.Form'
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
                    xtype: 'modelEditForm'
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
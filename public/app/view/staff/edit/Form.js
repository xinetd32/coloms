Ext.define('coloMS.view.staff.edit.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.staff.edit.form',
    requires: [
        'Ext.form.FieldContainer',
        'Ext.form.field.Date',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Ext.form.FieldSet',
        'Ext.ux.form.ItemSelector',
        'coloMS.ux.form.field.RemoteComboBox'
    ],
    bodyPadding: 5,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            fieldDefaults: {
                allowBlank: false,
                labelAlign: 'top',
                flex: 1,
                margins: 5
            },
            defaults: {
                layout: 'hbox',
                margins: '0 10 0 10'                
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'first_name',
                            fieldLabel: 'First Name'
                        },
                        {
                            xtype: 'textfield',
                            name: 'last_name',
                            fieldLabel: 'Last Name'
                        }

                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'email',
                            fieldLabel: 'Email'
                        },
                        {
                            xtype: 'textfield',
                            name: 'phone',
                            fieldLabel: 'Phone'
                        }                        
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'dob',
                            fieldLabel: 'DOB',
                            format:'d/m/Y'
                        },

/*
                        {
                            xtype: 'ux.form.field.remotecombobox',
                            name: 'Position',
                            fieldLabel: 'Position',
                            displayField: 'LongName',
                            valueField: 'PositionID',
                            store: {
                                type: 'option.position'
                            },
                            editable: false,
                            forceSelection: true
                        },
*/                        
                        {
                            xtype: 'datefield',
                            name: 'created_at',
                            editable: false,
                            fieldLabel: 'Add Date',
                            disabled: true,
                            format:'d/m/Y'
                            
                        },
                        {
                            xtype: 'datefield',
                            name: 'last_login',
                            editable: false,
                            disabled: true,
                            fieldLabel: 'Last login',
                            format:'d/m/Y'
                            
                        }                        
                    ]
                },
 
                {
                    xtype: 'fieldset',
                    title: 'Admin Roles',
                    items: [
                        {
                            xtype: 'itemselectorfield',
                            name: 'roles',
                            anchor: '100%',
                            store: {
                                type: 'options.roles'
                            },
                            displayField: 'name',
                            valueField: 'name',
                            allowBlank: false,
                            msgTarget: 'side',
                            fromTitle: 'Available Roles',
                            toTitle: 'Selected Roles',
                            buttons: [ 'add', 'remove' ],
                            delimiter: null
                        }
                    ]
                }
                
            ]
        });
        me.callParent( arguments );
    }
});
Ext.define('coloMS.view.staff.passwd.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.staff.passwd.form',
    requires: [
        'Ext.form.FieldContainer',
        'Ext.form.field.Text',
        'Ext.form.FieldSet',
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
                layout: 'vbox',
                margins: '0 10 0 10'                
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'password',
                            minLength : 6,
                            maxLength : 32,
                            msgTarget : 'side',
                            minLengthText : 'Password must be at least 6 characters long.',
                            value   : '',
                            inputType : 'password',                                                       
                            fieldLabel: 'Password'
                        },
                        {
                            xtype: 'textfield',
                            name: 'confirm_password',
                            minLength : 6,
                            maxLength : 32,
                            msgTarget : 'side',
                            minLengthText : 'Password must be at least 6 characters long.',
                            value   : '',
                            inputType : 'password',                                                       
                            fieldLabel: 'Confirm password',
                            validator: function(value) {
                                if (value != me.down('textfield[name=password]').getValue()) {
                                  return 'Confirm Password not equal Password';
                                }
                                return true;                                 
                            }
                        }
                    ]
                }
            ]
        });
        me.callParent( arguments );
    }
});
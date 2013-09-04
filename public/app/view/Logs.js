
Ext.define('coloMS.view.Logs', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.logs',
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'created_at',
                    text: 'Date',
                    flex: 0.7,
                    filter: {
                        type: 'date',
                        sqlField: 'audits.created_at'
                    }                    
                },            
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'auditable_id',
                    text: 'ComponetnId',
                    flex: 0.3,
                    filter: {
                        type: 'int',
                        sqlField: 'audits.auditable_id'
                    }                    
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'auditable_type',
                    text: 'Componetn Type',
                    flex: 0.5,
                    filter: {
                        type: 'string',
                        sqlField: 'audits.auditable_type'
                    }                    
                },                
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'action',
                    text: 'Action',
                    flex: 0.5,
                    filter: {
                        type: 'string',
                        sqlField: 'audits.action'
                    }                    
                },                
                 {
                    xtype: 'gridcolumn',
                    dataIndex: 'audited_changes',
                    text: 'Changes',
                    flex: 1.5,
                    filter: {
                        type: 'string',
                        sqlField: 'audits.audited_changes'
                    }                    
                },                               
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'user_email',
                    text: 'User',
                    flex: 0.5,
                    filter: {
                        type: 'string',
                        sqlField: 'users.email'
                    }  
                }
            ],
            features: [{
                ftype: 'filters'
            }],    
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    ui: 'footer',
                    items: [
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
                }
            ]
        });

        me.callParent(arguments);
    }

});
Ext.define('coloMS.model.Audit', {
    extend: 'coloMS.model.Base',
    
    fields: [
        {
            name: 'auditable_id',
            type: 'int'
        },
        {
            name: 'auditable_type',
            type: 'string'
        },
        {
            name: 'action',
            type: 'string'
        },
        {
            name: 'audited_changes',
            type: 'string'
        },
        {
            name: 'user_email',
            type: 'string'
        }
    ]
});    
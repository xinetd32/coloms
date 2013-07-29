Ext.define('coloMS.model.security.User', {
    extend: 'coloMS.model.Staff',

    inRole: function( role ) {
        var me = this,
            a_roles = me.get('roles').split(",");
        return Ext.Array.contains(a_roles, role);
    }     
});

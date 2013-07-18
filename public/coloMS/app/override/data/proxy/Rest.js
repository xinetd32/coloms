Ext.define('coloMS.override.data.proxy.Rest', {
    override: 'Ext.data.proxy.Rest',

    afterRequest: function(request, success) {
        var me = this;
        // fire requestcomplete event
        me.fireEvent( 'requestcomplete', request, success );
    }    
});
/*
 * File: app.js
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

//@require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});

Ext.application({

    requires: [
        'Ext.util.History',
        'Ext.util.Point',
        'Ext.ux.grid.FiltersFeature',
        'Ext.data.proxy.Rest',
        'coloMS.domain.Proxy',
        'overrides.grid.RowEditor',
        'overrides.data.proxy.Rest',
        'overrides.ux.grid.FiltersFeature'
    ],
    views: [
        'Dashboard'
    ],
    autoCreateViewport: true,
    controllers: [
        'App',
        'Inventory',
        'Models',
        'Staff',
        'Options',
        'Distributors',
        'Orders',
        'Items',
        'Equipments'
    ],
    name: 'coloMS',

    launch: function() {
        // "this" = Ext.app.Application
        var me = this;
        setTimeout(function(){
            Ext.get('loading').remove();
            Ext.get('loading-mask').fadeOut({remove:true});
        }, 250);          
        // init Ext.util.History on app launch; if there is a hash in the url,
        // our controller will load the appropriate content
        Ext.util.History.init(function(){
            var hash = document.location.hash;
            me.getAppController().fireEvent( 'tokenchange', hash.replace( '#', '' ) );
        })
        // add change handler for Ext.util.History; when a change in the token
        // occurs, this will fire our controller's event to load the appropriate content
        Ext.util.History.on( 'change', function( token ){
            me.getAppController().fireEvent( 'tokenchange', token );
        });
        Ext.Ajax.extraParams = {
            authenticity_token: Ext.query('meta[name="csrf-token"]')[0].content 
        };
    }

});

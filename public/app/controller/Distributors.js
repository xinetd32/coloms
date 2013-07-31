Ext.define('coloMS.controller.Distributors', {
    extend: 'coloMS.controller.Base',

    requires: [
        'coloMS.view.inventory.distributors.edit.Form',
        'coloMS.view.inventory.distributors.edit.Window',
        'coloMS.view.inventory.distributors.List',
        'coloMS.store.inventory.Distributors'
    ],

    refs: [
        {
            ref: 'DistributorsList',
            selector: '[xtype=distributorsList]'
        },
        {
            ref: 'DistributorsEditWindow',
            selector: '[xtype=distributorsEditWindow]'
        },
        {
            ref: 'DistributorsEditForm',
            selector: '[xtype=distributorsEditForm]'
        },
    ],
    views: [
        'inventory.distributors.edit.Form',
        'inventory.distributors.edit.Window',
        'inventory.distributors.List'
    ],
    store: [
        'inventory.Distributors'
    ],

    init: function() {
        this.listen({
            controller: {},
            component: {
                'grid[xtype=distributorsList]': {
                    beforerender: this.loadRecords,
                    itemdblclick: this.edit,
                    itemcontextmenu: this.showContextMenu
                },
                'grid[xtype=distributorsList] button#add': {
                    click: this.add
                },
                'window[xtype=distributorsEditWindow] button#save': {
                    click: this.save
                },
                'window[xtype=distributorsEditWindow] button#cancel': {
                    click: this.close
                },
                'grid[xtype=distributorsList] textfield#search': {
                    change: { 
                      fn: this.onChangeSearchField,
                      scope: this,
                      buffer: 500
                    }  
                },
                'menu#context-destributors menuitem': {
                    click: this.onClickContextMenu
                }     
            },
            global: {},
            store: {},
            proxy: {} 
        });
    },
    
    onClickContextMenu: function(item, e, eOpts) {
        var me = this,
            token = item.itemId,
            grid = me.getDistributorsList(),
            record = grid.getSelectionModel().getSelection()[0];
            switch( token ) {
                case 'edit':
                    me.edit( null, record, null, null, null, null );  
                break;
                case 'delete':
                    me.remove( record );  
                break;
            }                                          
    },
    
    showContextMenu: function(view, record, item, index, e, eOpts) {
        var me = this;
        // stop event so browser's normal right-click action doesn't continue
        e.stopEvent();
        
        // if a menu doesn't already exist, create one
        if( !item.contextMenu ) {
            // add menu
            item.contextMenu = new Ext.menu.Menu({
                itemId: 'context-destributors',
                loader: {
                    url: 'get_controls',
                    renderer: 'component',
                        autoLoad: true,
                        params: {
                            item: me.$className
                    }                        
                }              
            })
        }
        // show menu relative to item which was right-clicked
       // item.contextMenu.showBy( item );
        item.contextMenu.showAt(e.getXY());
    },

    loadRecords: function(grid, eOpts) {
        var me = this,
            store = grid.getStore();
        // clear any fliters that have been applied
        store.clearFilter( true );
        // load the store
        store.load();
    },

    edit: function(view, record, item, index, e, eOpts) {
        var me = this;
        // show window
        //me.showEditWindow( record );
        me.loadDetail( record, me, me.showEditWindow );
    },

    add: function(button, e, eOpts) {
        var me = this,
            record = Ext.create( 'coloMS.model.inventory.Distributor' );
        // show window
        me.showEditWindow( record );
    },

    save: function(button, e, eOpts) {
        var me = this,
            grid = me.getDistributorsList(),
            store = grid.getStore(),
            win = button.up( 'window' ),
            form = win.down( 'form' ),
            record = form.getRecord(),
            values = form.getValues(),
            callbacks;

        // set values of record from form
        record.set( values );
        // check if form is even dirty...if not, just close window and stop everything...nothing to see here
        if( !record.dirty ) {
            win.close();
            return;
        }
        // setup generic callback config for create/save methods
        callbacks ={
            success: function( records, operation ) {
                win.close();
                me.getDistributorsList().getStore().reload();
            },
            failure: function( records, operation ) {
                // if failure, reject changes in store
                store.rejectChanges();
            }
        };
        // mask to prevent extra submits
        Ext.getBody().mask( 'Saving Distributor...' );
        // if new record...
        if( record.phantom ) {
            // reject any other changes
            store.rejectChanges();
            // add the new record
            store.add( record );
        }
        // persist the record
        store.sync( callbacks );
    },

    close: function(button, e, eOpts) {
        var me = this,
            win = button.up( 'window' );
        // close the window
        win.close();

    },

    remove: function(record) {
        var me = this,
            store = record.store;
        // show confirmation before continuing
        Ext.Msg.confirm( 'Attention', 'Are you sure you want to delete this Distributor? This action cannot be undone.', function( buttonId, text, opt ) {
            if( buttonId=='yes' ) {
                store.remove( record );
                store.sync({
                    /**
                    * On failure, add record back to store at correct index
                    * @param {Ext.data.Model[]} records
                    * @param {Ext.data.Operation} operation
                    */
                    failure: function( records, operation ) {
                        store.rejectChanges();
                    }
                })
            }
        })
    },
    

    showEditWindow: function(record) {
        var me = this,
            win = me.getDistributorsEditWindow(),
            isNew = record.phantom;
        // if window exists, show it; otherwise, create new instance
        if( !win ) {
            win = Ext.widget( 'distributorsEditWindow', {
                title: isNew ? 'Add Distributor' : 'Edit Distributor'
            });
        }
        // show window
        win.show();
        // load form with data
        win.down( 'form' ).loadRecord( record );
    }
});
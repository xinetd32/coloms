Ext.define('coloMS.controller.Equipments', {
    extend: 'coloMS.controller.Base',

    views: [
        'coloMS.view.inventory.equipments.Main',
        'inventory.equipments.List',
        'coloMS.view.inventory.equipments.ItemsList'
    ],
    stores: [
        'inventory.Equipments',
        'inventory.Items'
    ],
    refs: [
        {
            ref: 'EquipmentsList',
            selector: '[xtype=equipmentsList]'
        },
        {
            ref: 'EquipmentsItemsList',
            selector: '[xtype=equipmentsItemsList]'
        }
    ],

    init: function() {
        this.listen({
            controller: {},
            component: {
                'grid[xtype=equipmentsList]': {
                    edit: this.save,
                    canceledit: this.cancel,
                    beforerender: this.loadRecords,
                    itemcontextmenu: this.showContextMenu,
                    itemclick: this.onItemClick
                },
                'grid[xtype=equipmentsList] button#add': {
                    click: this.add
                },
                'grid[xtype=equipmentsList] gridview': {
                    itemadd: this.edit
                },
                'grid[xtype=equipmentsList] textfield#search': {
                    change: { 
                      fn: this.onChangeSearchField,
                      scope: this,
                      buffer: 500
                    }  
                },                
            },
            global: {},
            store: {}
        });
    },

    showContextMenu: function(view, record, item, index, e, eOpts) {
        if (!coloMS.LoggedInUser.inRole('admin')) return;
      
        var me = this;
        // stop event so browser's normal right-click action doesn't continue
        e.stopEvent();
        // if a menu doesn't already exist, create one
        if( !item.contextMenu ) {
            // add menu
            item.contextMenu = new Ext.menu.Menu({
                items: [
                {
                    text: 'Edit Equipment',
                    iconCls: 'icon_edit',
                    handler: function( item, e ) {
                        var grid = me.getEquipmentsList(),
                            plugin = grid.editingPlugin;
                        // start row edit
                        plugin.startEdit( record, 0 );
                    }
                },
                {
                    text: 'Delete Equipments',
                    iconCls: 'icon_delete',
                    handler: function( item, e ) {
                        me.remove( record );
                    }
                }
                ]
            })
        }
        // show menu relative to item which was right-clicked
        //item.contextMenu.showBy( item );
        item.contextMenu.showAt(e.getXY());
    },
    
    onItemClick: function(grid, record, item, index, e, eOpts) {
        var me = this,
            itemsGrid = me.getEquipmentsItemsList(),
            itemsStore = itemsGrid.getStore();
        itemsStore.clearFilter(true);
        itemsStore.filter("location_id", record.getId());
        itemsStore.load(); 
    },  

    loadRecords: function(grid, eOpts) {
        var me = this,
            store = grid.getStore();
        // clear any fliters that have been applied
        store.clearFilter( true );
        // load the store
        store.load();
    },

    cancel: function(editor, context, eOpts) {
        // if the record is a phantom, remove from store and grid
        if( context.record.phantom ) {
            context.store.remove( context.record );
        }
    },

    edit: function(records, index, node, eOpts) {
        var me = this,
            grid = me.getEquipmentsList(),
            plugin = grid.editingPlugin;
        // start edit of row
        plugin.startEdit( records[ 0 ], 0 );
    },

    add: function(button, e, eOpts) {
        var me = this,
            grid = me.getEquipmentsList(),
            plugin = grid.editingPlugin,
            store = grid.getStore();
        // if we're already editing, don't allow new record insert
        if( plugin.editing ) {
            // show error message
            Ext.Msg.alert( 'Attention', 'Please finish editing before inserting a new record' );
            return false;
        }
        store.insert( 0, {} );
    },

    save: function(editor, context, eOpts) {
        var me = this,
            store = context.record.store;
        callbacks ={
            success: function( records, operation ) {
            },
            failure: function( records, operation ) {
                // if failure, reject changes in store
                store.rejectChanges();
            }
        };
        // save
        store.sync(callbacks);
    },

    remove: function(record) {
        var me = this,
            store = record.store;
        // show confirmation before continuing
        Ext.Msg.confirm( 'Attention', 'Are you sure you want to delete this equipment? This action cannot be undone.', function( buttonId, text, opt ) {
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
    }

});
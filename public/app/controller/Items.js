Ext.define('coloMS.controller.Items', {
    extend: 'coloMS.controller.Base',

    views: [
        'inventory.items.Main',
        'inventory.items.List',
        'inventory.items.Property'
    ],
    stores: [
        'inventory.Items'
    ],
    refs: [
        {
            ref: 'ItemsList',
            selector: '[xtype=itemsList]'
        },
        {
            ref: 'ItemsProperty',
            selector: '[xtype=itemsProperty]'
        },
        { ref: 'searchField', selector: 'itemsProperty textfield[name=searchField]' }
    ],

    init: function() {
        this.listen({
            controller: {},
            component: {
                'grid[xtype=itemsList]': {
                    edit: this.save,
                    canceledit: this.cancel,
                    beforerender: this.loadRecords,
                    itemcontextmenu: this.showContextMenu,
                    itemclick: this.onItemClick
                },
                'grid[xtype=itemsList] textfield#search': {
                    change: { 
                      fn: this.onChangeSearchField,
                      scope: this,
                      buffer: 500
                    }  
                },
                'itemsProperty': {
                    propertychange: this.onPropertyChange,
                    beforeedit: this.onBeforeEditPropertyGrid
                },
                'itemsProperty textfield[name=searchField]': {
                    change: this.onChangeFilterField,
                    specialkey: this.onClearField
                }
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
                    text: 'Edit Item',
                    iconCls: 'icon_edit',
                    handler: function( item, e ) {
                        var grid = me.getItemsList(),
                            plugin = grid.editingPlugin;
                        // start row edit
                        plugin.startEdit( record, 0 );
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
        if (record) {
          // TODO: разобраться почему не отработала конструкция this.getDeviceProperty().setSource(record.data);;
            var dp = Ext.ComponentQuery.query('itemsProperty')[0];
            dp.setSource(record.getData());
        }
    },

    onPropertyChange: function(source, recordId, value, oldValue, eOpts) {
        // TODO неотрабатывает роуэдит после редактированифя проперти-грида при this.getDeviceList(). Второй случай с гетером
        //var store = this.getDeviceList().getStore();
        var store = Ext.ComponentQuery.query('itemsList')[0].getStore();
        var rec = store.findRecord("id", source.id);
        rec.set(recordId, value);
        rec.setDirty();
        store.sync();
    },

    onBeforeEditPropertyGrid: function(editor, e, eOpts) {
        var editableFields = ['guaranty_service', 'status', 'description', 'guaranty'];
        return Ext.Array.contains(editableFields, e.record.data.name);
    },

    onChangeFilterField: function(f, newValue, oldValue, eOpts) {
        var dp = Ext.ComponentQuery.query('itemsProperty')[0];
        var store = dp.getStore();
        store.filterBy(function (record) {
            if (record.internalId.search(newValue) == -1) {
                return false;
            } else {
                return true;
            }

        })
    },

    onClearField: function(f ,e) {
        if (e!=undefined) {
            var key = e.getKey();
            if (key == 27) {
                this.getSearchField().setValue('');
            }
        }
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
            grid = me.getItemsList(),
            plugin = grid.editingPlugin;
        // start edit of row
        plugin.startEdit( records[ 0 ], 0 );
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
    }

});
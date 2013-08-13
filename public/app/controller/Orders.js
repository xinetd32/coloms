Ext.define('coloMS.controller.Orders', {
    extend: 'coloMS.controller.Base',

    requires: [
        'coloMS.view.inventory.orders.edit.Form',
        'coloMS.view.inventory.orders.edit.Window',
        'coloMS.view.inventory.orders.List',
        'coloMS.store.inventory.Orders',
        'coloMS.view.inventory.orders.models.List',
        'coloMS.store.inventory.Models',
        'coloMS.store.inventory.Conditions',
        'coloMS.store.inventory.OrderItems',
        'coloMS.store.inventory.GuarantyServices',
        'coloMS.view.inventory.orders.edit.OrderItemsList'
    ],

    refs: [
        {
            ref: 'OrderList',
            selector: '[xtype=orderList]'
        },
        {
            ref: 'OrderEditWindow',
            selector: '[xtype=orderEditWindow]'
        },
        {
            ref: 'OrderEditForm',
            selector: '[xtype=orderEditForm]'
        },
        {
            ref: 'OrderItemsList',
            selector: '[xtype=orderItemsList]'
        }
    ],
    views: [
        'inventory.orders.edit.Form',
        'inventory.orders.edit.Window',
        'inventory.orders.List'
    ],
    store: [
        'inventory.Orders',
        'inventory.OrderItems',
        'inventory.Models',
        'inventory.Conditions',
        'inventory.OrderItems',
        'inventory.GuarantyServices'
    ],

    init: function() {
        this.listen({
            controller: {},
            component: {
                'grid[xtype=orderList]': {
                    beforerender: this.loadRecords,
                    itemdblclick: this.edit,
                    itemcontextmenu: this.showContextMenu
                },
                'grid[xtype=orderList] button#add': {
                    click: this.add
                },
                'window[xtype=orderEditWindow] button#save': {
                    click: this.save
                },
                'window[xtype=orderEditWindow] button#cancel': {
                    click: this.close
                },
                'grid[xtype=orderList] textfield#search': {
                    change: { 
                      fn: this.onChangeSearchField,
                      scope: this,
                      buffer: 500
                    }  
                },
                'menu#context menuitem': {
                    click: this.onClickContextMenu
                },
                'grid[xtype=ordersModelsList]': {
                    beforerender: this.loadRecords,
                    itemdblclick: this.addModelToOrderItems,
                },
                'grid[xtype=ordersModelsList] textfield#search': {
                    change: { 
                      fn: this.onChangeSearchField,
                      scope: this,
                      buffer: 500
                    }  
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
            grid = me.getOrderList(),
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
                itemId: 'context',
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
    
    addModelToOrderItems: function(view, record, item, index, e, eOpts) {
        var me = this
            grid = me.getOrderItemsList(),
            win = grid.up('window'),
            store = grid.getStore();
            var qirecord = Ext.create('coloMS.model.inventory.OrderItem', record.data);
            var findRecord = store.findRecord('id', qirecord.data.id);
        if (!win.editable) return;    
        if ( findRecord ) {
            var quantity = findRecord.get('quantity');
            quantity++;
            findRecord.set('quantity', quantity);
        } else {
            store.add(qirecord);
        }
 
    },

    add: function(button, e, eOpts) {
        var me = this,
            record = Ext.create( 'coloMS.model.inventory.Order' );
        // show window
        me.showEditWindow( record );
    },

    save: function(button, e, eOpts) {
        var me = this,
            grid = me.getOrderList(),
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
                var order_id = records.operations[0].records[0].data.id,
                    grid = me.getOrderItemsList(),
                    store = grid.getStore();
                store.each(function(rec) {
                    rec.set('order_id', order_id);
                });
                store.sync({
                    success: function( records, operation ) {
                       win.close();
                       me.getOrderList().getStore().reload(); 
                    },
                    failure: function( records, operation ) {
                        store.rejectChanges();
                    }    
                });
            },
            failure: function( records, operation ) {
                // if failure, reject changes in store
                store.rejectChanges();
            }
        };
        // mask to prevent extra submits
        Ext.getBody().mask( 'Saving Order...' );
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
        Ext.Msg.confirm( 'Attention', 'Are you sure you want to delete this Order? This action cannot be undone.', function( buttonId, text, opt ) {
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
            win = me.getOrderEditWindow(),
            isNew = record.phantom;
        // if window exists, show it; otherwise, create new instance
        if( !win ) {
            win = Ext.widget( 'orderEditWindow', {
                title: isNew ? 'Add Order' : 'Veiw Order',
                editable: isNew
            });
        }
        // show window
        win.show();
        // load form with data
        win.down( 'form' ).loadRecord( record );
        if(!isNew) {
            var grid = me.getOrderItemsList(),
                store = grid.getStore(),
                button = win.down('button#save');
            store.load({params: {order_id: record.data.id} });
            button.disable();
        }
    }
});
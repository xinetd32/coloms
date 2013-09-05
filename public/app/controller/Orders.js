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
        'coloMS.view.inventory.orders.edit.OrderItemsList',
        'coloMS.store.inventory.OrderStatuses',
        'coloMS.view.inventory.orders.edit.OrderItemsProperty'
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
        },
        {
            ref: 'OrdersModelList',
            selector: 'ordersModelsList'
        },
        {
            ref: 'OrderItemsProperty',
            selector: '[xtype=orderItemsProperty]'
        },
        { ref: 'searchFieldP', selector: 'orderItemsProperty textfield[name=searchField]' }
                
    ],
    views: [
        'inventory.orders.edit.Form',
        'inventory.orders.edit.Window',
        'inventory.orders.List',
        'inventory.orders.edit.OrderItemsProperty'
    ],
    store: [
        'inventory.Orders',
        'inventory.OrderItems',
        'inventory.Models',
        'inventory.Conditions',
        'inventory.OrderItems',
        'inventory.GuarantyServices',
        'inventory.OrderStatuses'
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
                },
                'grid[xtype=orderItemsList]': {
                    itemclick: this.onItemClick
                },
                'orderItemsProperty': {
                    propertychange: this.onPropertyChange,
                    beforeedit: this.onBeforeEditPropertyGrid
                }, 
                'orderItemsProperty textfield[name=searchField]': {
                    change: this.onChangeFilterField,
                    specialkey: this.onClearField
                }                                
            },
            global: {},
            store: {
                '#OrderItems': {
                    remove: this.clearPropertyGrid
                }
            },
            proxy: {} 
        });
    },
    
   clearPropertyGrid: function() {
      var dp = Ext.ComponentQuery.query('orderItemsProperty')[0];
      dp.setSource();
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
    
    onItemClick: function(grid, record, item, index, e, eOpts) {
        if (record) {
            var dp = this.getOrderItemsProperty(),
                sourceConfig = {
                    'guaranty_service': {
                        editor: Ext.create('Ext.form.ComboBox', {                       
                                    store: Ext.create('coloMS.store.inventory.GuarantyServices'), 
                                    displayField: 'name',
                                    valueField: 'name'
                                }) 
                    },
                    'condition': {
                        editor: Ext.create('Ext.form.ComboBox', {                       
                                    store: Ext.create('coloMS.store.inventory.Conditions'), 
                                    displayField: 'name',
                                    valueField: 'name'
                              })
                    },
                    'guaranty': {
                        editor: Ext.create('Ext.form.field.Number' , {
                                    minValue: 0
                                })
                    }, 
                    'status': {
                        editor: Ext.create('Ext.form.ComboBox', {                       
                                    store: Ext.create('coloMS.store.inventory.ItemStatuses'), 
                                    displayField: 'name',
                                    valueField: 'name'
                              })
                    },
                    'quantity': {
                        editor: Ext.create('Ext.form.field.Number' , {
                                    minValue: 1
                                })
                    }                   
            };                                                    
            dp.setSource(record.getData(), sourceConfig);
        }
    },

    onPropertyChange: function(source, recordId, value, oldValue, eOpts) {
        // TODO неотрабатывает роуэдит после редактированифя проперти-грида при this.getDeviceList(). Второй случай с гетером
        //var store = this.getDeviceList().getStore();
        var store = Ext.ComponentQuery.query('orderItemsList')[0].getStore();
        var rec = store.findRecord("id", source.id);
        rec.set(recordId, value);
        rec.setDirty();
        //store.sync();
    },

    onBeforeEditPropertyGrid: function(editor, e, eOpts) {
        var editableFields = ['guaranty_service', 'status', 'guaranty', 'condition','quantity', 'price'];
        return Ext.Array.contains(editableFields, e.record.data.name);
    }, 
    
    onChangeFilterField: function(f, newValue, oldValue, eOpts) {
        var dp = Ext.ComponentQuery.query('orderItemsProperty')[0];
        var store = dp.getStore();
        store.filterBy(function (record) {
            if (record.internalId.search(newValue) == -1) {
                return false;
            } else {
                return true;
            }

        });
    },

    onClearField: function(f ,e) {
        if (e!=undefined) {
            var key = e.getKey();
            if (key == 27) {
                this.getSearchFieldP().setValue('');
            }
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
            });
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
        var me = this,
            grid = me.getOrderItemsList(),
            win = grid.up('window'),
            store = grid.getStore();
            var qirecord = Ext.create('coloMS.model.inventory.OrderItem', record.data);
            var findRecord = store.findRecord('id', qirecord.data.id);
            qirecord.set('status', 'in-order');
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
        console.log(win);
        // setup generic callback config for create/save methods
        if (!win.editable_record) {
            callbacks = {
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
        } else {
            callbacks = {
                success: function( records, operation ) {
                    win.close();
                },
                failure: function( records, operation ) {
                    store.rejectChanges();
                }              
            };      
        }
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
                });
            }
        });
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
       // console.log(record);
        if(!isNew) {
            win.editable_record = true;
            var grid = me.getOrderItemsList(),
                store = grid.getStore(),
                button = win.down('button#save');
            store.load({params: {order_id: record.data.id} });
            //button.disable();
            grid.disable();
            me.getOrdersModelList().disable();
        }
    }
});
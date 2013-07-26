/**
 * Controller for all staff-related management functionality
 */
Ext.define('coloMS.controller.Staff', {
    extend: 'coloMS.controller.Base',
    stores: [
        'Staff'
    ],
    views: [
        'staff.List',
        'staff.edit.Form',
        'staff.edit.Window',
        'staff.passwd.Window',
        'staff.passwd.Form'
    ],
    refs: [
        {
            ref: 'StaffList',
            selector: '[xtype=staff.list]'
        },
        {
            ref: 'StaffEditWindow',
            selector: '[xtype=staff.edit.window]'
        },
        {
            ref: 'StaffEditForm',
            selector: '[xtype=staff.edit.form]'
        },
        {
            ref: 'RoleItemSelector',
            selector: 'form[xtype=staff.edit.form] itemselectorfield'
        }
    ],
    init: function() {
        this.listen({
            controller: {},
            component: {
                'grid[xtype=staff.list]': {
                    beforerender: this.loadRecords,
                    itemdblclick: this.edit,
                    itemcontextmenu: this.showContextMenu
                },
                'form[xtype=staff.edit.form] itemselectorfield': {
                    beforerender: this.loadRecords
                },
                'grid[xtype=staff.list] button#add': {
                    click: this.add
                },
                'window[xtype=staff.edit.window] button#save': {
                    click: this.save
                },
                'window[xtype=staff.edit.window] button#cancel': {
                    click: this.close
                },
                'window[xtype=staff.passwd.window] button#save': {
                    click: this.savePassword
                },
                'window[xtype=staff.passwd.window] button#cancel': {
                    click: this.close
                }                
            },
            global: {},
            store: {
                '#options.Roles': {
                    load: this.onItemSelectorFieldModifyItems
                }
            },
            proxy: {} 
        });
    },
    
    onItemSelectorFieldModifyItems: function(store, records, successful, eOpts) {
        if (this.getStaffEditWindow() === undefined) return;
        var me = this,
            record = me.getStaffEditForm().getRecord(),
            itemSelector = me.getRoleItemSelector(),
            itemSelectorStore = itemSelector.getStore();
        if(record) {
            var roles = record.data.roles;
            if (roles) {
                var a_roles = roles.split(",");
                Ext.Array.each(a_roles, function(name, index, countriesItSelf) {
                    var index = itemSelectorStore.find("name", name);
                    if (index >= 0) {
                        var rec = itemSelectorStore.getAt(index);
                        itemSelector.moveRec(true, rec);
                    }
                });
            }
        }        
    },
    
    /**
     * Displays context menu 
     * @param {Ext.view.View} view
     * @param {Ext.data.Model} record 
     * @param {HTMLElement} item
     * @param {Number} index
     * @param {Ext.EventObject} e
     * @param {Object} eOpts
     */
    showContextMenu: function( view, record, item, index, e, eOpts ) {
        var me = this;
        // stop event so browser's normal right-click action doesn't continue
        e.stopEvent();
        // if a menu doesn't already exist, create one
        if( !item.contextMenu ) {
            // add menu
            item.contextMenu = new Ext.menu.Menu({
                items: [
                    {
                        text: 'Edit User',
                        iconCls: 'silk-pencil',
                        handler: function( item, e ) {
                            me.edit( view, record, item, index, e, eOpts );
                        }
                    },
                    {
                        text: 'Delete User',
                        iconCls: 'silk-cross',
                        handler: function( item, e ) {
                            me.remove( record );
                        }
                    },
                    {
                        text: 'Set Password',
                        iconCls: 'silk-lock',
                        handler: function( item, e ) {
                            Ext.widget('staff.passwd.window').show();
                        }
                    }                    
                ]
            })
        }
        // show menu relative to item which was right-clicked
        item.contextMenu.showAt(e.getXY());
    },
    /**
     * Loads the grid's store
     * @param {Ext.grid.Panel} grid
     * @param {Object} eOpts
     */
    loadRecords: function( grid, eOpts ) {
        var me = this,
            store = grid.getStore();
        // clear any fliters that have been applied
        store.clearFilter( true );
        // load the store
        store.load();
    },
    /**
     * Handles request to edit
     * @param {Ext.view.View} view
     * @param {Ext.data.Model} record 
     * @param {HTMLElement} item
     * @param {Number} index
     * @param {Ext.EventObject} e
     * @param {Object} eOpts
     */
    edit: function( view, record, item, index, e, eOpts ) {
        var me = this;
        // show window
        me.showEditWindow( record );
    },
    /**
     * Creates a new record and prepares it for editing
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     * @param {Object} eOpts
     */
    add: function( button, e, eOpts ) {
        var me = this,
            record = Ext.create( 'coloMS.model.Staff' );
        // show window
        me.showEditWindow( record );
    },
    /**
     * Persists edited record
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     * @param {Object} eOpts
     */
    save: function( button, e, eOpts ) {
        var me = this,
            grid = me.getStaffList(),
            store = grid.getStore(),
            win = button.up( 'window' ),
            form = win.down( 'form' ),
            record = form.getRecord(),
            values = form.getValues(),
            callbacks;
        if (!form.isValid()) return;
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
            },
            failure: function( records, operation ) {
                // if failure, reject changes in store
                store.rejectChanges();
            }
        };
        // mask to prevent extra submits
        Ext.getBody().mask( 'Saving User...' );
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
    /**
     * Persists edited record
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     * @param {Object} eOpts
     */
    close: function( button, e, eOpts ) {
        var me = this,
            win = button.up( 'window' );
        // close the window
        win.close();
    },
    /**
     * Displays context menu 
     * @param {Ext.data.Model[]} record
     */
    remove: function( record ) {
        var me = this,
            store = record.store;
        // show confirmation before continuing
        Ext.Msg.confirm( 'Attention', 'Are you sure you want to delete this User? This action cannot be undone.', function( buttonId, text, opt ) {
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
    /**
     * Displays common editing form for add/edit operations
     * @param {Ext.data.Model} record
     */
    showEditWindow: function( record ) {
        var me = this,
            win = me.getStaffEditWindow(),
            isNew = record.phantom;
        // if window exists, show it; otherwise, create new instance
        if( !win ) {
            win = Ext.widget( 'staff.edit.window', {
                title: isNew ? 'Add User' : 'Edit User'
            });
        }
        // show window
        win.show();
        // load form with data
        win.down( 'form' ).loadRecord( record );
    },
    
    savePassword: function(button, e, eOpt) {
       var me = this,
            win = button.up( 'window' ),
            form = win.down( 'form' ),
            values = form.getValues(),
            grid = me.getStaffList(),
            id = grid.getSelectionModel().getSelection()[0].get('id'),
            myMask = new Ext.LoadMask({ target: win, msg:"Please wait..."});
            
            if (form.isValid()) {
                myMask.show();
                Ext.Ajax.request({
                    url   : "set_password",
                   // method: 'POST',
                    params: { password : values.password, id : id },
                    //callback: this.afterOnlogin,
                    scope : this,
                    success: function() {
                        myMask.hide();
                        win.close();
                    }
                });                
            } else {
                return    
            }
    }
});
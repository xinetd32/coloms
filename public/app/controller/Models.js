/*
 * File: app/controller/Models.js
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

Ext.define('coloMS.controller.Models', {
    extend: 'coloMS.controller.Base',

    requires: [
        'coloMS.view.inventory.model.edit.Form',
        'coloMS.view.inventory.model.edit.Window',
        'coloMS.view.inventory.model.List',
        'coloMS.store.inventory.Models'
    ],

    refs: [
        {
            ref: 'ModelList',
            selector: '[xtype=modelList]'
        },
        {
            ref: 'ModelEditWindow',
            selector: '[xtype=modelEditWindow]'
        },
        {
            ref: 'ModelEditForm',
            selector: '[xtype=modelEditForm]'
        },
        {
            ref: 'ModelSearchWindow',
            selector: '[xtype=modelSearchWindow]'
        },
        {
            ref: 'ModelSearchForm',
            selector: '[xtype=modelSearchForm]'
        }
    ],
    views: [
        'inventory.model.edit.Form',
        'inventory.model.edit.Window',
        'inventory.model.List'
    ],
    store: [
        'inventory.Models'
    ],

    init: function() {
        this.listen({
            controller: {},
            component: {
                'grid[xtype=modelList]': {
                    beforerender: this.loadRecords,
                    itemdblclick: this.edit,
                    itemcontextmenu: this.showContextMenu
                },
                'grid[xtype=modelList] button#add': {
                    click: this.add
                },
                'window[xtype=modelEditWindow] button#save': {
                    click: this.save
                },
                'window[xtype=modelEditWindow] button#cancel': {
                    click: this.close
                },
                'grid[xtype=modelList] textfield#search': {
                    change: { 
                      fn: this.onChangeSearchField,
                      scope: this,
                      buffer: 500
                    }  
                },
                'menu#context menuitem': {
                    click: this.onClickContextMenu
                }     
            },
            global: {},
            store: {
                '#inventory.Models': {
                    load: this.onStoreIMLoad
                }
            },
            proxy: {} 
        });
    },
    
    onClickContextMenu: function(item, e, eOpts) {
        var me = this,
            token = item.itemId,
            grid = me.getModelList(),
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

    add: function(button, e, eOpts) {
        var me = this,
            record = Ext.create( 'coloMS.model.inventory.Model' );
        // show window
        me.showEditWindow( record );
    },

    save: function(button, e, eOpts) {
        var me = this,
            grid = me.getModelList(),
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
                me.getModelList().getStore().reload();
            },
            failure: function( records, operation ) {
                // if failure, reject changes in store
                store.rejectChanges();
            }
        };
        // mask to prevent extra submits
        Ext.getBody().mask( 'Saving Model...' );
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
        Ext.Msg.confirm( 'Attention', 'Are you sure you want to delete this Model? This action cannot be undone.', function( buttonId, text, opt ) {
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
    
    onChangeSearchField: function( field, newValue, oldValue, eOpts) {
        var me = this,
            grid = me.getModelList(),
            store = grid.getStore(),
            value = grid.down('#search').getValue();       
        store.proxy.extraParams = value == '' ? {} : { query : value };
        store.reload();
    },
    
    onStoreIMLoad: function(store, records, successful, eOpts) {
        var me = this,
            tagsRe = /<[^>]*>/gm,
            // DEL ASCII code
            tagsProtect = '\x0f',  
            matchCls = 'x-livesearch-match', 
            indexes = [],  
            count = 0;   
            currentIndex = null,
            searchRegExp = null,
            grid = me.getModelList(),
            searchField = grid.down('#search');
             
            searchFieldValue = searchField ? grid.down('#search').getValue() : '';
            
        if (searchFieldValue == '') return;
        
        searchRegExp = new RegExp(searchFieldValue, 'gi');
        
        store.each(function(record, idx) {
            var td = Ext.fly(grid.view.getNode(idx)).down('td'),
                cell, matches, cellHTML;
            while(td) {
                 cell = td.down('.x-grid-cell-inner');
                 matches = cell.dom.innerHTML.match(tagsRe);
                 cellHTML = cell.dom.innerHTML.replace(tagsRe, me.tagsProtect);
                 
                 // populate indexes array, set currentIndex, and replace wrap matched string in a span
                 cellHTML = cellHTML.replace(searchRegExp, function(m) {
                    count += 1;
                    if (Ext.Array.indexOf(indexes, idx) === -1) {
                        indexes.push(idx);
                    }
                    if (currentIndex === null) {
                        currentIndex = idx;
                    }
                    return '<span class="' + matchCls + '">' + m + '</span>';
                 });
                 // restore protected tags
                 Ext.each(matches, function(match) {
                    cellHTML = cellHTML.replace(tagsProtect, match); 
                 });
                 // update cell html
                 cell.dom.innerHTML = cellHTML;
                 td = td.next();
            }              
        });    
    },

    showEditWindow: function(record) {
        var me = this,
            win = me.getModelEditWindow(),
            isNew = record.phantom;
        // if window exists, show it; otherwise, create new instance
        if( !win ) {
            win = Ext.widget( 'modelEditWindow', {
                title: isNew ? 'Add Model' : 'Edit Model'
            });
        }
        // show window
        win.show();
        // load form with data
        win.down( 'form' ).loadRecord( record );
    }

});
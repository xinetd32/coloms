Ext.define('coloMS.controller.Base', {
    extend: 'Ext.app.Controller',

    /**
     * Common way to retrieve full data record from the server before performing another action
     * @param {Ext.data.Record} record
     * @param {String} scope
     * @param {Functino} callbackFn
     * @param {Object} extraData
     */
    loadDetail: function( record, scope, callbackFn, extraData ) {
        // first, reject any changes currently in the store 
        //so we don't build up an array of records to save by viewing the records
        record.store.rejectChanges();
        // make request for detail record
        Ext.Ajax.request({
          method: 'get',
          url: record.store.getProxy().url + '/' + record.internalId + '.json',
          callback: function( options, success, response ) {
              if( success ) {
                  // set "safe mode" so we don't get hammered with giant Ext.Error
                  data = Ext.decode( response.responseText, true );
                          // update record
                  record.set( data );
                  console.log(data);
                  console.log(record);
                  // call callback method
                  callbackFn.call( scope, record, extraData );
              }
          }
        });
    },

    onChangeSearchField: function( field, newValue, oldValue, eOpts) {
        var me = this,
            grid = field.up('grid'),
            store = grid.getStore(),
            value = field.getValue(),
            
            tagsRe = /<[^>]*>/gm,
            // DEL ASCII code
            tagsProtect = '\x0f',  
            matchCls = 'x-livesearch-match', 
            indexes = [],  
            count = 0;   
            currentIndex = null,
            searchRegExp = null,
            searchRegExp = new RegExp(value, 'gi');
                               
        store.proxy.extraParams = value == '' ? {} : { query : value };
        store.reload(
            {
                scope: me,
                callback: function(records, operation, success) {
                    if (success) {
                        if (value == '') return;
                        Ext.Array.each(records, function(record, idx, countriesItSelf) {
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
                    }
                }
            }
        );
    }
    
});

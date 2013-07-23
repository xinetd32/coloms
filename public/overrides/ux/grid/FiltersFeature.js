Ext.define('overrides.ux.grid.FiltersFeature', {
     override: 'Ext.ux.grid.FiltersFeature',
     
    /**
     * Returns an Array of the currently active filters.
     * @return {Array} filters Array of the currently active filters.
     */
    getFilterData : function () {
        var items = this.getFilterItems(),
            filters = [],
            n, nlen, item, d, i, len;

        for (n = 0, nlen = items.length; n < nlen; n++) {
            item = items[n];
            if (item.active) {
                d = [].concat(item.serialize());
                for (i = 0, len = d.length; i < len; i++) {
                    filters.push({
                        // field: item.dataIndex,
                        field: item.sqlField ? item.sqlField : item.dataIndex,
                        data: d[i]
                    });
                }
            }
        }
        return filters;
    }
});
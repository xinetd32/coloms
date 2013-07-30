class ActiveRecord::Base
  @queryColumns = []
  
  def self.queryColumns
    @queryColumns ? @queryColumns : []
  end
  
  def self.queryColumns=(columns)
    @queryColumns=columns
  end

  def self.extLimits(params = {})
    relation = scoped

    # handling limits
    relation = relation.offset(params[:start].to_i) if params[:start]
    relation = relation.limit(params[:limit].to_i) if params[:limit]
    # handling ExtJS query
    if (params[:query] && params[:query]!='')
      where = []
      self.queryColumns.each do |column|
        where << "(#{column} LIKE '%#{params[:query]}%')"
      end
      relation = relation.where(where.join(' OR '))
    end
    
    #hanling relations
    self.columns.each do |column|
      if params[column.name.to_sym] then
        relation = relation.where(column.name => params[column.name.to_sym])
      end
    end

    #handling many_to_many relations
    self.reflections.each do |refName,val|
      reflection  = self.reflections[refName]
      macro       = reflection.macro
      foreign_key = reflection.association_foreign_key.to_sym

      if (macro == :has_and_belongs_to_many && params[foreign_key])
        join_table  = reflection.options[:join_table].to_sym
        relation = relation.joins(refName).where(join_table => {foreign_key => params[foreign_key]})
      end
    end

  #handling ExtJS filters
  # String                                      "filter"=>"[{\"property\":\"id\",\"value\":3}]" 
  # ActiveSupport::HashWithIndifferentAccess    "filter"=>{"0"=>{"field"=>"_vendor", "data"=>{"type"=>"string", "value"=>"asda"}}}    
    if (params[:filter] && params[:filter]!='')
      if params[:filter].kind_of? String
        filters=ActiveSupport::JSON.decode(params[:filter])
        filters.each do |filter|
          relation=relation.where(filter['property'] => filter['value'])
        end
      elsif params[:filter].kind_of? ActiveSupport::HashWithIndifferentAccess
        relation=relation.where(buildFilterOptions(params[:filter]))    
      end  
    end
    
    if params[:sort]
      sort = ActiveSupport::JSON.decode(params[:sort])
      sort = sort.first
      scolumn = sort["property"]
      sdir = sort["direction"]
      scolumn = scolumn[0] == '_' ? scolumn[1..scolumn.length].gsub('__','.') : '' + self.table_name + '.' + scolumn
      relation = relation.order("#{scolumn} #{sdir}")
    end
    relation
  end
  
  #
  # Private Functions
  #
  
  private
  
  def self.buildFilterOptions(filter_hash)
  
    return '' if filter_hash.nil?  #Return an empty string if the filter is empty
  
    fs = ''
  
    filter_hash = filter_hash.delete_if {|key, value| value.blank? }
    filter_hash.each do |columns, fvals|
      fs_tmp = ''
      gf_field = fvals[:field].downcase
     # gf_field = gf_field[1..gf_field.length].gsub('__','.') if gf_field[0] == '_' # replace decorate columns __ -> .
      gf_type = fvals[:data][:type].downcase
      #gf_type = '' unless self.column_names.include?(gf_field)  #Verify field name
      gf_value = fvals[:data][:value]
      gf_comparison = fvals[:data][:comparison]
      case gf_type
        when 'numeric'
          case gf_comparison
            when 'gt'
              fs_tmp = '>'
            when 'lt'
              fs_tmp = '<'
            when 'eq'
              fs_tmp = '='
            when 'ne'
              fs_tmp = '!='
          end
          gf_value = gf_value.to_i
          fs_tmp = gf_field + ' ' + fs_tmp + ' ' + gf_value.to_s unless fs_tmp.empty?
        when 'string'
          fs_tmp = gf_field + ' LIKE \'%' + gf_value + '%\''
        when 'boolean'
          gf_value = gf_value.downcase
          if gf_value == 'true' or gf_value == 'false'
            fs_tmp = gf_field + ' = ' + gf_value
          end
        when 'list'
          fs_tmp = buildFilterOptions_List(gf_value, gf_field)  #Need to implement your own data validation
        when 'date'
          case gf_comparison
            when 'gt'
              fs_tmp = '>'
            when 'lt'
              fs_tmp = '<'
            when 'eq'
              fs_tmp = '='
            when 'ne'
              fs_tmp = '!='
          end
          #Note: I modified DateFilter.js 'dateFormat' from 'm/d/Y' to 'Y-m-d'
          fs_tmp = gf_field + ' ' + fs_tmp + ' \'' + gf_value + '\'' unless fs_tmp.empty?
      end
      if not fs_tmp.empty?
        fs = fs + ' AND ' unless fs.empty?
        fs = fs + fs_tmp
      end
    end
    fs
  end

  def self.buildFilterOptions_List(val, key)
  
    if val.nil? or val.empty? or key.nil? or key.empty? then return val end
  
    skey = key + ' = '
    rtn = ''
    cnt = 0
    if val.include? ','
      val.split(',').each {|sval|
        rtn = rtn + ' OR ' unless cnt < 1
        rtn = rtn + skey + sval
        cnt += 1
        }
      rtn = '(' + rtn + ')' unless cnt <= 1 
    else
      rtn = skey + val
    end
    rtn
  end
 
end

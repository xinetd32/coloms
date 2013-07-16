class ActiveRecord::Base
  def self.queryColumns
    []
  end

  def self.extLimits(params = {})
    #Rails.logger = Logger.new(STDOUT)
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
    if (params[:filter] && params[:filter]!='')
      filters=ActiveSupport::JSON.decode(params[:filter])
      filters.each do |filter|
        @result=@result.where(filter['property'] => filter['value'])
      end
    end

    #logger.debug self.columns

    relation
  end
end

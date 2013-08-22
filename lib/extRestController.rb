module ExtRestController
  def index
    @result = defaultModel.extLimits(params)
    render :template => 'application/extStore.json.erb'
  end

  def show
    @result = defaultModel.where(:id => params[:id])
    render :template => 'application/extStoreNoTotal.json.erb'
  end

  def create
    @result = defaultModel.new(params[defaultModel.name.underscore.to_sym])
    if @result.save
      render :template => 'application/extStore.json.erb'
    else
      render :json => {:success => false}.merge({:message => 'Error', :type => 'validation',:data => to_json_msg(@result.errors.messages)})
    end
  end

  def update
    @result = defaultModel.find(params[:id])
    if @result.update_attributes(params[defaultModel.name.underscore.to_sym])
      render :template => 'application/extStore.json.erb'
    else
      render :json => {:success => false}.merge({:message => 'Error', :type => 'validation',:data => to_json_msg(@result.errors.messages)})
    end
  end

  def destroy
    @result = defaultModel.find(params[:id])
    @result.destroy

    render :json => {:success => true}
  end
  
  private
  
  def to_json_msg(msg)
    a=[]
    msg.each { |i|
      b={}
      b["field"] = i[0].to_s
      b["message"] = i[1].first
      a.push b
    }
    a
  end
  
end

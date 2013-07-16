module ExtRestController
  def index
    @result = defaultModel.extLimits(params)
    render :template => 'application/extStore.json.erb'
  end

  def show
    @result = defaultModel.where(:id => params[:id])
    render :template => 'application/extStore.json.erb'
  end

  def create
    @result = defaultModel.new(params[defaultModel.name.underscore.to_sym])
    if @result.save
      render :template => 'application/extStore.json.erb'
    else
      #render :json => {:success => false}.merge(:msg => @result.errors.messages[:name])
      render :json => {:success => false}.merge(@result.errors.messages)
    end
  end

  def update
    @result = defaultModel.find(params[:id])
    if @result.update_attributes(params[defaultModel.name.underscore.to_sym])
      render :template => 'application/extStore.json.erb'
    else
      render :json => {:success => false}
    end
  end

  def destroy
    @result = defaultModel.find(params[:id])
    @result.destroy

    render :json => {:success => true}
  end
end

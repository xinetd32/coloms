class Inventory::OrderItemsController < ApplicationController
  CONDITIONS = [{id: 1, name: "New"}, {id: 2, name: "Refurbished"}]
  GUARANTY_SERVICES = [{id: 1, name: "NBD"}, {id: 2, name: "AFTER"}, {id: 3, name: "BEFOR"}]
  
  def index
    order = Order.find(params[:order_id])
    if (order)
      # @result = order.models.select('models.*, count(models.id) as quantity').group('models.id')
      @result = order.items
    else 
      render :json => {:success => false}    
    end    
  end

  def update
 
    order = Order.find(params[:order_id])
    model = Model.find(params[:id])
    quantity = params[:quantity]
    quantity.times do
      order.models << model
      mo = ModelOrder.last
      item = mo.item
      item.update_attributes({:guaranty_service => params[:guaranty_service],
                        :guaranty => params[:guaranty],
                        :condition => params[:condition],
                        :status => 'in-order'
      })
      item.vendor = mo.model.vendor
      item.order = mo.order
      item.product_type = mo.model.product_type
      item.model = mo.model
      item.save!      
    end

    render :json => {:success => true}  
  end
  
  def get_conditions
    @result = CONDITIONS
    render :template => 'application/extStoreNoTotal.json.erb'
  end
  
  def get_guaranty_services
    @result = GUARANTY_SERVICES
    render :template => 'application/extStoreNoTotal.json.erb'
  end
  
  
end
class Inventory::OrderItemsController < ApplicationController
  CONDITIONS = [{id: 1, name: "New"}, {id: 2, name: "Refurbished"}]
  GUARANTY_SERVICES = [{id: 1, name: "NBD"}, {id: 2, name: "AFTER"}, {id: 3, name: "BEFOR"}]
  ITEM_STATUSES = [{id: 1, name: "in-order"}, {id: 2, name: "in-use"}, {id: 3, name: "fail-order"}, {id: 4, name: "in-stock"}]
  
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
    price = (Kernel.Float(params[:price]).round(2) / quantity.to_i).round(2)
    logger.error "Start".center 50, "="
    logger.error price
    logger.error "End".center 50, "="
    quantity.times do
      order.models << model
      mo = ModelOrder.last
      item = mo.item
      item.update_attributes({:guaranty_service => params[:guaranty_service],
                        :guaranty => params[:guaranty],
                        :condition => params[:condition],
                        :status => 'in-order',
                        :price => price
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
  
  def get_item_statuses
    @result = ITEM_STATUSES
    render :template => 'application/extStoreNoTotal.json.erb'    
  end
  
end

class DashboardController < ApplicationController

  BUTTON_ADD = {
    xtype: 'button',
    itemId: 'add',
    iconCls: 'silk-add',
    text: 'Add'
  }
  
  TB_SEPARATOR = { 
    xtype: 'tbseparator' 
  }

  TB_SPACER = { 
    xtype: 'tbspacer' 
  }
  
  TEXTFIELD_SEARCH = {
    xtype: 'textfield',
    itemId: 'search',
    fieldLabel: 'Search',
    labelAlign: 'right',
    defaultAlign: 'tr-br?'                          
  }
  
  CONTEXT_MENU_EDIT = {
    text: 'Edit Model',
    iconCls: 'icon_edit',
    itemId: 'edit'
  }

  CONTEXT_MENU_DELETE = {
    text: 'Delete Model',
    iconCls: 'icon_delete',
    itemId: 'delete'    
  }
  
  def get_controls
    if (["coloMS.view.inventory.model.List","coloMS.view.inventory.distributors.List","coloMS.view.inventory.orders.List"].include?(params[:item]))
      @respond = current_user[:roles].include?("admin") ? [BUTTON_ADD, TB_SEPARATOR, TB_SPACER, TEXTFIELD_SEARCH] : [TEXTFIELD_SEARCH]
    end 

    if (["coloMS.controller.Models", "coloMS.controller.Distributors"].include?(params[:item]))
      @respond = current_user[:roles].include?("admin") ? [CONTEXT_MENU_EDIT, CONTEXT_MENU_DELETE] : []
    end   
    
    logger.error current_user.inspect
    logger.error params[:item]
  end
 
end

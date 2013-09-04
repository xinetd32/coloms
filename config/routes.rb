ColoMS::Application.routes.draw do
  root :to => 'dashboard#index'

  resource :session, :only => [:new, :create, :destroy]
  match '/login' => "sessions#new", :as => "login"
  match '/logout' => "sessions#destroy", :as => "logout"
  
  match '/get_controls' => 'dashboard#get_controls'
  match '/get_current_user' => 'users#get_current_user'
  match '/logs' => 'audits#index'
  
  resources :users
  post "/users/:id(.:format)" => "users#create"
  match "/set_password" => "users#set_password"
  
  namespace :inventory do
    resources :vendors
    post "/vendors/:id(.:format)" => "vendors#create"

    resources :product_types
    post "/product_types/:id(.:format)" => "product_types#create"

    resources :models
    post "/models/:id(.:format)" => "models#create"

    resources :distributors
    post "/distributors/:id(.:format)" => "distributors#create"
    
    resources :orders
    post "/orders/:id(.:format)" => "orders#create" 
    match "get_order_status" => "orders#get_order_status"
    

    resources :items
    post "/items/:id(.:format)" => "items#create"    
    
    resources :equipments
    post "/equipments/:id(.:format)" => "equipments#create"           

    resources :order_items
    post "/order_items/:id(.:format)" => "order_items#create"    
    match "get_conditions" => "order_items#get_conditions"
    match "get_guaranty_services" => "order_items#get_guaranty_services"
    match "get_item_statuses" => "order_items#get_item_statuses"
    
  end
  
  namespace :options do
    resources :roles
    post "/roles/:id(.:format)" => "roles#create"
    
    resources :permissions
    post "/permissions/:id(.:format)" => "permissions#create"
    
  end
  
    
    #match 'users/say_hi' => 'sessions#say_hi' , :as => :say_hi
#  end

#  scope "/api/inventory", :as => "api" do
#    resources :vendors
#  end
 
end

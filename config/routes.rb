ColoMS::Application.routes.draw do
  root :to => 'dashboard#index'

  resource :session, :only => [:new, :create, :destroy]
  match '/login' => "sessions#new", :as => "login"
  match '/logout' => "sessions#destroy", :as => "logout"
  
  match '/get_controls' => 'dashboard#get_controls'
  match '/get_current_user' => 'users#get_current_user'
  
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

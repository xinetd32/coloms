ColoMS::Application.routes.draw do
  root :to => 'dashboard#index'

  resource :session, :only => [:new, :create, :destroy]
  match '/login' => "sessions#new", :as => "login"
  match '/logout' => "sessions#destroy", :as => "logout"
  
  #match 'coloMS' => 'dashboard#index'
  
  namespace :inventory do
    resources :vendors
    post "/vendors/:id(.:format)" => "vendors#create"

    resources :product_types
    post "/product_types/:id(.:format)" => "product_types#create"

    resources :models
    post "/models/:id(.:format)" => "models#create"
    
  end
    
    #match 'users/say_hi' => 'sessions#say_hi' , :as => :say_hi
#  end

#  scope "/api/inventory", :as => "api" do
#    resources :vendors
#  end
 
end

ColoMS::Application.routes.draw do
  root :to => 'dashboard#index'

  resource :session, :only => [:new, :create, :destroy]
  match '/login' => "sessions#new", :as => "login"
  match '/logout' => "sessions#destroy", :as => "logout"
 
end

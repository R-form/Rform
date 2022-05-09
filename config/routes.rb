Rails.application.routes.draw do

  root :to => 'users#index'
  resources :users

  get 'login' => 'user_sessions#new', :as => :login
  post 'login' => "user_sessions#create"
  post 'logout' => 'user_sessions#destroy', :as => :logout

  resources :surveys do
    resources :responses

    member do
      patch :sort
    end
    
    collection do
      patch :question_sort
    end

  end

  
end

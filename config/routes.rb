Rails.application.routes.draw do

  root 'homepage#index'

  get 'password_resets/create'
  get 'password_resets/edit'
  get 'password_resets/update'

  resources :users

  get 'login' => 'user_sessions#new', :as => :login
  post 'login' => "user_sessions#create"
  post 'logout' => 'user_sessions#destroy', :as => :logout

  resources :surveys do
    resources :responses
    get 'duplicate', on: :member , to: "surveys#duplicate_survey"
  end

  post "oauth/callback" => "oauths#callback"
  get "oauth/callback" => "oauths#callback" # for use with Github, Facebook
  get "oauth/:provider" => "oauths#oauth", :as => :auth_at_provider

  resources :password_resets, only: [:new, :create, :edit, :update]


end

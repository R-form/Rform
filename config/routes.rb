# frozen_string_literal: true

Rails.application.routes.draw do

  get 'password_resets/create'
  get 'password_resets/edit'
  get 'password_resets/update'
  root :to => 'users#index'
  resources :users

  get 'login' => 'user_sessions#new', :as => :login
  post 'login' => "user_sessions#create"
  post 'logout' => 'user_sessions#destroy', :as => :logout

  resources :password_resets, only: [:new, :create, :edit, :update]

  post "oauth/callback" => "oauths#callback"
  get "oauth/callback" => "oauths#callback" # for use with Github, Facebook
  get "oauth/:provider" => "oauths#oauth", :as => :auth_at_provider

end

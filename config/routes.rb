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

end

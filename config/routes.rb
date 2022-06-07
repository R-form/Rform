# frozen_string_literal: true

Rails.application.routes.draw do
  
  root 'homepage#index'
  resource :users
  resource :user_sessions, only: [:new, :create, :destroy]

  resources :surveys do
    resources :responses do
      collection do 
        get :submitted
      end
    end

    member do
      patch :sort
      patch :question_sort
      post :add_question_item
      post :add_answer_item
      patch :add_survey_title
      patch :add_survey_description
      patch :save_checkbox
      patch :update_select
      patch :add_question
      patch :add_question_description
      patch :add_answer
      delete :remove_question
      delete :remove_answer
      patch :update_status
      patch :update_opentime
      patch :update_closetime
      get :duplicate
      post :duplicate_question
      patch :font_style
      patch :theme
      patch :question_image
      patch :background_color
      get :stats
      get :questions_list
      patch :skip_to_question_id
      delete :remove_skip_to_question_id
    end 

  end
  
  resources :oauth, only: [] do
    collection do
      post :callback
      get :callback
      get :provider
    end
  end

  resources :password_resets, only: [:new, :create, :edit, :update]
  get 'to/:survey_id' , as: 'responses_new' , to: 'responses#new'
  post 'to/:survey_id/done' , as: 'responses_done', to: 'responses#create'

end

# config/routes.rb
Rails.application.routes.draw do
  root "dashboard#index"
  
  get "dashboard", to: "dashboard#index"
  
  resources :clients, only: [:index]
  resources :invoices, only: [:index, :new, :edit]
  
  # Public shareable invoice (for Day 6)
  get "i/:token", to: "public_invoices#show", as: :public_invoice
end

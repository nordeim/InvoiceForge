# app/controllers/invoices_controller.rb
class InvoicesController < ApplicationController
  def index
    render inertia: 'Invoices/Index'
  end

  def new
    render inertia: 'Invoices/New'
  end

  def edit
    render inertia: 'Invoices/Edit', props: {
      id: params[:id]
    }
  end
end

class AuditsController < ApplicationController
  include ExtRestController
  def defaultModel
    Audit
  end
  
  def index
    # Поля по которым производить Live-поиск
    defaultModel.queryColumns=['audits.id','audits.auditable_type','audits.auditable_id', 'users.email','audits.action', 'audits.audited_changes']
    params.delete("action")
    @result = defaultModel.includes(:user).extLimits(params)
    
  end  
end

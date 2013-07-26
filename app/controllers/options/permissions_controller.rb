class Options::PermissionsController < ApplicationController
  include ExtRestController
  def defaultModel
    Permission
  end
end

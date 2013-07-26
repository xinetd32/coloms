class Options::RolesController < ApplicationController
  include ExtRestController
  def defaultModel
    Role
  end
end

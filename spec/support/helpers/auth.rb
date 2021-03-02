module Helpers
    module Authentication
        def sign_in_as(user)
            token = user.api_token
            { 'Authorization': "Bearer #{token}" }
        end
    end
end
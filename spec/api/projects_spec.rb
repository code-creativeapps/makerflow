require 'rails_helper'
describe "Projects related API calls", :type => :request do
    let!(:user) {create(:user)}
    let!(:headers) {sign_in_as(user)}
    context "GET projects and tasks/milestones" do   
        let!(:project_x) {create(:project, name: 'Project X', user: user, color: 'green-400')}
        let!(:project_y) {create(:project, name: 'Project Y', user: user)}
        let!(:milestones_x) {create_list(:milestone, 3, project: project_x)}
        let!(:milestones_y) {create_list(:milestone, 3, project: project_y)}
        let!(:tasks_x_1) {create_list(:task, 3, milestone: milestones_x.first)}
		
        before {
            get '/api/v1/projects', headers: headers
        }

        it 'returns all projects and calculates color values' do
			expect(json_response.size).to eq(2)
			expect(json_response.first['color']).to eq('green-400')
			expect(json_response.first['colorBase']).to eq('green')
			expect(json_response.first['colorShade']).to eq('400')
        end

        it 'returns milestones and tasks' do
            expect(json_response.first['milestones'][0]['tasks'].first).to be_present
            expect(json_response.first['milestones'][0]['tasks'].length).to eq(3)
        end

        it 'returns status code 200' do
            expect(response).to have_http_status(:success)
        end
    end

    context "POST /projects" do
		context "no name " do 
			before {
				post '/api/v1/projects', params: { project: { name: '' } }, headers: headers
			}

			it 'returns status code 400' do
				expect(response).to have_http_status(:unprocessable_entity)
			end
		end

		context "with params" do
			before {
				post '/api/v1/projects', params: { project: { name: "Project A"} }, headers: headers
			}
			it 'returns the project with values' do
					expect(json_response['name']).to eq('Project A')
					expect(json_response['color']).to eq('yellow-500')
					expect(json_response['colorBase']).to eq('yellow')
					expect(json_response['colorShade']).to eq('500')
			end
			it 'returns status code 200' do
				expect(response).to have_http_status(:success)
			end
		end
	end

    context "PUT /projects/:id" do
        let!(:project_x) {create(:project, name: 'Project X', user: user, color: 'green-400')}
		context "no name" do 
			before {
				patch "/api/v1/projects/#{project_x.id}", params: { project: { name: '' } }, headers: headers
			}

			it 'returns status code 400' do
				expect(response).to have_http_status(:unprocessable_entity)
			end
		end

		context "with params" do
			before {
				patch "/api/v1/projects/#{project_x.id}", params: { project: { name: "Project Y", color: 'green-500'} }, headers: headers
			}
			it 'returns the project with values' do
					expect(json_response['name']).to eq('Project Y')
					expect(json_response['color']).to eq('green-500')
					expect(json_response['colorBase']).to eq('green')
					expect(json_response['colorShade']).to eq('500')
			end
			it 'returns status code 200' do
				expect(response).to have_http_status(:success)
			end
		end
	end

    context "DELETE /projects/:id" do
        let!(:project_x) {create(:project, name: 'Project X', user: user, color: 'green-400')}
		context "Delete" do
			before {
				delete "/api/v1/projects/#{project_x.id}", headers: headers
			}
			it 'returns the project with values' do
					expect(json_response).to be_empty
			end
			it 'returns status code 200' do
				expect(response).to have_http_status(:success)
			end
		end
	end
end
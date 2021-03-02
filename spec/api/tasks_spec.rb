require 'rails_helper'
describe "Tasks related API calls", :type => :request do
    let!(:user) {create(:user)}
    let!(:headers) {sign_in_as(user)}
    context "POST /projects/:project_id/milestones/:milestone_id/tasks" do
		let!(:project_x) {create(:project, name: 'Project X', user: user, color: 'green-400')}
        let!(:milestone_x_1) {create(:milestone, project: project_x, name: 'UX/UI')}

		context "no name " do 
			before {
				post "/api/v1/projects/#{project_x.id}/milestones/#{milestone_x_1.id}/tasks", params: { task: { name: '' } }, headers: headers
			}

			it 'returns status code 400' do
				expect(response).to have_http_status(:unprocessable_entity)
			end
		end

		context "with params" do
			before {
				post "/api/v1/projects/#{project_x.id}/milestones/#{milestone_x_1.id}/tasks", params: { task: { name: 'Write Design Brief' } }, headers: headers
			}
			it 'returns the project with values' do
					expect(json_response['name']).to eq('Write Design Brief')
			end
			it 'returns status code 200' do
				expect(response).to have_http_status(:success)
			end
		end
	end

    context "PUT /tasks/:id" do
        let!(:project_x) {create(:project, name: 'Project X', user: user, color: 'green-400')}
        let!(:milestone_x_1) {create(:milestone, project: project_x, name: 'UX/UI')}
        let!(:task_x_1) {create(:task, milestone: milestone_x_1, name: 'Write Design Brief')}

		context "no name" do 
			before {
				patch "/api/v1/tasks/#{task_x_1.id}", params: { task: { name: '' } }, headers: headers
			}

			it 'returns status code 400' do
				expect(response).to have_http_status(:unprocessable_entity)
			end
		end

		context "with params" do
			before {
				patch "/api/v1/tasks/#{task_x_1.id}", params: { task: { name: 'Write UX/UI Brief' } }, headers: headers
			}
			it 'returns the project with values' do
					expect(json_response['name']).to eq('Write UX/UI Brief')
			end
			it 'returns status code 200' do
				expect(response).to have_http_status(:success)
			end
		end
	end

    context "DELETE /tasks/:id" do
        let!(:project_x) {create(:project, name: 'Project X', user: user, color: 'green-400')}
        let!(:milestone_x_1) {create(:milestone, project: project_x, name: 'UX/UI')}
        let!(:task_x_1) {create(:task, milestone: milestone_x_1, name: 'Write Design Brief')}

		context "Delete" do
			before {
				delete "/api/v1/tasks/#{task_x_1.id}", headers: headers
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
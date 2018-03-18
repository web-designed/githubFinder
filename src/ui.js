
   export class UI {

      constructor() {
         this.profile = document.getElementById('profile');
         this.errorWrapper = document.getElementById('error-handling');
      }

      showProfile(user){
         const html = `
            <div class="card card-body mb-3">
               <div class="row">
                  <div class="col-3 text-center">
                     <a href="${user.html_url}" target="_blank">
                        <img class="img-fluid mb-2" src="${user.avatar_url}"/>
                     </a>
                     <a href="${user.html_url}" class="btn btn-secondary btn-sm">view Profile</a>
                  </div>
                  <div class="col-9">
                     <span class="badge badge-primary">
                        Public Repos: ${user.public_repos}
                     </span>
                     <span class="badge badge-secondary">
                        Gists: ${user.public_gists}
                     </span>
                     <span class="badge badge-success">
                        followers: ${user.followers}
                     </span>
                     <span class="badge badge-info">
                        followers: ${user.following}
                     </span>
                     <br/><br/>
                     <ul class="list-group">
                        <li class="list-group-item"><h4><strong>${user.login}</strong></h4></li>
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">blog: ${user.blog}</li>
                        <li class="list-group-item">location: ${user.location}</li>
                        <li class="list-group-item">Member since: ${user.created_at}</li>
                     </ul>
                  </div>
               </div>
            </div>
            <div id="repos"></div>`;

         this.profile.innerHTML = html;
      }

      clearProfile(){
         this.profile.innerHTML = '';
      }

      removeAlert(){
         const alert = document.getElementById('alert-text');
         if(alert){
            alert.remove();
         }
      }

      showAlert(alert, classes){
         const self = this;
         self.errorWrapper.innerHTML = `<div id="alert-text" class="${classes}">${alert}</div>`;
         setTimeout(function () {
            self.removeAlert();
         }, 3000);
      }

      showRepos(repos){

         console.log(repos);

         if(repos.length > 0) {

            let output = `
               <div class="card card-body mb-2">
                  <h3 class="page-heading mb-0">${repos[0].owner.login}'s Public repositories</h3>
               </div>`;

            repos.forEach(function(repo){
               output += `
                  <div class="card card-body mb-2">
                     <div class="row">
                        <div class="col-md-6">
                           <a target="_blank" href="${repo.html_url}">${repo.name}</a>
                        </div>
                        <div class="col-md-6 small">
                           created at: ${repo.created_at}
                        </div>
                     </div>
                  </div>
               `;
            });

            document.getElementById('repos').innerHTML = output;
         }
      }

      hideAutocomplete(){
         const autocompleteList = document.querySelector('.autocomplete-suggestions');
         if (autocompleteList) {
            autocompleteList.style.display='none';
         }
      }
   }

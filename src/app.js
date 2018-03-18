
   //*******************************************************
   // imports
   //*******************************************************

      import bootstrap from 'bootstrap';
      import 'bootstrap/dist/css/bootstrap.min.css';
      import { GitHub } from './github.js';
      import { UI } from './ui.js';
      import _ from 'underscore';
      import autoComplete from './auto-complete.js';
      import './styles/auto-complete.css';

   //*******************************************************
   // Vars
   //*******************************************************

      const searchUser = document.getElementById('user');
      const form = document.getElementById('search-form');
      const submitBtn = document.getElementById('search-submit');
      const github = new GitHub;
      const ui = new UI;

   //*******************************************************
   // Scenario
   //*******************************************************

      //initialize autocomplete
      new autoComplete({
         selector: '#user',
         source: function(term, response){
            github.searchUsers(term)
               .then( data => {
                  const logins = data.search.items.map( function(i){
                     return i.login;
                  })
                  response(logins);
               });
         },
         onSelect: function(e, term, item){
            doneTyping(term);
         }
      });

      // after user submits the form
      form.addEventListener('submit', handleSubmit);

      const doneTyping = (term) => {

         const userText = term;

         if(term !== ''){
            github.getUser(userText)
               .then(data => {
                  if(data.profile.message === 'Not Found'){
                     ui.clearProfile();
                     ui.showAlert('No users found', 'alert alert-danger');
                  } else {
                     ui.showProfile(data.profile);
                     ui.showRepos(data.repos);
                  }
               })
         } else {
            ui.clearProfile();
         }
      }

      function handleSubmit(e){
         e.preventDefault();
         const term = searchUser.value;

         ui.hideAutocomplete();

         if(term !== ''){
            github.getUser(term)
               .then(data => {
                  if(data.profile.message === 'Not Found'){
                     ui.clearProfile();
                     ui.showAlert('no users found', 'alert alert-danger');
                  } else {
                     ui.showProfile(data.profile);
                     ui.showRepos(data.repos);
                  }
               })
         } else {
            ui.clearProfile();
            ui.showAlert('please provide a name', 'alert alert-danger');
         }
      }

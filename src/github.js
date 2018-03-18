
   export class GitHub {

      constructor() {
         this.id = 'a99fbebbf417be6567c0';
         this.secret = 'f204497f7ebcb40df118637f19f01c1402c4f876';
      }

      async searchUsers(keyword){
         // const searchResponse = await fetch(`https://clients1.google.com/complete/search?client=youtube&tok=Iu2UFybBVjvwBqGBmnMaKw&callback=?&q=${keyword}`);
         const searchResponse = await fetch(`https://api.github.com/search/users?q=${keyword}+in%3Alogin&type=Users&client_id=${this.id}&client_secret=${this.secret}`);
         const search = await searchResponse.json();

         return {
            search
         }
      }

      async getUser(user){
         const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.id}&client_secret=${this.secret}`);
         const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?client_id=${this.id}&client_secret=${this.secret}`);

         const profile = await profileResponse.json();
         const repos = await repoResponse.json();

         return {
            profile,
            repos
         }
      }
   }

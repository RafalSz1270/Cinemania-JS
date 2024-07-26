 
      const modal = document.getElementById('myModal');

   
      const btn = document.getElementById('myBtn');

      
      const span = document.getElementsByClassName('close')[0];

     
      const toggleButton = document.getElementById('toggleLibrary');

     
      btn.onclick = function () {
        modal.style.display = 'block';
      };

     
      span.onclick = function () {
        modal.style.display = 'none';
      };

     
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      };

      
      toggleButton.onclick = function () {
        if (toggleButton.innerText === 'Dodaj do My library') {
          toggleButton.innerText = 'Usuń z My library';
        } else {
          toggleButton.innerText = 'Dodaj do My library';
        }
      };
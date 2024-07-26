
      const modal = document.getElementById('myModal');

      const btn = document.getElementById('myBtn');

     
      const span = document.getElementsByClassName('close')[0];

      
      const toggleButton = document.getElementById('toggleLibrary');

      // Open the modal
      btn.onclick = function () {
        modal.style.display = 'block';
      };

      // Close the modal
      span.onclick = function () {
        modal.style.display = 'none';
      };

      // Close the modal when clicking outside of it
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      };

      // Toggle add/remove from library
      toggleButton.onclick = function () {
        if (toggleButton.innerText === 'Dodaj do My library') {
          toggleButton.innerText = 'Usuń z My library';
        } else {
          toggleButton.innerText = 'Dodaj do My library';
        }
      };
/* Peerapong Peter Saksommon */
(function () {
  "use strict";

   /** This command load every functions declared in this JS file
    *  to run in the background of the website
    */
   window.addEventListener("load", function () {
      chat();
      contact();
      toIntro();
      toVillians();
      toKingpin();
      toRhino();
      toScorpion();
      toElectro();
      toVulture();
      toShocker();
   });

   /* This function use to change the text when clicking on spiderman icon
      once the array of text ran out it move to the villians section below
      and change the text for one last time
   */
   function chat() {
      let i = 0;
      let text = ["Nice work! Allow me to introduce myself.",
         "I am your friendly neighbourhood Spider-man!",
         "I was bitten by radioactive spider which give me superpowers.",
         "But with great power come great responsibility, I learn that in a hard way.",
         "So I spend days and nights to make sure that New York City are safe and sound.",
         "With my super strength and spider-like power plus my awesome webshooter,",
         "I sworn to protect NYC from all these troublemakers."
      ];
      let icon = document.getElementById('icon');
      icon.addEventListener("click", function () {
         if (text[i] === undefined) {
            document.getElementById('villains').scrollIntoView();
            document.getElementById('convo').innerText =
               "Take a look at those troublemakers down there!";
         } else {
            document.getElementById('convo').innerText = text[i];
            i++;
         }
      });
   }

   /* This function change the text into how to contact spiderman
      And move the screen to starter section when the contact button was clicked
   */
   function contact() {
      let btn = document.getElementById('contact');
      btn.addEventListener("click", function () {
         document.getElementById('convo').innerText =
            "Just keep on screaming. If you scream loud enough I'll be there!";
         document.getElementById('starter').scrollIntoView();
      });
   }

   /* This function move the screen to starter section
      when the intro button was clicked
   */
   function toIntro() {
      let btn = document.getElementById('intro');
      btn.addEventListener("click", function () {
         document.getElementById('starter').scrollIntoView();
      });
   }
   /* This function move to the screen to villians sections
      when the foe button was clicked.
   */
   function toVillians() {
      let btn = document.getElementById('foe');
      btn.addEventListener("click", function () {
         document.getElementById('villains').scrollIntoView();
      });
   }

   /* This function will move the screen to Kingpin_Profile
      When the Kingpin_Picture was clicked
   */
   function toKingpin() {
      let btn = document.getElementById('Kingpin_Picture');
      btn.addEventListener("click", function () {
         document.getElementById('Kingpin_Profile').scrollIntoView();
      });
   }

   /* This function will move the screen to Rhino_Profile
      When the Rhino_Picture was clicked
   */
   function toRhino() {
      let btn = document.getElementById('Rhino_Picture');
      btn.addEventListener("click", function () {
         document.getElementById('Rhino_Profile').scrollIntoView();
      });
   }

   /* This function will move the screen to Scorpion_Profile
      When the Scorpion_Picture was clicked
   */
   function toScorpion() {
      let btn = document.getElementById('Scorpion_Picture');
      btn.addEventListener("click", function () {
         document.getElementById('Scorpion_Profile').scrollIntoView();
      });
   }

   /* This function will move the screen to Electro_Profile
      When the Electro_Picture was clicked
   */
   function toElectro() {
      let btn = document.getElementById('Electro_Picture');
      btn.addEventListener("click", function () {
         document.getElementById('Electro_Profile').scrollIntoView();
      });
   }

   /* This function will move the screen to Vulture_Profile
      When the Vulture_Picture was clicked
   */
   function toVulture() {
      let btn = document.getElementById('Vulture_Picture');
      btn.addEventListener("click", function () {
         document.getElementById('Vulture_Profile').scrollIntoView();
      });
   }

   /* This function will move the screen to Shocker_Profile
      When the Shocker_Picture was clicked
   */
   function toShocker() {
      let btn = document.getElementById('Shocker_Picture');
      btn.addEventListener("click", function () {
         document.getElementById('Shocker_Profile').scrollIntoView();
      });
   }
})();

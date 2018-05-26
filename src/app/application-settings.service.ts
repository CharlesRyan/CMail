import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationSettingsService {

  applicationTitle:string = "Messaging App";

	getFirebaseRestUrl(suffix:string) {
		const prefix = "https://email-demo-c187e.firebaseio.com/";

		const ext = ".json";

		return prefix + suffix + ext;
	}

}


// <script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
// <script>
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyBAufrsiLUBUmpGdFhwkzrU-U_AUMKKYdY",
//     authDomain: "email-demo-c187e.firebaseapp.com",
//     databaseURL: "https://email-demo-c187e.firebaseio.com",
//     projectId: "email-demo-c187e",
//     storageBucket: "",
//     messagingSenderId: "295194346150"
//   };
//   firebase.initializeApp(config);
// </script>
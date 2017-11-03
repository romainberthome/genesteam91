 if('serviceWorker' in navigator){
      navigator.serviceWorker
      .register("../scripts/service-worker.js")
      .then(function(){
        console.log("Service worker Registered");
      });
    } ;
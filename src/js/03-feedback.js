import throttle from "lodash.throttle";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.feedback-form');
    const emailInput = form.querySelector('[name="email"]');
    const messageInput = form.querySelector('[name="message"]');
    const localStorageKey = "feedback-form-state";

    const storedData = localStorage.getItem(localStorageKey);

    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            emailInput.value = parsedData.email;
            messageInput.value = parsedData.message;
        } catch (error) {
            console.error("Error parsing stored data:", error);
        }
    }



    const throttledUpdate = throttle(() => {
        console.log("test throttle");
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        if (email !== '' && message !== '') {
            var dataArray = {
                email: email,
                message: message
            };
            var jsonData = JSON.stringify(dataArray);
            localStorage.setItem(localStorageKey, jsonData);
        }
     }, 500); 
  

     form.addEventListener('input', (event) => {
        throttledUpdate();
        
      });





    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        localStorage.removeItem(localStorageKey);

        var formData = {
            email: emailInput.value,
            message: messageInput.value
        };

        console.log("message kung submit", formData);
        emailInput.value = '';
        messageInput.value = '';
    });
});
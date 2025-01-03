// Located at: Assets/js/create-account.js

// Example: replace this with your actual API Gateway URL
const API_URL = "https://<api-id>.execute-api.<region>.amazonaws.com/prod/createUser";

document.addEventListener('DOMContentLoaded', () => {
  const userForm = document.getElementById('userForm');
  const resultDiv = document.getElementById('result');

  userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    // Gather form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const plan = document.getElementById('plan').value;
    const autoRenewal = document.getElementById('autoRenewal').checked;

    // Build the request payload
    const userData = {
      email: email,
      password: password, // to be hashed in your Lambda
      plan: plan,
      autoRenewal: autoRenewal
    };

    try {
      // Send POST request to your API Gateway endpoint
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error creating user');
      }

      // We expect JSON back, but adjust as needed for your Lambda response
      const result = await response.json();
      resultDiv.textContent = `User created successfully: ${result.message || 'OK'}`;
      resultDiv.style.color = 'green';

    } catch (error) {
      resultDiv.textContent = `Failed to create user: ${error.message}`;
      resultDiv.style.color = 'red';
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const generateButton = document.getElementById('generateButton');
    const outputDiv = document.getElementById('output');
  
    generateButton.addEventListener('click', function() {
      const promptText = userInput.value;
      if (promptText.trim() !== '') {
        generateEmail(promptText);
      } else {
        outputDiv.innerText = 'Please enter a prompt.';
      }
    });
  //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
    function generateEmail(promptText) {
      const apiKey = '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';
      const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: promptText,
          max_tokens: 150
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data); // Log the response to the console
        const generatedText = data.choices[0].text;
        outputDiv.innerText = generatedText;
      })
      .catch(error => {
        console.error('Error:', error);
        outputDiv.innerText = 'Error generating email. Please try again.';
      });
    }
    
  });
  
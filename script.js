let cachedResults = {};

async function analyzeCA() {
  const contractAddress = document.getElementById("contractAddress").value;
  const twitterResult = document.getElementById("twitterResult");
  const devHistoryResult = document.getElementById("devHistoryResult");

  if (!contractAddress) {
    alert("Please enter a contract address.");
    return;
  }

  // Check if the contract address length is within the valid range (39 to 45 characters)
  if (contractAddress.length < 44) {
    alert("Invalid contract address.");
    return;
  } else if (contractAddress.length > 44) {
    alert("Invalid contract address.");
    return;
  }

  // Show loading state with animated "worm" text
  twitterResult.innerHTML = '<div class="loading-text"><span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span><span>...</span></div>';
  devHistoryResult.innerHTML = '<div class="loading-text"><span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span><span>...</span></div>';

  // Simulate loading by introducing a delay
  setTimeout(async () => {
    // Check if the results for this contract address are already cached
    if (cachedResults[contractAddress]) {
      twitterResult.innerHTML = cachedResults[contractAddress].twitter;
      devHistoryResult.innerHTML = cachedResults[contractAddress].devHistory;
      return; // Skip the API calls if the results are already cached
    }

    try {
      const isTwitterMatched = await checkTwitterMatch(contractAddress);
      const isDevSafe = await checkDevHistory(contractAddress);

      // Cache the results
      cachedResults[contractAddress] = {
        twitter: isTwitterMatched
          ? '<span style="color: green;">✓</span> Twitter posted CA'
          : '<span style="color: red;">✗</span> Twitter did not post CA',
        devHistory: isDevSafe
          ? '<span style="color: green;">✓</span> Dev is safe'
          : '<span style="color: red;">✗</span> Dev has a rug history',
      };

      // Display the results
      twitterResult.innerHTML = cachedResults[contractAddress].twitter;
      devHistoryResult.innerHTML = cachedResults[contractAddress].devHistory;
    } catch (error) {
      console.error("Error analyzing contract address:", error);
      twitterResult.innerHTML = 'Error checking Twitter match';
      devHistoryResult.innerHTML = 'Error checking Dev history';
    }
  }, 2000); // Delay of 2 seconds
}

// Placeholder functions for API calls
async function checkTwitterMatch(contractAddress) {
  // Replace with actual API logic for checking Twitter
  return Math.random() > 0.7; // Randomized for demonstration
}

async function checkDevHistory(contractAddress) {
  // Replace with actual API logic for checking rug history
  return Math.random() > 0.5; // Randomized for demonstration
}

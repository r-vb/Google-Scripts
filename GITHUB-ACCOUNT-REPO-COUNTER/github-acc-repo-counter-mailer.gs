function fetchGitHubRepoCount() {
  // Replace with the GitHub username you want to track
  var githubUsername = "TARGET_GITHUB_USERNAME";
  
  // Replace with your GitHub personal access token
  var githubToken = "REPLACE_YOUR_GITHUB_CLASSIC_TOKEN";
  
  // GitHub API endpoint to get user information
  var apiUrl = "https://api.github.com/users/" + githubUsername;
  
  // Set up headers for authorization
  var headers = {
    "Authorization": "Bearer " + githubToken,
    "User-Agent": "GitHub-Repo-Counter"
  };
  
  // Make a GET request to GitHub API
  var response = UrlFetchApp.fetch(apiUrl, {headers: headers});
  
  // Parse the JSON response
  var userData = JSON.parse(response.getContentText());
  
  // Get the number of public repositories
  var repoCount = userData.public_repos;
  
  // Log the result (you can also update a specific cell in the spreadsheet)
  Logger.log("GitHub Repositories Count for " + githubUsername + ": " + repoCount);
  
  // Check if the previous count is stored in the Script Properties
  var scriptProperties = PropertiesService.getScriptProperties();
  var prevRepoCount = scriptProperties.getProperty("prevRepoCount") || 0;
  
  // Check if there is an increase in the number of repositories
  if (repoCount > prevRepoCount) {
    // Send an email notification
    sendEmail(githubUsername, prevRepoCount, repoCount);
    
    // Update the previous count in the Script Properties
    scriptProperties.setProperty("prevRepoCount", repoCount.toString());
  }
}

function sendEmail(username, prevCount, newCount) {
  // Replace with your email address
  var recipientEmail = "YOUR_NOTIFICATION_DESTINATION_EMAIL-ID";
  
  // Email subject and body
  var subject = "GitHub Repositories Count Increased";
  var body = "The number of repositories for GitHub user " + username + " has increased from " + prevCount + " to " + newCount + ".";
  
  // Send the email
  MailApp.sendEmail({
    to: recipientEmail,
    subject: subject,
    body: body
  });
}

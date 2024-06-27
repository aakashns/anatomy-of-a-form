const http = require("node:http");
const fs = require("node:fs");

function renderFullNameField(fullNameValue) {
  return `
    <label>
      <div>Full Name</div>
      <input
        type="text"
        name="fullName"
        placeholder="Enter full name"
        required
        maxlength="64"
        value="${escapeHtml(fullNameValue)}"
      />
    </label>
  `;
}

function renderEmailField(emailValue) {
  return `
    <label>
      <div>Email</div>
      <input
        type="email"
        name="email"
        readonly
        value="${escapeHtml(emailValue)}"
      />
    </label>
  `;
}

function renderAvatarField(avatarUrl) {
  return `
    <label>
      <div>Avatar Image</div>
      <img src="${escapeHtml(avatarUrl)}" class="avatar-image" height="80">
      <input
        type="file"
        name="avatarFile"
        accept="image/jpeg, image/png"
      />
    </label>
  `;
}

function renderBioField(bioValue = "") {
  return `
    <label>
      <div>Bio</div>
      <textarea
        name="bio"
        placeholder="Add a bio"
        maxlength="1000"
      >${escapeHtml(bioValue)}</textarea>
    </label>`;
}

// Replace characters that disturb the HTML layout
function escapeHtml(unsafeValue) {
  return unsafeValue
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderForm() {
  // Read existing values from "data.json"
  const initialValues = JSON.parse(fs.readFileSync("./data.json"));

  return `
      <form id="settings-form" method="post" enctype="multipart/form-data" action="/">
        <fieldset>
          ${renderFullNameField(initialValues.fullName)}
          ${renderEmailField(initialValues.email)}
          ${renderAvatarField(initialValues.avatarUrl)}
          ${renderBioField(initialValues.bio)}
        </fieldset>
        <input type="submit" value="Save Settings" />
      </form>
    `;
}

function renderHtmlPage() {
  return `
    <!DOCTYPE html>
    <html lang="en-US">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
        <script src="/script.js"></script>
        <title>Account Settings</title>
      </head>
      <body>
        <div id="container">
          <h1>Account Settings</h1>
          ${renderForm()}
        </div>
      </body>
    </html>
  `;
}

function handleRequest(req, res) {
  console.log(req.method, " ", req.url);
  if (req.url === "/") {
    // Respond with an HTML page
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(renderHtmlPage());
  } else if (req.url === "/styles.css") {
    // Respond with a CSS file
    res.writeHead(200, { "Content-Type": "text/css" });
    if (fs.existsSync("styles.css")) res.write(fs.readFileSync("styles.css"));
  } else if (req.url === "/script.js") {
    // Respond with a JavaScript file
    res.writeHead(200, { "Content-Type": "text/javascript" });
    if (fs.existsSync("script.js")) res.write(fs.readFileSync("script.js"));
  } else {
    // Reject all other URLs
    res.writeHead(404);
    res.write("Not Found");
  }
  res.end();
}

// Create server and listen on port 8080
http.createServer(handleRequest).listen(8080);

const http = require("node:http");
const fs = require("node:fs");

// function escapeHtml(unsafe) {
//   return unsafe
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }

// function renderFullNameField(value = "", error = null) {
//   return `
//     <label>
//       <div>Full Name</div>
//       <input
//         name="full_name"
//         type="text"
//         placeholder="John"
//         required
//         maxlength="64"
//         value="${escapeHtml(value)}"
//       />
//     </label>
//     ${error ? `<span class="input-error">${escapeHtml(error)}</span>` : ""}
//   `;
// }

// function renderEmailField(value = "", error = null) {
//   return `
//     <label>
//       <div>Email</div>
//       <input
//         name="email"
//         type="email"
//         value="${escapeHtml(value)}"
//         readonly
//       />
//     </label>
//     ${error ? `<span class="input-error">${escapeHtml(error)}</span>` : ""}
//   `;
// }

// function renderAvatarField(value = "", error = null) {
//   return `
//     <label>
//       <div>Avatar</div>
//       <img src="${escapeHtml(value)}" class="avatar-preview" height="32">
//       <input
//         name="avatar_file"
//         type="file"
//       />
//     </label>
//     ${error ? `<span class="input-error">${escapeHtml(error)}</span>` : ""}
//   `;
// }

// function renderBioField(value = "", error = null) {
//   return `
//     <label>
//       <div>Bio</div>
//       <textarea name="bio" placeholder="Enter your bio here">
//         ${escapeHtml(value)}
//       </textarea>
//     </label>
//     ${error ? `<span class="input-error">${escapeHtml(error)}</span>` : ""}
//   `;
// }

const accountSettings = {
  fullName: "John Doe",
  email: "johndoe@example.com",
  avatarUrl: "https://i.pravatar.cc/250",
  bio: "",
};

// Function to render the form
function renderForm(req) {
  return `
    <form id="settings-form" method="post" enctype="multipart/form-data" action="/">
      <header>
        <h1>Account Settings</h1>
      </header>
      <fieldset>
        ${renderFullNameField(accountSettings.fullName)}
        ${renderEmailField(accountSettings.email)}
        ${renderAvatarField(accountSettings.avatarUrl)}
        ${renderBioField(accountSettings.bio)}
      </fieldset>
      <footer>
        <input type="submit" value="Save Settings" />
      </footer>
    </form>`;
}

// Function to render the HTML page
function renderHtmlPage(req) {
  return `<!DOCTYPE html>
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
          ${renderForm(req)}
        </div>
      </body>
    </html>`;
}

// Function to handle incoming requests
function handleRequest(req, res) {
  console.log(req.method, " ", req.url);
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(renderHtmlPage(req));
  } else if (req.url === "/styles.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    if (fs.existsSync("styles.css")) res.write(fs.readFileSync("styles.css"));
  } else if (req.url === "/script.js") {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    if (fs.existsSync("script.js")) res.write(fs.readFileSync("script.js"));
  } else {
    res.writeHead(404);
    res.write("Not Found");
  }
  res.end();
}

// Create the server and listen on port 8080
http.createServer(handleRequest).listen(8080);

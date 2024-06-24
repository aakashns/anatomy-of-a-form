const http = require("http");
var fs = require("fs");

function renderForm() {
  return `
    <form id="settings-form" method="post" enctype="multipart/form-data" action="/">
      <header>
        <h1>Account Settings</h1>
      </header>

      <fieldset>
        <label>
          <div>Full Name</div>
          <input name="full_name" type="text" placeholder="John" required />
        </label>

        <label>
          <div>Email</div>
          <input name="email" type="email" placeholder="johndoe@example.com" />
        </label>

        <label>
          <div>Avatar</div>
          <input name="avatar_file" type="file" />
        </label>

        <label>
          <div>Bio</div>
          <textarea name="bio" placeholder="Enter your bio here"></textarea>
        </label>
      </fieldset>

      <footer>
        <input type="submit" value="Save Settings" />
      </footer>
    </form>`;
}

function renderPage() {
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
        ${renderForm()}
      </body>
    </html>`;
}

function handleRequest(req, res) {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(renderPage());
  } else if (req.url === "/styles.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(fs.readFileSync("styles.css"));
  } else if (req.url === "/script.js") {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    res.write(fs.readFileSync("script.js"));
  } else {
    res.writeHead(404);
    res.write("Not Found");
  }
  res.end();
}

http.createServer(handleRequest).listen(8080);

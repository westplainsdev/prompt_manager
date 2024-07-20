# Prompt Management 


This project is a comprehensive management interface for a Prompt Management application.  

Structure:

It's a web application that uses handlebars as the templating engine.
The project follows a layout-based structure with partial components.


Main Components:

A layout file (layout.hbs) that serves as the main template for all pages.
Navbar component (navbar.hbs) for the top navigation bar.
Sidebar component (sidebar.hbs) for the left-side navigation menu.
Individual page templates (like dashboard.hbs) for specific content.


Features:

Responsive design using Bootstrap 5.
A collapsible sidebar that can be toggled on and off.
Dynamic breadcrumb navigation.
Active state highlighting in the sidebar navigation.


Technology Stack:

Frontend: HTML, CSS (Bootstrap), JavaScript
Templating: Handlebars
Backend: Node.js with Express


## Development

### Install
```bash
npm ci
```

### Build

```bash
npm run build
```

### Run (dev mode)
```bash
npm run dev
```

### Run (production mode)
```bash
npm start -w server
```


### Test
```bash
npm run test -ws #or indivdually for -w server or -w client
```
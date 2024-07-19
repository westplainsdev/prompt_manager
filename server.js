const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Set up Handlebars
app.engine('hbs', exphbs.engine({
  defaultLayout: 'layout',
  extname: '.hbs',
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('dashboard', {
    pageTitle: 'Dashboard',
    totalUsers: 1234,
    activeUsers: 987,
    active: { dashboard: true }
  });
});

app.get('/query-monitor', (req, res) => {
  res.render('query-monitor', {
    pageTitle: 'Query Monitor',
    active: { queryMonitor: true }
  });
});

  app.get('/host-metrics', (req, res) => {
    res.render('other-pages', {
      pageTitle: 'Host Metrics',
      active: { hostMetrics: true }
    });
  });

  app.get('/cluster-metrics', (req, res) => {
    res.render('other-pages', {
      pageTitle: 'Cluster Metrics',
      active: { clusterMetrics: true }
    });
  });

  app.get('/history', (req, res) => {
    res.render('other-pages', {
      pageTitle: 'History',
      active: { history: true }
    });
  });

  app.get('/admin', (req, res) => {
    res.render('other-pages', {
      pageTitle: 'Admin',
      active: { admin: true }
    });
  });



// More routes...

// Endpoint to serve the JSON data
app.get('/data', (req, res) => {
    const jsonData = {
      "labels": ["January", "February", "March", "April", "May"],
      "datasets": [
        {
          "label": "Sales",
          "backgroundColor": "rgba(54, 162, 235, 0.2)",
          "borderColor": "rgba(54, 162, 235, 1)",
          "borderWidth": 1,
          "data": [1000, 1500, 1200, 1800, 2000]
        },
        {
          "label": "Expenses",
          "backgroundColor": "rgba(255, 99, 132, 0.2)",
          "borderColor": "rgba(255, 99, 132, 1)",
          "borderWidth": 1,
          "data": [800, 1000, 900, 1100, 1200]
        }
      ]
    };
  
    res.json(jsonData);
  });

app.listen(3000, () => console.log('Server running on port 3000'));
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import createHttpError from 'http-errors';

const router = Router();

// Routes
router.get('/', (req, res) => {
  res.render('dashboard', {
    pageTitle: 'Dashboard',
    totalUsers: 1234,
    activeUsers: 987,
    active: { dashboard: true }
  });
});

router.get('/query-monitor', (req, res) => {
  res.render('query-monitor', {
    pageTitle: 'Query Monitor',
    active: { queryMonitor: true }
  });
});

router.get('/host-metrics', (req, res) => {
  res.render('other-pages', {
    pageTitle: 'Host Metrics',
    active: { hostMetrics: true }
  });
});

router.get('/cluster-metrics', (req, res) => {
  res.render('other-pages', {
    pageTitle: 'Cluster Metrics',
    active: { clusterMetrics: true }
  });
});

router.get('/history', (req, res) => {
  res.render('other-pages', {
    pageTitle: 'History',
    active: { history: true }
  });
});

router.get('/admin', (req, res) => {
  res.render('other-pages', {
    pageTitle: 'Admin',
    active: { admin: true }
  });
});

// More routes...

// Endpoint to serve the JSON data
router.get('/data', (req, res) => {
  const jsonData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: [1000, 1500, 1200, 1800, 2000]
      },
      {
        label: 'Expenses',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: [800, 1000, 900, 1100, 1200]
      }
    ]
  };

  res.json(jsonData);
});

// all unhandled routes (404)
router.use((req, res, next) => {
  next(createHttpError.NotFound('Not Found'));
});

// first error handler; renders error view.
router.use((err: any, req: any, res: any, _next: any) => {
  res.status(err.status || 500);
  res.render('error', {
    pageTitle: err.name,
    layout: 'empty',
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

export default router;

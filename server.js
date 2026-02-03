const express = require('express')
const app = express()
const cors = require('cors')

// Import routes
const userRouter = require('./routes/users')

// NOTE: Uncomment these when you create the files
// const restaurantsRouter = require('./routes/restaurants')
// const menu_itemsRouter = require('./routes/menu_items')
// const ordersRouter = require('./routes/orders')

// NOTE: Uncomment this when you create the auth middleware
const authUser = require('./auth/userAuth')

// ========================================
// MIDDLEWARE CONFIGURATION
// ========================================

// Enable CORS
app.use(cors())

// Parse JSON request bodies
app.use(express.json())

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// ========================================
// STATIC FILE SERVING
// ========================================

// Serve category images
app.use('/categoryImage', express.static('categoryImages'))

// Serve menu item images
app.use('/menuItemsImages', express.static('menuItemsImages'))

// ========================================
// API ROUTES
// ========================================

// User routes (PUBLIC - no auth required for now)
// Once you create auth/userAuth.js, change to: app.use('/user', authUser, userRouter)
app.use('/user', authUser, userRouter)

// Restaurant routes (PROTECTED - uncomment when ready)
// app.use('/api/restaurants', authUser, restaurantsRouter)

// ========================================
// ERROR HANDLING
// ========================================

// 404 handler - must be after all routes
app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        err: `Cannot ${req.method} ${req.path}`,
        message: 'Route not found'
    })
})

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack)
    res.status(err.status || 500).json({
        status: 'error',
        err: err.message,
        message: 'Internal server error'
    })
})

// ========================================
// START SERVER
// ========================================

const PORT = process.env.PORT || 4000
const HOST = '0.0.0.0'

app.listen(PORT, HOST, () => {
    console.log(`✅ Server started on http://localhost:${PORT}`)
})

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM signal received: closing HTTP server')
    server.close(() => {
        console.log('🛑 HTTP server closed')
    })
})

module.exports = app
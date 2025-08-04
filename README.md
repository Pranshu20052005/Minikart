# E-Commerce MERN Stack Application

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

### User Features
- **Login System**: Simple login with "user" or "admin" credentials
- **Product Browsing**: View all available products with search functionality
- **Product Details**: Detailed view of individual products
- **Shopping Cart**: 
  - Add products to cart
  - Update product quantities
  - Remove products from cart
  - View total price
  - Clear entire cart
- **Search Functionality**: Search products by title or description
- **Responsive Design**: Mobile-friendly interface

### Admin Features
- **Product Management**: Add new products to the store
- **Product Details**: View and manage individual products

## Technology Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- CSS3 with modern design
- Remix Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled
- Morgan for logging

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5173`

## Usage

### For Users
1. Open the application in your browser
2. Enter "user" in the login form
3. Browse products using the search functionality
4. Click "Add to Cart" to add products to your cart
5. View your cart by clicking the cart icon in the navigation
6. Manage quantities and remove items as needed

### For Admins
1. Enter "admin" in the login form
2. Access the admin panel to manage products
3. Add new products using the product form

## API Endpoints

### Products
- `GET /` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Add new product (admin only)

### Cart
- `GET /cart` - Get cart items with total price
- `POST /cart/add/:productId` - Add product to cart
- `PUT /cart/update/:productId` - Update product quantity
- `DELETE /cart/remove/:productId` - Remove product from cart
- `DELETE /cart/clear` - Clear entire cart

## Database Schema

### Product Schema
```javascript
{
  title: String,
  description: String,
  price: Number,
  image: String
}
```

### Cart Schema
```javascript
{
  productId: ObjectId (ref: "product"),
  quantity: Number (default: 1, min: 1)
}
```

## Features Implemented

✅ Login page with user/admin routing  
✅ Product browsing with search functionality  
✅ Add to cart functionality  
✅ Cart management (add, remove, update quantities)  
✅ Total price calculation  
✅ Responsive design  
✅ Product detail pages  
✅ Admin product management  

## Future Enhancements

- User authentication with JWT
- User registration
- Order processing
- Payment integration
- Product categories
- User reviews and ratings
- Inventory management
- Order history
- Email notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License. 
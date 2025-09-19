import ShoppingBagIcon from "../assets/shopping_bag_icon.png";
import InboxIcon from "../assets/inbox_icon.png";
import GiftIcon from "../assets/gift_icon.png";
import CoffeeIcon from "../assets/coffee_icon.png";
import GridIcon from "../assets/grid_icon.png";
import CategoryButton from "../components/CategoryButton";
import { useEffect, useState } from "react";
import OrderProductTile from "../components/OrderProductTile";
import OrderDetailsList from "../components/OrderDetailsList";
import OrderSummary from "../components/OrderSummary";
import { getAllItems } from "../services/ItemService.js";
import { getAllCategories } from "../services/CategoryService.js";
import { getAllRetailers } from "../services/RetailerService.js";
import { createCompleteOrder } from "../services/OrderService.js";
import { useAuth } from "../contexts/AuthContext.js";

function CreateOrderPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [productList, setProductList] = useState([]);
    const [categoryList, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [retailers, setRetailers] = useState([]);
    const [selectedRetailer, setSelectedRetailer] = useState(null);
    const { user } = useAuth();

    // fetch all categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data, error } = await getAllCategories();
                if (error) {
                    console.error('Error fetching categories:', error);
                } else {
                    setCategories(data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } 
        };
        fetchCategories();
    }, []);

    // fetch all retailers
    useEffect(() => {
        const fetchRetailers = async () => {
            try {
                const { data, error } = await getAllRetailers();
                if (error) {
                    console.error('Error fetching retailers:', error);
                } else {
                    setRetailers(data);
                    // Set first retailer as default if available
                    if (data && data.length > 0) {
                        setSelectedRetailer(data[0]);
                    }
                }
            } catch (error) {
                console.error('Error fetching retailers:', error);
            } 
        };
        fetchRetailers();
    }, []);

    // fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await getAllItems();
                
                if (error) {
                  console.error('Error fetching products:', error);
                } else {
                  setProductList(data);
                  setFilteredProducts(data); 
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } 
        }
        fetchProducts();
    }, []);

    // Filter products when category changes
    useEffect(() => {
        if (selectedCategory === null) {
            // Show all products when no category is selected
            setFilteredProducts(productList);
        } else {
            // Filter products by selected category
            const filtered = productList.filter(item => 
                item.category_id === selectedCategory
            );
            setFilteredProducts(filtered);
        }
    }, [selectedCategory, productList]);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    }

    const handleShowAllProducts = () => {
        setSelectedCategory(null);
    }

    const handleRetailerChange = (event) => {
        const retailerId = parseInt(event.target.value);
        const retailer = retailers.find(r => r.retailer_id === retailerId);
        setSelectedRetailer(retailer);
    }

    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.item_id === product.item_id);
            
            if (existingItem) {
                // Check if adding one more would exceed stock
                if (existingItem.quantity >= product.stock_quantity) {
                    alert(`Cannot add more ${product.name}. Only ${product.stock_quantity} units available in stock.`);
                    return prevCart; // Return unchanged cart
                }
                // If item already exists and we can add more, increase quantity
                return prevCart.map(item =>
                    item.item_id === product.item_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // If item doesn't exist, add it to cart (quantity 1 is always valid)
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    }

    const handleUpdateQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            // Remove item from cart if quantity is 0 or less
            setCart(prevCart => prevCart.filter(item => item.item_id !== itemId));
        } else {
            // Find the product to check stock quantity
            const product = productList.find(p => p.item_id === itemId);
            if (product && newQuantity > product.stock_quantity) {
                alert(`Cannot add more ${product.name}. Only ${product.stock_quantity} units available in stock.`);
                return; // Don't update the cart
            }
            
            // Update quantity
            setCart(prevCart =>
                prevCart.map(item =>
                    item.item_id === itemId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        }
    }

    const handleRemoveFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.item_id !== itemId));
    }

    const handleClearCart = () => {
        setCart([]);
    }

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + (item.unit_price * item.quantity), 0);
    }

    const handleCreateOrder = async () => {
        if (cart.length === 0) {
            alert('Please add items to your cart before creating an order.');
            return;
        }

        if (!user) {
            alert('You must be logged in to create an order.');
            return;
        }

        if (!selectedRetailer) {
            alert('Please select a retailer before creating an order.');
            return;
        }

        setIsSubmitting(true);

        try {
            const orderData = {
                retailer_id: selectedRetailer.retailer_id,
                created_by: user.id,
                total_amount: calculateSubtotal() + (calculateSubtotal() * 0.12) // Including tax
            };

            const { data, error } = await createCompleteOrder(orderData, cart);

            if (error) {
                console.error('Error creating order:', error);
                alert('Failed to create order. Please try again.');
            } else {
                alert('Order created successfully!');
                setCart([]); // Clear the cart after successful order creation
                // You might want to redirect to orders page or show order confirmation
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    const products = filteredProducts.map(item => (
        <OrderProductTile 
            key={item.item_id} 
            onClick={() => handleAddToCart(item)} 
            image={item.image_url} 
            name={item.name} 
            quantity={item.stock_quantity}
            price={item.unit_price}
        />
    ));

    const categories = categoryList.map(category => (
        <CategoryButton 
            key={category.category_id} 
            onClick={() => handleCategorySelect(category.category_id)} 
            icon={category.icon_url} 
            isSelected={selectedCategory === category.category_id}
        />
    ));

    return (
        <div className="col-span-16 px-10 pt-8 h-full bg-[#EAEAEA]">
            <p className="text-2xl font-semibold">Create Order</p>

            <div className="flex justify-between">
                <div className="flex mt-3 mb-5">
                    <CategoryButton 
                        onClick={handleShowAllProducts} 
                        icon={GridIcon} 
                        isSelected={selectedCategory === null}
                    />
                    {categories}
                </div>

                <div className="flex self-end mb-4">
                    <p className="text-xl font-semibold mr-2">Retailer:</p>
                    <div className="bg-white rounded-lg shadow-2xl w-65 flex items-center">
                        <select 
                            value={selectedRetailer?.retailer_id || ''} 
                            onChange={handleRetailerChange}
                            className="ml-4 text-gray-700 text-sm bg-transparent border-none outline-none w-full"
                        >
                            <option value="">Select a retailer...</option>
                            {retailers.map(retailer => (
                                <option key={retailer.retailer_id} value={retailer.retailer_id}>
                                    {retailer.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-3">
                <p className="text-2xl font-semibold">Products</p>
                {selectedCategory && (
                    <p className="text-sm text-gray-600">
                        Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} 
                        {selectedCategory && ` in ${categoryList.find(cat => cat.category_id === selectedCategory)?.category_name || 'this category'}`}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-16 gap-6">
                <div className="col-span-11">
                    <div className="grid grid-cols-3 gap-4">
                        {products}
                    </div>
                </div>

                <div className="col-span-5">
                    <OrderDetailsList 
                        cart={cart}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveFromCart={handleRemoveFromCart}
                        onClearCart={handleClearCart}
                    />
                    <OrderSummary 
                        onOrder={handleCreateOrder} 
                        subtotal={calculateSubtotal()}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>

            <br/>
            <br/>
        </div>
    );
}

export default CreateOrderPage;
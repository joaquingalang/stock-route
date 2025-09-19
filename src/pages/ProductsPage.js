import ShoppingBagIcon from "../assets/shopping_bag_icon.png";
import CategoryButton from "../components/CategoryButton";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import DetailedProductCard from "../components/DetailedProductCard";
import { getAllItems } from "../services/ItemService.js";
import { getAllCategories } from "../services/CategoryService.js";

function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [productList, setProductList] = useState([]);
    const [isProductSelected, setIsProductSelected] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [categoryList, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

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
        
        // Clear selected product when category changes
        setIsProductSelected(false);
        setSelectedProduct({});
    }, [selectedCategory, productList]);

    const onProductSelect = (product) => {
        setIsProductSelected(true);
        setSelectedProduct(product);
    }

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    }

    const handleShowAllProducts = () => {
        setSelectedCategory(null);
    }

    const products = filteredProducts.map(items => (
        <ProductCard 
            key={items.item_id} 
            onClick={() => onProductSelect(items)} 
            isSelected={selectedProduct.item_id === items.item_id} 
            image={items.image_url} 
            name={items.name} 
            id={items.item_id} 
            desc={items.description} 
            quantity={items.stock_quantity}
        ></ProductCard>));

    const categories = categoryList.map(category => (
        <CategoryButton 
            key={category.category_id} 
            onClick={() => handleCategorySelect(category.category_id)} 
            icon={category.icon} 
            isSelected={selectedCategory === category.category_id}
        ></CategoryButton>
    ));

    return (
        <div className="col-span-16 px-10 pt-8 bg-[#EAEAEA]">
            <p className="text-2xl font-semibold">Categories</p>

            <div className="flex mt-3 mb-5">
                <CategoryButton 
                    onClick={handleShowAllProducts} 
                    icon={ShoppingBagIcon} 
                    isSelected={selectedCategory === null}
                ></CategoryButton>
                {categories}
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

            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-3">
                <div className={"grid gap-8" +(isProductSelected ? " col-span-2 grid-cols-2" : " col-span-3 grid-cols-3")}>
                {products}
                </div>

                {isProductSelected && (
                <div className="relative">
                    <DetailedProductCard
                    onClose={() => setIsProductSelected(false)}
                    image={selectedProduct.image_url}
                    name={selectedProduct.name}
                    id={selectedProduct.item_id}
                    desc={selectedProduct.description}
                    quantity={selectedProduct.stock_quantity}
                    unitPrice={selectedProduct.unit_price}
                    createdAt={selectedProduct.createdAt}
                    />
                </div>
                )}
            </div>
            <br/>
            <br/>
        </div>
    );
}

export default ProductsPage;
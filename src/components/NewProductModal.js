import React, { useState, useEffect } from "react";
import CloseIcon from "../assets/close_icon.png";
import NewSupplyDropdown from "./NewSupplyDropdown";
import { getAllSuppliers } from '../services/SupplierService.js'
import { getAllCategories } from '../services/CategoryService.js'
import { createItem } from '../services/ItemService.js'

function NewProductModal({ onClose }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(0.00);
  const [supplier, setSupplier] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const createdAt = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  {/* Fetch Suppliers */}
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        const { data, error } = await getAllSuppliers();
        
        if (error) {
          console.error('Error fetching suppliers:', error);
        } else {
          setSuppliers(data);
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);

  {/* Fetch Categories */}
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data, error } = await getAllCategories();
        
        if (error) {
          console.error('Error fetching categories:', error);
        } else {
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleRemoveImage = () => {
    setImage(null);
  };

  // Updated handleSave to actually create the item
  const handleSave = async () => {
    // Validation
    if (!name.trim()) {
      alert('Please enter a product name');
      return;
    }
    if (!desc.trim()) {
      alert('Please enter a product description');
      return;
    }
    if (!quantity || quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }
    if (!price || price <= 0) {
      alert('Please enter a valid price');
      return;
    }
    if (!category) {
      alert('Please select a category');
      return;
    }
    if (!supplier) {
      alert('Please select a supplier');
      return;
    }

    try {
      const itemData = {
        name: name.trim(),
        description: desc.trim(),
        unit_price: parseFloat(price),
        stock_quantity: parseInt(quantity),
        category_id: category.category_id,
        supplier_id: supplier.supplier_id
      };

      console.log("Creating item with data:", itemData);

      if (!itemData.category_id) {
        alert('Category ID is missing. Please select a category again.');
        return;
      }
      if (!itemData.supplier_id) {
        alert('Supplier ID is missing. Please select a supplier again.');
        return;
      }
      
      const { data, error } = await createItem(itemData);
      
      if (error) {
        console.error('Error creating item:', error);
        alert('Failed to create product. Please try again.');
        return;
      }

      console.log("Product created successfully:", data);
      alert('Product created successfully!');
      onClose(); // Close modal after successful creation
      
    } catch (error) {
      console.error('Error creating item:', error);
      alert('Failed to create product. Please try again.');
    } 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#EAEAEA] rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer bg-white rounded-2xl p-1 -top-3 -right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          <img src={CloseIcon} className="w-6" />
        </button>

        {/* Upload Panel */}
        <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
          {image ? (
            <>
              <img
                src={image}
                alt="Preview"
                className="object-cover w-full h-full"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow-md hover:bg-red-600"
              >
                Remove
              </button>
            </>
          ) : (
            <label className="cursor-pointer flex flex-col items-center justify-center text-gray-400 w-full h-full">
              <span className="text-3xl">＋</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Product Name */}
        <input
          type="text"
          placeholder="New Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-gray-600 text-2xl font-semibold mb-4 border-b border-gray-300 focus:outline-none"
        />

        {/* Created Date */}
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Created At:</span> {createdAt}
        </p>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-600 mb-1">
            Product Description
          </label>
          <textarea
            rows="3"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full text-sm border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product description..."
          ></textarea>
        </div>

        <div className="mb-4 flex justify-between">
          {/* Quantity */}
          <div>
            <label className="block text-lg font-semibold text-gray-600 mb-1">
              Product Quantity
            </label>
            <input
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-32 border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Units"
            />
          </div>
          {/* Price */}
          <div>
            <label className="block text-lg font-semibold text-gray-600 mb-1">
              Product Price
            </label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-32 border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="$0.00"
            />
          </div>
          {/* Supply Dropdown*/}
          <div>
            <label className="block text-lg font-semibold text-gray-600 mb-1">
              Supplier
            </label>
            <NewSupplyDropdown onSelect={(selectedSupplier) => setSupplier(selectedSupplier)} suppliers={suppliers}></NewSupplyDropdown>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-600 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.category_id}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  category === cat
                    ? "bg-[#EA8D8D] text-white font-semibold border-[#EA8D8D]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-[#293A7A] text-white py-2 rounded-lg cursor-pointer font-semibold"
        >
          Save Product
        </button>
      </div>
    </div>
  );
}

export default NewProductModal;

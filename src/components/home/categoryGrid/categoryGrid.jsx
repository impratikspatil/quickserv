import React, { useState, useEffect } from "react";
import axios from "axios";
import BaseURL from "../../../config";
import { category_list } from "../../../assets/assets";
import "./categoryGrid.css";

// Mapping of service category names to Material Icons (for API data)
const categoryIconMap = {
  "Cleaning Services": "cleaning_services",
  "Maintenance & Repairs": "handyman",
  "Handyman Services": "construction",
  "Appliance Repair": "kitchen",
  "Home Improvement": "home_repair_service",
  "Landscaping & Outdoor Services": "grass",
  "Pest Control": "bug_report",
  "Home Security": "security",
  "Moving & Storage": "local_shipping",
  "HVAC Services": "ac_unit",
  "Waste Management": "delete",
  "Plumbing": "plumbing",
  "Painting": "format_paint",
  "Carpentry": "carpenter",
  "Electrician": "electrical_services",
  // Add more mappings as needed
};

// Default icon if service category name doesn't match
const getCategoryIcon = (categoryName) => {
  return categoryIconMap[categoryName] || "category";
};

const categoryGrid = React.forwardRef(({ onClickServiceCategory }, ref) => {
  const [categories, setCategories] = useState(category_list); // Initialize with static categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch service categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await axios.get(BaseURL + 'api/category', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        console.log("response is fetching categories ", response.data);

        // Check if API returned data and it's not empty
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          // Map API response to component format
          const mappedCategories = response.data.map((category) => ({
            category_name: category.categoryName || category.category_name || category.name,
            category_icon: category.categoryIcon || category.category_icon || getCategoryIcon(category.categoryName || category.category_name || category.name),
            id: category._id || category.id
          }));

          setCategories(mappedCategories);
          setError(null);
        } else {
          // API returned empty array or no data - use static categories
          console.log('No categories from API, using static categories');
          setCategories(category_list);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        // On error, use static categories as fallback
        console.log('Using static categories as fallback');
        setCategories(category_list);
        setError(null); // Don't show error, just use static data
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleServiceCategoryChange = (category_name) => {
    onClickServiceCategory(category_name);
  };

  if (loading) {
    return (
      <div className="category_grid" ref={ref}>
        <h1>Find Our services</h1>
        <div className="category_grid_list" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <p>Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="category_grid" ref={ref}>
      {/* <hr /> */}
      <h1>Find Our services</h1>
      <div className="category_grid_list">
        {categories.length > 0 ? (
          categories.map((item, index) => {
            return (
              <div
                key={item.id || index}
                className="category_list_item"
                onClick={() => handleServiceCategoryChange(item.category_name)}
              >
                <i className="material-icons">{item.category_icon}</i>
                <p>{item.category_name}</p>
              </div>
            );
          })
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <p>No categories available</p>
          </div>
        )}
      </div>
      {/* <hr /> */}
    </div>
  );
});

export default categoryGrid;

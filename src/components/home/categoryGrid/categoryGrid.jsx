import React from "react";
import { category_list } from "../../../assets/assets";
import "./categoryGrid.css";

const categoryGrid =React.forwardRef((props, ref) => {
  return (
    <div className="category_grid" id="category_grid" ref={ref}>
      <hr />
      <h1>Find Our services</h1>
      <div className="category_grid_list">
        {category_list.map((item, index) => {
          return (
            <div key={index} className="category_list_item">
              <img src={item.category_image} alt="" />
              <p>{item.category_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
});

export default categoryGrid;

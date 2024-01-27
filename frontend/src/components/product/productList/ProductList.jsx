import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./productList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { Link, NavLink } from "react-router-dom";
import { FILTER_PRODUCTS, selectFilteredProducts } from "../../../redux/features/product/filterSlice";
import moment from 'moment';






const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredProducts);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>-- No product found, please add a product...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="center">Quantity</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                
                {currentItems.map((product, index) => {
            const { _id, name, category, price, quantity, expiry_date } = product;
            const isExpired = moment().isAfter(moment(expiry_date));
            const isExpiring = moment().isBefore(moment(expiry_date)) && moment().add(3, 'months').isAfter(moment(expiry_date));
            const outOfStock = product?.quantity <= 0;
             let backgroundColor;
              if (isExpired) {
               backgroundColor = '#f72d66';
                } else if (isExpiring) {
                  backgroundColor = 'rgb(189, 189, 47)';
                   } else if (outOfStock) {
                   backgroundColor = '#de819b';
                     } else {
                      backgroundColor = 'transparent';
                        }
                    return (
                       <tr key={_id} style={{ backgroundColor }}>
                      <td>{index + 1}</td>
                       <td><NavLink to={`/product-detail/${_id}`}>{name ? shortenText(name, 16) : ''}</NavLink></td>
                       <td>{category}</td>
                       <td>{"$"}{price}</td>
                       <td className="center">{quantity}</td>
                       <td>{"$"}{price * quantity}</td>
                       <td className="icons bgw">
                        <span>
                       <Link to={`/product-detail/${_id}`}>
                               <AiOutlineEye size={25} color={"purple"} />
                       </Link>        
                     </span>
                        <span>
                     <Link to={`/edit-product/${_id}`}>
                       <FaEdit size={20} color={"green"} />
                      </Link>
                    </span>
                       <span>
                       <FaTrashAlt
                          size={20}
                           color={"red"}
                           onClick={() => confirmDelete(_id)}
                           />
                          </span>
                        </td>
                       </tr>
                        );
                      })}

              </tbody>
            </table>
          )}
        </div>
        {products.length > 6 &&
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />}
      </div>
    </div>
  );
};

export default ProductList;
import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./customerList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link, NavLink } from "react-router-dom";
import moment from 'moment';
import { deleteACustomer, getAllCustomers } from "../../../redux/features/customer/customerSlice"
import { FILTER_CUSTOMERS, selectFilteredCustomers } from "../../../redux/features/customer/filterSlice";
import CustomersSummary from "../customersSummary/CustomersSummary";



const CustomersList = ({ customers, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredCustomers = useSelector(selectFilteredCustomers);
  const handleButtonClick = (searchText) => {
    setSearch(searchText);
  };
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delCustomer = async (id) => {
    await dispatch(deleteACustomer(id));
    await dispatch(getAllCustomers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete customer",
      message: "Are you sure you want to delete this customer.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delCustomer(id),
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

    setCurrentItems(filteredCustomers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredCustomers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredCustomers]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredCustomers.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_CUSTOMERS({ customers, search }));
  }, [customers, search, dispatch]);

  return (
    <div className="product-list">
      <CustomersSummary customers={customers} handleButtonClick={handleButtonClick}/>
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
          {!isLoading && customers.length === 0 ? (
            <p>-- No customer found, please add a customer...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="center">Amount Paid</th>
                  <th>Amount Due</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                
                {currentItems.map((customer, index) => {
            const { _id, name, category, price, amount_paid, expiry_date } = customer;
            // const isExpired = moment().isAfter(moment(expiry_date));
            // const isExpiring = moment().isBefore(moment(expiry_date)) && moment().add(3, 'months').isAfter(moment(expiry_date));
            // const outOfStock = customer?.quantity <= 0;
            //  let backgroundColor;
            //   if (isExpired) {
            //    backgroundColor = '#f72d66';
            //     } else if (isExpiring) {
            //       backgroundColor = 'rgb(189, 189, 47)';
            //        } else if (outOfStock) {
            //        backgroundColor = '#de819b';
            //          } else {
            //           backgroundColor = 'transparent';
            //             }
                    return (
                      //  <tr key={_id} style={{ backgroundColor }}>
                      <tr key={_id}>
                      <td>{index + 1}</td>
                       <td><NavLink to={`/customer-detail/${_id}`}>{name ? shortenText(name, 16) : ''}</NavLink></td>
                       <td>{category}</td>
                       <td>{"$"}{price}</td>
                       <td className="center">{"$"}{amount_paid}</td>
                       <td>{"$"}{price - amount_paid}</td>
                       <td className="icons bgw">
                        <span>
                       <Link to={`/customer-detail/${_id}`}>
                               <AiOutlineEye size={25} color={"purple"} />
                       </Link>        
                     </span>
                        <span>
                     <Link to={`/edit-customer/${_id}`}>
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
        {customers.length > 6 &&
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

export default CustomersList;
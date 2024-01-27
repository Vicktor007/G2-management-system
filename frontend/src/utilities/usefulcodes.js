{/* {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity, expiry_date } = product;
                  const isExpired = moment().isAfter(moment(expiry_date));
                  return (
                    
                    <tr key={_id} style={{ backgroundColor: isExpired ? '#c41849' : 'transparent'}}>
                       <td>{index + 1}</td>
                     
                      <td><NavLink to={`/product-detail/${_id}`}>{name ? shortenText(name, 16) : ''}</NavLink></td>
                      <td>{category}</td>
                      <td>
                        {"$"}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {"$"}
                        {price * quantity}
                      </td>
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
                })} */}
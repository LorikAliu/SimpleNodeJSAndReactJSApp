import React, { useState, useEffect } from "react";
import { useLocation, Link, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { getProducts, getSingleProduct, deleteProduct } from "../../api/products";
import { Container, ListGroup, CardDeck, Col, Row, Button, Table, Form } from "react-bootstrap";
import Header from "../Header/";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Alert from "@material-ui/lab/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Search = ({ filterChanged }) => {
    const history = useHistory();
    const { user: currentUser, isLoggedIn } = useSelector((state) => state.auth);
    const [errMessage, setErrMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [productDetails, setProductDetails] = useState([]);

    const [page, setPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [prevPageValue, setPrevPageValue] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [nextPageValue, setNextPageValue] = useState(null);
    const [pgResult, setPgResult] = useState(false);
    const [maxPagination, setMaxPagination] = useState(null);

    let query = useQuery();
    let queryPage = query.get("page");
    let querySearch = query.get("title");

    const getProductsList = async () => {
        const response = await getProducts( queryPage, querySearch );
        setMaxPagination(response.lengthB);

        setProductDetails(response.products);

        setPgResult(response.pgResult);
        if (response.pgResult) {
            setCurrentPage(response.currentB);
            if (response.prevB == null) {
                setPrevPage("0");
                setPrevPageValue("pgDisabled");
            } else {
                setPrevPage(response.prevB);
                setPrevPageValue("");
            }
            if (response.nextB == null) {
                setNextPage("0");
                setNextPageValue("pgDisabled");
            } else {
                setNextPage(response.nextB);
                setNextPageValue("");
            }
        }
    };

    const handleDeleteSubmit = async (id) => {
        const userID = {
          user_id: currentUser.user._id,
        };
        try {
            const response = await deleteProduct( id, userID );
          
            response.errMessage ? setErrMessage(response.errMessage) : setErrMessage(false);
            response.successMsg ? setSuccessMessage(response.successMsg) : setSuccessMessage(false);
        } catch (e) {}
      };

    useEffect(() => {
        getProductsList();
      }, [filterChanged, currentUser, page]);

    if (!isLoggedIn) {
        return <Redirect to={"/login"} />;
    }

    return (
        <>
            <Header filterChanged={filterChanged} />
            <Row className="mt-5 d-flex justify-content-center m-0"  style={{minWidth: 400}}>
                <Col className="mt-4"  style={{maxWidth: 900}}>
                {errMessage ? (
                    <>
                        <div className="form__title d-flex justify-content-center mb-5 mt-5 ">
                            <Alert severity="error">{errMessage}</Alert>
                        </div>
                    </>
                ) : '' }
                {successMessage ? (
                    <>
                        <div className="form__title d-flex justify-content-center mb-5 mt-5 ">
                        <Alert severity="success">{successMessage}</Alert>
                        </div>
                    </>
                ) : '' }
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {productDetails           
                    .map((product) => (
                            <tr>
                                <td>{product.productTitle}</td>
                                <td>{product.productPrice.toFixed(2)} $</td>
                                <td>{product.productStock}</td>
                                <td>{format(new Date(product.productDate), "MMMMMM dd yyyy")}</td>
                                <td><Button variant="secondary" onClick={() => {
                                        history.push({
                                            pathname: `/editproduct/${product._id}`
                                        });
                                    }}>Edit</Button>
                                </td>
                                <td><Button variant="danger" onClick={() => {
                                    if (window.confirm("Are you sure you want to delete the product?")) {
                                        handleDeleteSubmit(product._id);
                                    }
                                    }}>Delete</Button>
                                </td>
                            </tr>
                    ))}
                    </tbody>
                </Table>
                </Col>
                <div className="products__container">
                {pgResult && (
                    <div className="pagination-container">
                    <ListGroup horizontal className="List__groups">
                        <Link
                        // to={`?page=${prevPage}`}
                        to={`?title=${querySearch}&page=${prevPage}`}
                        className={`clicked ${prevPageValue}`}
                        >
                        <ListGroup.Item
                            style={{ border: "none" }}
                            className={`pagination-btn ${prevPageValue}`}
                            onClick={() => setPage({ prevPage })}
                        >
                            <ChevronLeftIcon className="pagination-icon" />
                        </ListGroup.Item>
                        </Link>

                        <Link to={`?page=${currentPage}`} className="current-page-hover">
                        <ListGroup.Item
                            style={{ border: "none" }}
                            className="current-page"
                            onClick={() => setPage({ currentPage })}
                        >
                            {currentPage + " OF " + maxPagination}
                        </ListGroup.Item>
                        </Link>

                        <Link
                        // to={`?page=${nextPage}`}
                        to={`?title=${querySearch}&page=${nextPage}`}
                        className={`clicked ${nextPageValue}`}
                        >
                        <ListGroup.Item
                            style={{ border: "none" }}
                            className={`pagination-btn ${nextPageValue}`}
                            onClick={() => setPage({ nextPage })}
                        >
                            <ChevronRightIcon className="pagination-icon" />
                        </ListGroup.Item>
                        </Link>
                    </ListGroup>
                    </div>
                )}
                </div>
            </Row>
        </>
    )
}

export default Search;
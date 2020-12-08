import React, { useState, useEffect } from "react";
import { useLocation, Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProducts, getSingleProduct } from "../../api/products";
import { Container, ListGroup, CardDeck, Col, Row, Button, Table, Form } from "react-bootstrap";
import Header from "../Header/";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    const { user: currentUser, isLoggedIn } = useSelector((state) => state.auth);
    const [productDetails, setProductDetails] = useState([]);
    // const [page, setPage] = useState(null);
    // const [currentPage, setCurrentPage] = useState(null);
    // const [prevPage, setPrevPage] = useState(null);
    // const [prevPageValue, setPrevPageValue] = useState(null);
    // const [nextPage, setNextPage] = useState(null);
    // const [nextPageValue, setNextPageValue] = useState(null);
    // const [pgResult, setPgResult] = useState(false);
    // const [maxPagination, setMaxPagination] = useState(null);

    let query = useQuery();
    let queryPage = query.get("page");
    let querySearch = query.get("title");

    const getProductsList = async () => {
        const response = await getProducts( queryPage, querySearch );
        setProductDetails(response.products);
        // setMaxPagination(response.lengthB);
        // setEventDetails(response.event);
        // setPgResult(response.pgResult);
        // if (response.pgResult) {
        //   setCurrentPage(response.currentB);
        //   if (response.prevB == null) {
        //     setPrevPage("0");
        //     setPrevPageValue("pgDisabled");
        //   } else {
        //     setPrevPage(response.prevB);
        //     setPrevPageValue("");
        //   }
        //   if (response.nextB == null) {
        //     setNextPage("0");
        //     setNextPageValue("pgDisabled");
        //   } else {
        //     setNextPage(response.nextB);
        //     setNextPageValue("");
        //   }
        // }
    };

    useEffect(() => {
        getProductsList();
      }, []);

    if (!isLoggedIn) {
        return <Redirect to={"/login"} />;
    }

    return (
        <>
            <Header />
            <div className="mt-5 d-flex justify-content-center" >
                {/* <h1 className="text-center mb-3">Products</h1> */}
                <Form className="mt-4" style={{minWidth: 650}} lg={6} xs={12}>
            {productDetails
                // .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
                .map((event) => (
                    // <Card className={classes.root}>
                    // <Link to={`event/${event._id}`} className="event-opener">
                    //     <CardActionArea className="image__container">
                    //     <CardMedia
                    //         component="img"
                    //         alt="event random picture"
                    //         height="140"
                    //         image={`http://localhost:4000/assets/uploads/${event.eventPhoto}`}
                    //     />
                    //     </CardActionArea>
                    // </Link>

                    // <CardContent class="card__content">
                    //     <Link to={`event/${event._id}`} className="event-opener">
                    //     <CardActionArea>
                    //         <Typography
                    //         variant="body2"
                    //         color="textSecondary"
                    //         component="p"
                    //         >
                    //         {event.eventTitle}
                    //         </Typography>
                    //     </CardActionArea>
                    //     </Link>

                    //     <Typography gutterBottom variant="h5" component="h2">
                    //     {event.startDate.split("T")[0]}
                    //     </Typography>

                    //     <Typography
                    //     variant="body2"
                    //     color="textSecondary"
                    //     component="h5"
                    //     >
                    //     {event.eventDescription.substr(0, 100)}...
                    //     </Typography>
                    // </CardContent>

                    // <CardActions>
                    //     <Button size="small" color="primary" className="event__tickets">
                    //     {`Tickets: ${event.eventTickets}`}
                    //     </Button>
                    //     <Button size="small" color="primary" className="event__prize">
                    //     {event.eventPrice === 0 ? "Free" : event.eventPrice + " $"}
                    //     </Button>
                    // </CardActions>
                    // </Card>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                ))}
                </Form>
            </div>
        </>
    )
}

export default Home;
import React, { lazy, Suspense, useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";
// constants
import { HOME_PATH, USER_PATH, TRANSACTIONS_PATH, CUSTOMERS_PATH, RECORDS_PATH, TOKEN_ENDPOINT, GET_CUSTOMERS_ENDPOINT, GET_TRANSACTIONS_ENDPOINT } from "../../constants/routes";
// components
import Loading from "../../components/loading/Loading";
import Nav from "../../components/nav/Nav";
// pages
const Home = lazy(() => import("../home/Home"));
const Transactions = lazy(() => import("../transactions/Transactions"));
const Customers = lazy(() => import("../customers/Customers"));
const Records = lazy(() => import("../records/Records"));
const Error404 = lazy(() => import("../error404/Error404"));

const Main = () => {
    const history = useHistory();
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({});
    const [customers, setCustomers] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        try {
            const token = JSON.parse(localStorage.getItem("sparks_bank"))?.token;

            axios.post(TOKEN_ENDPOINT, { token }).then(res => {
                setUser(res.data);
                if (!res.data.username)
                    history.push(USER_PATH);
                else {
                    setAuth(true);
                    axios.get(GET_CUSTOMERS_ENDPOINT + "/" + res.data.username, { token }).then(res => {
                        setCustomers(res.data);
                    }).catch(err => { console.log(err); });
                    axios.get(GET_TRANSACTIONS_ENDPOINT, { token }).then(res => {
                        setTransactions(res.data);
                    }).catch(err => { console.log(err); });
                }
            }).catch(err => { console.log(err); });
        } catch (err) { console.log(err); };

    }, [history]);

    return (auth ?
        <Suspense fallback={< Loading />} >
            <Nav username={user.username} balance={user.balance} />
            <Switch>
                <Route exact path={HOME_PATH} component={Home} />
                <Route exact path={TRANSACTIONS_PATH}><Transactions user={user} customers={customers} /></Route>
                <Route exact path={CUSTOMERS_PATH}><Customers customers={customers} /></Route>
                <Route exact path={RECORDS_PATH}><Records records={transactions} /></Route>
                <Route component={Error404} />
            </Switch>
        </Suspense> : <Loading />);
};

export default Main;

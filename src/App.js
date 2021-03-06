import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import {
    HomePage,
    TestPage,
    CobaPage,
    UnderConstructionPage,
    NotFoundPage
} from "./pages"
import { Navbar, Footer } from "./components"
import "./App.css"

const App = () => {
    return (
        <Router>
            <div className="a-container">
                <Navbar />
                <Switch>
                    <Route path="/canyouremembertheseimages" exact component={HomePage} />
                    <Route path="/canyouremembertheseimages/test/:category/:difficulty" exact component={TestPage} />
                    <Route path="/canyouremembertheseimages/coba" exact component={CobaPage} />
                    <Route path="/canyouremembertheseimages/leaderboard" exact component={UnderConstructionPage} />
                    <Route path="/canyouremembertheseimages/" component={NotFoundPage} />
                </Switch>
                <Footer />
            </div>
        </Router>
    )
}

export default App

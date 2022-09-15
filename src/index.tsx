/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
const Reseller = lazy(() => import("./Reseller"))
import { HopeProvider, HopeThemeConfig } from '@hope-ui/solid';
import { lazy } from 'solid-js';
import { Router, Routes, Route} from '@solidjs/router';

const config: HopeThemeConfig = {
    initialColorMode:"dark"
}

const App = () => {
    return (<>
        <Routes>

            <Route path = "/" element={<div>Ballin'</div>} />

            <Route path = "/reseller" component={()=>{return(
                <HopeProvider config={config}>
                    <Reseller />
                </HopeProvider>
            )}}/>

        </Routes>
    </>)
}

render(() => (
    <Router>
        <App />
    </Router>
), 
document.getElementById('root') as HTMLElement);
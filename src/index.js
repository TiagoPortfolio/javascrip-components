import './index.scss';
import Loading from './components/loading';
import BagPage from './pages/bag';

const body = document.querySelector('body');

async function init(bagId) {
    body.innerHTML = Loading();
    body.innerHTML = await BagPage(bagId);
}

init('bag1');

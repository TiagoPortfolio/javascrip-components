import './index.scss';

import Footer from '../../components/footer';
import Header from '../../components/header';
import ProductsList from '../../components/products-list';

import BagService from '../../services/bag-service';

const body = document.querySelector('body');
let bag;

const BagPage = {
  async load(bagId) {
    try {
      bag = await BagService.getBagByIdAsync(bagId);
    } catch (e) {
      return '<div class="error">Error loading bag items...</div>';
    }

    return `<div class="page">
              ${Header(bag.items)}
              ${ProductsList(bag.items)}
              ${Footer()}
            </div>`;
  },

  // Add events to remove bag items
  addEvents(bagId) {
    const removeItemButtons = document.querySelectorAll('.product-card .remove-btn');

    if (removeItemButtons) {
      for (let i = 0; i < removeItemButtons.length; i++) {
        removeItemButtons[i].addEventListener('click', async event => {
          let itemId = event.target.id;
          const isItemReadyToBeRemoved = await BagService.deleteBagItemById(bagId, itemId)

          if (isItemReadyToBeRemoved) {
            bag.items = bag.items.filter(i => i.id !== itemId);
            this.reRender();
          }
        });
      }
    }
  },

  reRender() {
    body.innerHTML = `<div class="page">
                      ${Header(bag.items)}
                      ${ProductsList(bag.items)}
                      ${Footer()}
                    </div>`;
    this.addEvents(bag.id);
  }
};

export default BagPage;

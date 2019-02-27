import './index.scss';

const Header = bagItems => {
  const total = bagItems.reduce((total, item) => {
    total += parseFloat(item.price);
    return total;
  }, 0).toFixed(2);
  
  return `<header class="header alignCenter">
            <div class="page-title">My Bag</div>
            <div class="page-total">Total: € ${total}</div>
          </header>`;
}

export default Header;

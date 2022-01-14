// Cria cada uma das imagens dos produtos em cada seção, cria um elemento img, coloca a classe item__image e a src é o parâmetro da função.
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
// Cria algum elemento no DOM, o tipo do elemento, sua classe e innerText é especifícado no parâmetro da função.
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
// Cria as seções, isto é, cada um dos itens que estão à venda. Coloca essas novas seções com classe item como filhas da seção items. Chama a função createCustomElement para colocar o título, sku e o botão de add o carrinho e a função createProductImageElement para acrescentar a imagem do produto e já adiciona o resultado dessas funções, isto é, os elemento criados no DOM como filhos da seção item.
function createProductItemElement({ sku, name, image }) {
  const sectionParent = document.getElementsByClassName('items')[0];
  const section = document.createElement('section');
  section.className = 'item';

  sectionParent.appendChild(section);
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}
// Salva os itens que estão no carrinho no local storage. Cria a chave products e innerText do itens do carrinho são colocados em um array que é o valor dessa chave.
function saveProductsCart() {
  const itemsCart = document.getElementsByClassName('cart__item');
  const newArr = [];
  for (let index = 0; index < itemsCart.length; index += 1) {
    newArr.push(itemsCart[index].innerText);
  }
  localStorage.setItem('products', JSON.stringify(newArr));
}
// Soma os valores dos itens que estão no carrinho de compras. Percorre os innerText dos itens do carrinho, separa em 2 partes antes e depois do símbolo $ e pega a parte depois- que é somente o valor do produto em número - e soma na variável total transformado em número decimal com o uso do parseFloat. Depois coloca como innerText do elemento h3 com classe total-price.
function getSum() {
  const items = document.getElementsByClassName('cart__item');
  const priceSpace = document.querySelector('.total-price');
  let total = 0;
  for (let index = 0; index < items.length; index += 1) {
    total += parseFloat(items[index].innerText.split('$')[1]);
  }
  priceSpace.innerText = total;
}
// Deleta itens do carrinho de compras. A partir da ol de classe cart__items remove o filho setado no parâmetro da função. Também atualiza a soma de valores do carrinho de compras e atualiza o salvamento no local storage.
function cartItemClickListener(event) {
  const cartList = document.getElementsByClassName('cart__items')[0];
  cartList.removeChild(event.target);
  getSum();
  saveProductsCart();
}
// Cria os elementos do carrinho de compras. Cria elementos li filhos da ol com classe cart__items, coloca a classe cart__item em cada li criada e o innerText de acordo com os parâmetros passados, coloca um escutador do tipo click que chama a função carItemClickListener.
function createCartItemElement({ sku, name, salePrice }) {
  const cartList = document.getElementsByClassName('cart__items')[0];
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  cartList.appendChild(li);
  return li;
}
// Pega o sku/id de algum produto especificado no parâmetro da função. O querySelector procura o primeiro span com classe item__sku dentro do elemento passado por parâmetro e não no DOM inteiro, em seguida é setado o innerText (o id).
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
// Adiciona o produto no carrinho de compras. De acordo com qual botão foi clicado, seta o sku/id do item correspondente a esse botão, executa a função fetch no api do mercado livre trazendo as informações específicas desse sku. Depois de receber a resposta do api, as informações são traduzidas e então o objeto é desestruturado e as chaves de interesse tem seus nomes trocados. Em seguida é chamada a função createCarItemElement com as informações de sku, name e salePrice como parâmetro, também é atualizada a soma do valor total do carrinho e os itens salvos no local storage.
async function addItemInCart(event) {
  const skuProduct = getSkuFromProductItem(event.target.parentNode);
  const data = await fetch(`https://api.mercadolibre.com/items/${skuProduct}`);
  const received = await data.json();
  const { id: sku, title: name, price: salePrice } = received;
  createCartItemElement({ sku, name, salePrice });
  getSum();
  saveProductsCart();
}
// Adiciona um escutador do tipo click em todos os botões de adicionar ao carrinho que executam a função addItemInCart.
const listenerOnAddButton = () => {
  const buttonAdd = document.getElementsByClassName('item__add');
  for (let index = 0; index < buttonAdd.length; index += 1) {
    buttonAdd[index].addEventListener('click', addItemInCart);
  }
};
// Traz as informações do carrinho salvo no local storage. Seta e traduz os valores da chave products do local storage, mapeia esse array e para cada item dele, cria uma li na ol com classe cart__items e coloca o item desse array como innerText da li, também adiciona um escutador de eventos do tipo click que chama a função cartItemClickListener. Também traz a soma de valores do carrinho.
const showSavedCart = () => {
  const cartList = document.querySelector('.cart__items');
  const products = JSON.parse(localStorage.getItem('products'));
  products.map((product) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = product;
  li.addEventListener('click', cartItemClickListener);
  cartList.appendChild(li);
  return li;
  });
  getSum();
};
// Remove o texto de loading depois que o api é carregado.
async function removeLoading() {
  const container = document.querySelector('.container');
  const loading = document.querySelector('.loading');
  container.removeChild(loading);
}
// Traz a lista de itens com termo computador do api do mercado livre. Executa a função fetch no api do mercado livre, depois de recebida a resposta as informações são traduzidas. A chave results é setada e o método forEach é executado nesse array, para cada item do array o objeto inserido é é desestruturado, as chaves de interesse tem seus nomes trocados e são usadas como parâmetro da função createProductItemElement que é setada em cada iteração. Assim que tudo for executado, a função removeLoading é setada. Depois a função listenerOnAddButton é executada e a função showSavedCart é executada caso haja uma chave products no localStorage.
async function getItems() {
  const data = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const received = await data.json();
  const itemsArr = received.results;
  itemsArr.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    createProductItemElement({ sku, name, image });
  });
  await removeLoading();
  listenerOnAddButton();
  if (localStorage.getItem('products') !== null) return showSavedCart();
}
// Ao clicar no botão de classe empty-carte, todos os itens do carrinho de compra são removidos a partir do elemento pai, o local storage com chave products é apagado e o valor da soma total do carrinho é atualizado
function clearCart() {
  const cartList = document.querySelector('.cart__items');
  const items = document.getElementsByClassName('cart__item');
  for (let index = items.length - 1; index >= 0; index -= 1) {
    cartList.removeChild(items[index]);
  }
  localStorage.clear('products');
  getSum();
}

const buttonEmpty = document.querySelector('.empty-cart');
buttonEmpty.addEventListener('click', clearCart);

window.onload = () => getItems();

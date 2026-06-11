import express from 'express';
import { Liquid } from 'liquidjs';
import path from 'path';

const app = express();
const port = process.env.PORT || 8000;

// ====================
// MIDDLEWARE
// ====================
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('./assets')));

// ====================
// LIQUID ENGINE
// ====================
const engine = new Liquid({
  root: path.resolve('./views'),
  extname: '.liquid'
});

app.engine('liquid', engine.express());
app.set('view engine', 'liquid');

// ====================
// API
// ====================
const API_URL = "https://fdnd-agency.directus.app/items/f_houses";

// ====================
// FAVORITES (TEMP STORAGE)
// ====================
let favorites = [];

app.get('/', async (req, res) => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    let listings = data.data;

    // ====================
    // SORT LOGICA
    // ====================
    const sort = req.query.sort;

    if (sort === 'a-z') {
      listings = listings.sort((a, b) =>
        a.street.localeCompare(b.street)
      );
    }

    if (sort === 'z-a') {
      listings = listings.sort((a, b) =>
        b.street.localeCompare(a.street)
      );
    }

    res.render('index.liquid', {
      listings,
      favorites,
      sort
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Fout bij laden woningen');
  }
});

// ====================
// DETAIL PAGE (Funda LDP)
// ====================
app.get('/listing/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();

    const house = data.data;

    const isFavorite = favorites.some(f => f.id == id);

    res.render('detail.liquid', {
      listing: {
        ...house,
        is_favorite: isFavorite
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Fout bij laden woning');
  }
});

app.post('/favorites/add/:id', async (req, res) => {
  const id = req.params.id;

  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  const house = data.data;

  const index = favorites.findIndex(f => f.id == id);

  let isFavorite;

  if (index === -1) {
    favorites.push({
      id: house.id,
      street: house.street,
      house_nr: house.house_nr,
      city: house.city,
      price: house.price,
      image: house.poster_image
    });

    isFavorite = true;
  } else {
    favorites.splice(index, 1);
    isFavorite = false;
  }

  res.json({
    success: true,
    isFavorite,
    count: favorites.length   // 🔥 DIT MISSEN WE
  });
});

// ====================
// FAVORITES PAGE
// ====================
app.get('/favorites', (req, res) => {
  res.render('favorites.liquid', {
    favorites
  });
});

app.post('/favorites/delete/:id', (req, res) => {
  const id = req.params.id;

  const index = favorites.findIndex(f => f.id == id);

  if (index !== -1) {
    favorites.splice(index, 1);
  }

  res.redirect('/favorites');
});

app.post('/favorites/delete/:id', (req, res) => {
  console.log("DELETE HIT:", req.params.id);
  res.redirect('/favorites');
});

// ====================
// SERVER START
// ====================
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});